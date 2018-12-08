using System.Threading.Tasks;
using SurveyCore.Models;

namespace SurveyCore.Services
{
    public interface IDashboardService
    {
        Task UpdateDashboard(SurveyData surveyData);
    }
}
