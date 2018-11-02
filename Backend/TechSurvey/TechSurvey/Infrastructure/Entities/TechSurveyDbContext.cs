using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace TechSurvey.Infrastructure.Entities
{
    public class TechSurveyDbContext : DbContext, ITechSurveyDbContext
    {
        public TechSurveyDbContext() : base("DefaultConnectionString")
        {
            Database.SetInitializer<TechSurveyDbContext>(null);
        }

        protected override void OnModelCreating(DbModelBuilder dbModelBuilder)
        {
            dbModelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public IDbSet<Survey> Survey { get; set; }
    }
}