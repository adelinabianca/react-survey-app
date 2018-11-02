using System.Web.Http;

namespace TechSurvey.Controllers
{
    public class AnswerController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok("OK");
        }
    }
}
