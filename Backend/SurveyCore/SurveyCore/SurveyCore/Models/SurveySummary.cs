using System.Collections.Generic;

namespace SurveyCore.Models
{
    public class SurveySummary
    {
        public int TotalNumberOfAnswers { get; set; }
        public List<NumbersPerDc> TotalsPerDcs { get; set; }
    }

    public class NumbersPerDc
    {
        public string DeliveryCenterName { get; set; }
        public int TotalNumberOfAnswers { get; set; }
    }
}