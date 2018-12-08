using System.Collections.Generic;
using SurveyCore.Models;

namespace SurveyCore.Services
{
    public interface IAgreggationService
    {
        IEnumerable<ChartAggregate> GetChartData(string formName);
    }
}