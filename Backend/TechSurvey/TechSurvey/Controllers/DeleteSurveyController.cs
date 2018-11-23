using System.Web.Http;
using System.Web.Http.Cors;
using TechSurvey.Services;

namespace TechSurvey.Controllers
{
    public class DeleteSurveyController : ApiController
    {
        [HttpGet]
        [EnableCors(origins: "http://94.177.40.42:8180, http://10.3.128.2,http://localhost,http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Get(string uid)
        {
            var answerService = new AnswerService();
            var result = answerService.DeleteAnswers(uid);
            var message = $"Number of records updated: {result}";
            return Ok(message);
        }
    }
}
