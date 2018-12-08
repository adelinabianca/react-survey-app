using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SurveyCore.Services;

namespace SurveyCore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService feedbackService;
        private readonly IAggregationService aggregationService;

        public FeedbackController(IFeedbackService feedbackService, IAggregationService aggregationService)
        {
            this.feedbackService = feedbackService;
            this.aggregationService = aggregationService;
        }

        [HttpGet]
        [EnableCors("MyPolicy")]
        public IActionResult Get(string formName)
        {
            var survey = feedbackService.GenerateSurvey(formName);
            if (survey == null)
            {
                return NotFound();
            }

            return Ok(survey);
        }

        [HttpGet]
        [Route("Aggregated/{form}")]
        public IActionResult GetAggregatedAnswersByForm(string form)
        {
            var survey = aggregationService.GetChartData(form);
            if (survey == null)
            {
                return NotFound();
            }

            return Ok(survey);
        }
    }
}