using System.Data.Entity;

namespace TechSurvey.Infrastructure.Entities
{
    interface ITechSurveyDbContext
    {
        IDbSet<Survey> Survey { get; set; }
        int SaveChanges();
    }
}