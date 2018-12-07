using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyCore.Services;

namespace SurveyCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeleteSurveyController : ControllerBase
    {
        private readonly IAnswerService answerService;

        public DeleteSurveyController(IAnswerService answerService)
        {
            this.answerService = answerService;
        }

        [HttpGet]
        [EnableCors]
        public IActionResult Get(string uid)
        {
            var result = answerService.DeleteAnswers(uid);
            var message = $"Number of records updated: {result}";
            return Ok(message);
        }
    }
}