using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using TechSurvey.Infrastructure.Entities;
using TechSurvey.Models;

namespace TechSurvey.Infrastructure.Repositories
{
    public class SurveyRepository
    {
        private readonly ITechSurveyDbContext dbContext;

        internal SurveyRepository(ITechSurveyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Survey GetAnswersByUid(string uid)
        {
            return dbContext.Survey.FirstOrDefault(surveyAnswers => surveyAnswers.UID == uid);
        }

        public bool GetSurveyStatus(string uid)
        {
            return dbContext.Survey.FirstOrDefault(surveyAnswers => surveyAnswers.UID == uid).Submitted;
        }

        public string GetSurveyTemplateByUid(string uid)
        {
            return dbContext.Survey.FirstOrDefault(surveyAnswers => surveyAnswers.UID == uid).Template;
        }

        public void UpdateSurveyAnswers(SurveyData surveyData, bool isSubmit = false)
        {
            if (surveyData == null) return;
            var answerToUpdate = GetAnswersByUid(surveyData.UserId);
            
            answerToUpdate.Answers = JsonConvert.SerializeObject(surveyData);
            answerToUpdate.Submitted = isSubmit;
            dbContext.SaveChanges();
        }
    }
}