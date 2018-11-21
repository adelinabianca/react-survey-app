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

        public Survey GetSurveyByUid(string uid)
        {
            return dbContext.Survey.FirstOrDefault(surveyAnswers => surveyAnswers.UID == uid);
        }

        public bool GetSurveyStatus(string uid)
        {
            return dbContext.Survey.FirstOrDefault(surveyAnswers => surveyAnswers.UID == uid).Submitted;
        }

        public void UpdateSurveyAnswers(SurveyData surveyData, bool isSubmit = false)
        {
            if (surveyData == null) return;
            var surveyToUpdate = GetSurveyByUid(surveyData.UserId);
            
            surveyToUpdate.Answers = JsonConvert.SerializeObject(surveyData);
            surveyToUpdate.Submitted = isSubmit;

            dbContext.SaveChanges();
        }
    }
}