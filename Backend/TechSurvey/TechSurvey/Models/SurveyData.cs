using System.Collections.Generic;

namespace TechSurvey.Models
{
    public class SurveyData
    {
        public string UserId { get; set; }
        public IEnumerable<Answer> Answers { get; set; }
    }
}