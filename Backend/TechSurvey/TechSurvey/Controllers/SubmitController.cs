using System.Web.Http;
using System.Web.Http.Cors;
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
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Post([FromBody]SurveyData surveyData)
        {
            var answerService = new AnswerService();
            answerService.UpdateAnswers(surveyData);
            return Ok(surveyData);
        }
    }
}
