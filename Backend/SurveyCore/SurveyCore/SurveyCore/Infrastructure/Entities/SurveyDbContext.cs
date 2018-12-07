using Microsoft.EntityFrameworkCore;

namespace SurveyCore.Infrastructure.Entities
{
    public class SurveyDbContext : DbContext, ISurveyDbContext
    {
        public SurveyDbContext(DbContextOptions<SurveyDbContext> options)
            : base(options)
        {
            //Database.Migrate();
        }

        public DbSet<Survey> Survey { get; set; }
    }
}
