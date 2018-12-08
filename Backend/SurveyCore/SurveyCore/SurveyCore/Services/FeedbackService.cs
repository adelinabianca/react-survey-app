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
            var template = surveyRepository.GetSurveysByForm(formName).FirstOrDefault();
            if (template == null)
            {
                return null;
            }

            template.UID = Guid.NewGuid().ToString();
            template.Form = formName;

            var newSurvey = surveyRepository.InsertNewSurvey(template);

            return JsonConvert.SerializeObject(new {uid=newSurvey.UID});
        }
    }
}
