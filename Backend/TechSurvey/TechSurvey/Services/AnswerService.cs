using TechSurvey.Infrastructure.Repositories;
using TechSurvey.Models;

namespace TechSurvey.Services
{
    public class AnswerService
    {
        private readonly Repositories repositories = new Repositories();
        private readonly ExcelService excelService = new ExcelService();


        public void SaveAnswers(SurveyData surveyData)
        {
            repositories.SurveyRepository.UpdateSurveyAnswers(surveyData);
            excelService.UpdateExcel(surveyData);
        }
    }
}