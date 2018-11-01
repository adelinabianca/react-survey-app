using System;
using System.Collections.Generic;

namespace TechSurvey.Models
{
    public class SurveyData
    {
        public Guid SessionId { get; set; }
        public IEnumerable<Answer> Answers { get; set; }
    }
}