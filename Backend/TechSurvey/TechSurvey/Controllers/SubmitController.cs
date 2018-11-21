using System.Web.Http;
using System.Web.Http.Cors;
using TechSurvey.Models;
using TechSurvey.Services;

namespace TechSurvey.Controllers
{
    public class SubmitController : ApiController
    {
        [HttpPost]
        [EnableCors(origins: "http://94.177.40.42:8180, http://10.3.128.2,http://localhost,http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Post([FromBody]SurveyData surveyData)
        {
            var answerService = new AnswerService();
            answerService.UpdateAnswers(surveyData);
            return Ok(surveyData);
        }

        //test method
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok("OK");
        }
    }
}
