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
        private readonly IAnswerService answerService;

        public SurveyController(IAnswerService answerService)
        {
            this.answerService = answerService;
        }

        [HttpGet]
        [EnableCors("MyPolicy")]
        public IActionResult Get(string uid)
        {
            var survey = answerService.GetSurvey(uid);
            if (survey == null)
            {
                return NotFound();
            }

            var jsonSurvey = JsonConvert.DeserializeObject<SurveyData>(survey);
            return Ok(jsonSurvey);
        }

        [HttpPost]
        [EnableCors("MyPolicy")]
        public IActionResult Post([FromBody]SurveyData surveyData)
        {
            answerService.UpdateAnswers(surveyData);
            return Ok(surveyData);
        }

        [HttpDelete]
        [EnableCors("MyPolicy")]
        public IActionResult Delete(string uid)
        {
            var result = answerService.DeleteAnswers(uid);
            var message = $"Number of records updated: {result}";
            return Ok(message);
        }
    }
}
