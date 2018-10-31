using System.Web.Http;
using TechSurvey.Models;

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
            return Ok(surveyData);
        }
    }
}
