using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using TechSurvey.Models;
using TechSurvey.Services;

namespace TechSurvey.Controllers
{
    public class SurveyController : ApiController
    {
        [HttpGet]
        [EnableCors(origins: "http://94.177.40.42:8180, http://10.3.128.2,http://localhost,http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Get(string uid)
        {
            var answerService = new AnswerService();
            var survey = answerService.GetSurvey(uid);
            if (survey == null)
            {
                return NotFound();
            }

            var jsonSurvey = JsonConvert.DeserializeObject<SurveyData>(survey);
            return Ok(jsonSurvey);
        }
    }
}
