using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using SurveyCore.Infrastructure.Repositories;
using SurveyCore.Models;

namespace SurveyCore.Services
{
    public class AggregationService : IAggregationService
    {
        private readonly ISurveyRepository surveyRepository;

        public AggregationService(ISurveyRepository surveyRepository)
        {
            this.surveyRepository = surveyRepository;
        }

        public IEnumerable<ChartAggregate> GetChartData(string formName)
        {
            var surveys = surveyRepository.GetSurveysByForm(formName);
            var surveyDatas = surveys.Select(
                s => JsonConvert.DeserializeObject<SurveyData>(s.Answers)
            );

            var response = new List<ChartAggregate>();

            foreach (var question in surveyDatas.First(sd => sd != null).Questions)
            {
                var chartAggregate = new ChartAggregate
                {
                    Title = question.Question, Answers = new List<AggregatedAnswer>()
                };

                response.Add(chartAggregate);
            }

            foreach (var surveyData in surveyDatas.Where(sd => sd != null))
            {
                foreach (var surveyDataQuestion in surveyData.Questions)
                {
                    foreach (var selectedAnswer in surveyDataQuestion.SelectedAnswers)
                    {
                        var question = response.Find(s => s.Title == surveyDataQuestion.Question);
                        if (!question.Answers.Any(a => a.AnswerTitle == selectedAnswer))
                        {
                            question.Answers = question.Answers.Append(new AggregatedAnswer
                            {
                                Count = 0,
                                AnswerTitle = selectedAnswer
                            });
                        }

                        question.Answers.First(a => a.AnswerTitle == selectedAnswer).Count += 1;
                    }
                }
            }

            return response;
        }

        public SurveySummary GetSurveySummary()
        {
            var submittedSurveys = surveyRepository.GetSubmittedSurveys();
            var surveySummary = new SurveySummary
            {
                TotalNumberOfAnswers = submittedSurveys.Count(),

                //iasi->vnfv
                //belgrade->orytenqr
                //novisad->abivfnq
                //zrenjanin->merawnava
                //kiev->xvri
                //lviv->yivi
                TotalsPerDcs = new List<NumbersPerDc>
                {
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Iasi",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.StartsWith("vnfv"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Belgrade",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("orytenqr"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Novi Sad",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("abivfnq"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Zrenjanin",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("merawnava"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Kiev",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("xvri"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Lviv",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("yivi"))
                    }
                }
            };

            return surveySummary;
        }

        private static string ROT13(string input)
        {
            return !string.IsNullOrEmpty(input) ? new string(input.ToCharArray().Select(s => { return (char)((s >= 97 && s <= 122) ? ((s + 13 > 122) ? s - 13 : s + 13) : (s >= 65 && s <= 90 ? (s + 13 > 90 ? s - 13 : s + 13) : s)); }).ToArray()) : input;
        }
    }
}