using System.Collections.Generic;
using SurveyCore.Models;

namespace SurveyCore.Services
{
    public interface IAggregationService
    {
        IEnumerable<ChartAggregate> GetChartData(string formName);
        SurveySummary GetSurveySummary();
    }
}