using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SurveyCore.Models;
using SurveyCore.Services;

namespace SurveyCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            this.feedbackService = feedbackService;
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
    }
}