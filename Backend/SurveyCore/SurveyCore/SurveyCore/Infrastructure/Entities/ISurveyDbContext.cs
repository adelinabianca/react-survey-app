using Microsoft.EntityFrameworkCore;

namespace SurveyCore.Infrastructure.Entities
{
    public interface ISurveyDbContext
    {
        DbSet<Survey> Survey { get; set; }
    }
}
