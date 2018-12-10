using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using SurveyCore.Infrastructure.Entities;
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
            var submittedSurveys = surveyRepository.GetSurveys();
            var surveySummary = new SurveySummary
            {
                TotalNumberOfAnswers = submittedSurveys.Count(survey => survey.Submitted),

                //todo: rewrite this when we have the UID format(make it more )
                TotalsPerDcs = new List<NumbersPerDc>
                {
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "a.diaconu",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("a.diaconu"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Serbia1",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("Serbia1"))
                    },
                    new NumbersPerDc
                    {
                        DeliveryCenterName = "Serbia2",
                        TotalNumberOfAnswers = submittedSurveys.Count(ss => ss.UID.Contains("Serbia2"))
                    }
                }
            };

            return surveySummary;
        }
    }
}