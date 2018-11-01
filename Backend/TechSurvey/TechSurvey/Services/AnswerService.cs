using TechSurvey.Models;

namespace TechSurvey.Services
{
    public class AnswerService
    {
        public void SaveAnswers(SurveyData surveyData)
        {
            var excelService = new ExcelService();
            excelService.UpdateExcel(surveyData);
        }
    }
}