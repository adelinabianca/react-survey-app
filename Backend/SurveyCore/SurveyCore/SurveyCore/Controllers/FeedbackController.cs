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
        private readonly IAgreggationService agreggationService;

        public FeedbackController(IFeedbackService feedbackService, IAgreggationService agreggationService)
        {
            this.feedbackService = feedbackService;
            this.agreggationService = agreggationService;
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
            var survey = agreggationService.GetChartData(form);
            if (survey == null)
            {
                return NotFound();
            }

            return Ok(survey);
        }
    }
}