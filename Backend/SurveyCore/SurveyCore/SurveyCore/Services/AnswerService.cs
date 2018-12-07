using SurveyCore.Infrastructure.Repositories;
using SurveyCore.Models;
using System.Linq;

namespace SurveyCore.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly ISurveyRepository surveyRepository;

        public AnswerService(ISurveyRepository surveyRepository)
        {
            this.surveyRepository = surveyRepository;
        }

        public string GetSurvey(string uid)
        {
            var survey = surveyRepository.GetSurveyByUid(uid);

            if (survey == null)
            {
                return null;
            }

            return string.IsNullOrWhiteSpace(survey.Answers) ? survey.Template : survey.Answers;
        }

        public void UpdateAnswers(SurveyData surveyData)
        {
            var isSubmitted = surveyRepository.GetSurveyStatus(surveyData.UserId);
            var isSurveyComplete = surveyData.Questions.All(q => q.SelectedAnswers.Any());

            if (isSubmitted) return;

            surveyRepository.UpdateSurveyAnswers(surveyData, isSurveyComplete);

            if (isSurveyComplete)
            {
                //excelService.UpdateExcelUsingClosedXml(surveyData);
                //TODO: excel service?
            }
        }

        public int DeleteAnswers(string uid)
        {
            return surveyRepository.DeleteSurveyAnswers(uid);
        }
    }
}
