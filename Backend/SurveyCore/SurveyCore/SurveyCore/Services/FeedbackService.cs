using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using SurveyCore.Infrastructure.Repositories;
using SurveyCore.Models;

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
            var surveyData = JsonConvert.DeserializeObject<SurveyData>(Regex.Unescape(newSurvey.Template));
            surveyData.UserId = newSurvey.UID;

            return JsonConvert.SerializeObject(surveyData);
        }
    }
}
