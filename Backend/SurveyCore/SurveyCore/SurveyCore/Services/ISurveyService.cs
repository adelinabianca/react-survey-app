using SurveyCore.Models;

namespace SurveyCore.Services
{
    public interface ISurveyService
    {
        int DeleteAnswers(string uid);
        string GetSurvey(string uid);
        void UpdateAnswers(SurveyData surveyData);
        string GetSurveyFormByUid(string uid);
    }
}