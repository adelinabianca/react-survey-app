using SurveyCore.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SurveyCore.Models;

namespace SurveyCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubmitController : ControllerBase
    {
        private readonly IAnswerService answerService;

        public SubmitController(IAnswerService answerService)
        {
            this.answerService = answerService;
        }

        [HttpPost]
        [EnableCors]
        public IActionResult Post([FromBody]SurveyData surveyData)
        {
            answerService.UpdateAnswers(surveyData);
            return Ok(surveyData);
        }
    }
}
