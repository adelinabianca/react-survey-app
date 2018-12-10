using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SurveyCore.Models;
using SurveyCore.Services;

namespace SurveyCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyService surveyService;
        private readonly IDashboardService dashboardService;
        private readonly IAggregationService aggregationService;

        public SurveyController(ISurveyService surveyService, IDashboardService dashboardService, IAggregationService aggregationService)
        {
            this.surveyService = surveyService;
            this.dashboardService = dashboardService;
            this.aggregationService = aggregationService;
        }

        [HttpGet]
        [EnableCors("MyPolicy")]
        public IActionResult Get(string uid)
        {
            var survey = surveyService.GetSurvey(uid);
            if (survey == null)
            {
                return NotFound();
            }

            var jsonSurvey = JsonConvert.DeserializeObject<SurveyData>(survey);
            return Ok(jsonSurvey);
        }

        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("Statistics")]
        public IActionResult Get()
        {
            var statistics = aggregationService.GetSurveySummary();
            return Ok(statistics);
        }

        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Post([FromBody]SurveyData surveyData)
        {
            surveyService.UpdateAnswers(surveyData);
            //var form = surveyService.GetSurveyFormByUid(surveyData.UserId);
            await dashboardService.UpdateDashboard(surveyData);
            return Ok(surveyData);
        }

        [HttpDelete]
        [EnableCors("MyPolicy")]
        public IActionResult Delete(string uid)
        {
            var result = surveyService.DeleteAnswers(uid);
            var message = $"Number of records updated: {result}";
            return Ok(message);
        }
    }
}
