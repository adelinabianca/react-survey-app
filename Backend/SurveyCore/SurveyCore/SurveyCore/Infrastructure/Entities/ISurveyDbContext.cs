using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyCore.Infrastructure.Entities
{
    public interface ISurveyDbContext
    {
        DbSet<Survey> Survey { get; set; }
    }
}
