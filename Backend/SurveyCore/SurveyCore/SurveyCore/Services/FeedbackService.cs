using System;
using System.Linq;
using Newtonsoft.Json;
using SurveyCore.Infrastructure.Repositories;

namespace SurveyCore.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly ISurveyRepository surveyRepository;
        public FeedbackService(ISurveyRepository surveyRepository)
        {
            this.surveyRepository = surveyRepository;
        }

        public string GenerateSurvey(string formName)
        {
            var survey = surveyRepository.GetSurveysByForm(formName).FirstOrDefault();
            if (survey == null)
            {
                return null;
            }

            survey.UID = Guid.NewGuid().ToString();
            survey.Form = formName;
            survey.Answers = string.Empty;

            var newSurvey = surveyRepository.InsertNewSurvey(survey);

            return JsonConvert.SerializeObject(new {uid=newSurvey.UID});
        }
    }
}
