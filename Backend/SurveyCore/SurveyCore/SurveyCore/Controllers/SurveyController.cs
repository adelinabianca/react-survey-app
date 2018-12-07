using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [EnableCors]
        [HttpGet]
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
    }
}
