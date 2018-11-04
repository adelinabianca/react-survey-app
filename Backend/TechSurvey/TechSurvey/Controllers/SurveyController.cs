using System.Web.Http;
using TechSurvey.Services;

namespace TechSurvey.Controllers
{
    public class SurveyController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get(string uid)
        {
            var answerService = new AnswerService();
            var survey = answerService.GetSurvey(uid);
            return Ok(survey);
        }
    }
}
