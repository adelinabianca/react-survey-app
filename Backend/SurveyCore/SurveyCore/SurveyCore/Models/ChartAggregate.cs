using System.Collections.Generic;

namespace SurveyCore.Models
{
    public class ChartAggregate
    {
        public string Title { get; set; }
        public IEnumerable<AggregatedAnswer> Answers { get; set; }
    }

    public class AggregatedAnswer
    {
        public string AnswerTitle { get; set; }
        public int Count { get; set; }
    }
}
