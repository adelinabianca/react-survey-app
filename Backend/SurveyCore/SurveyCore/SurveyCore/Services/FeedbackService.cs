using System;
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
            var template = surveyRepository.GetSurveyByUid(formName);
            if (template == null)
            {
                return null;
            }

            template.UID = Guid.NewGuid().ToString();
            var newSurvey = surveyRepository.InsertNewSurvey(template);

            return JsonConvert.SerializeObject(new {uid=newSurvey.UID});
        }
    }
}
