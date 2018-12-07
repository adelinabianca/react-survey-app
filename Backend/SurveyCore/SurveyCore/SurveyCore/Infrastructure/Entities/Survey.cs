using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyCore.Infrastructure.Entities
{
    public class Survey
    {
        [Key]
        public string UID { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Template { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Answers { get; set; }

        [Column(TypeName = "bit")]
        public bool Submitted { get; set; }
    }
}
