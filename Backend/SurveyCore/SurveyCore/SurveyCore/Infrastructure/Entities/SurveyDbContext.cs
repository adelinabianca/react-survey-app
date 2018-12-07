using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
