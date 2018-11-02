using TechSurvey.Infrastructure.Entities;

namespace TechSurvey.Infrastructure.Repositories
{
    public class Repositories
    {
        private readonly TechSurveyDbContext dbContext = new TechSurveyDbContext();
        private SurveyRepository surveyRepository;

        public SurveyRepository SurveyRepository => surveyRepository ?? (surveyRepository = new SurveyRepository(dbContext));
    }
}