using System.Web.Http;
using TechSurvey.Models;
using TechSurvey.Services;

namespace TechSurvey.Controllers
{
    public class SubmitController : ApiController
    {
        //test method
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok("OK");
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]SurveyData surveyData)
        {
            var answerService = new AnswerService();
            answerService.SaveAnswers(surveyData);
            return Ok(surveyData);
        }
    }
}
