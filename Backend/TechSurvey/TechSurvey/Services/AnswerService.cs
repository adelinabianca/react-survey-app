using System.Web.Hosting;
using TechSurvey.Infrastructure.Repositories;
using TechSurvey.Models;

namespace TechSurvey.Services
{
    public class AnswerService
    {
        private readonly Repositories repositories = new Repositories();
        private readonly ExcelService excelService = new ExcelService();

        public string GetSurvey(string uid)
        {
            var survey = repositories.SurveyRepository.GetAnswersByUid(uid);
            return string.IsNullOrWhiteSpace(survey.Answers) ? survey.Template : survey.Answers;
        }

        public void UpdateAnswers(SurveyData surveyData)
        {
            repositories.SurveyRepository.UpdateSurveyAnswers(surveyData);
            excelService.UpdateExcel(surveyData);
        }
    }
}