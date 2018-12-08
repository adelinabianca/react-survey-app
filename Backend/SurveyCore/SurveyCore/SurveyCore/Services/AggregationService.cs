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

            foreach (var question in surveyDatas.First().Questions)
            {
                var chartAggregate = new ChartAggregate
                {
                    Title = question.Question, Answers = new List<AggregatedAnswer>()
                };

                response.Add(chartAggregate);
            }

            foreach (var surveyData in surveyDatas)
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
        }
}
