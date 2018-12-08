using System.Collections.Generic;

namespace SurveyCore.Models
{
    public class SurveyData
    {
        public List<SurveyQuestion> Questions { get; set; }
        public string UserId { get; set; }
        public string FormName { get; set; }
    }

    public class SurveyQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Description { get; set; }
        public string AnswerType { get; set; }
        public List<string> AnswerOptions { get; set; }
        public List<string> SelectedAnswers { get; set; }
    }
}
