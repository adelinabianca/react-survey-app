using System;
using System.Collections.Generic;
using System.Net.Http;
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
        private readonly IAgreggationService aggregationService;

        public SurveyController(IAnswerService answerService, IAgreggationService aggregationService)
        {
            this.answerService = answerService;
            this.aggregationService = aggregationService;
        }

        [HttpGet]
        [EnableCors("MyPolicy")]
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

        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> Post([FromBody]SurveyData surveyData)
        {
            answerService.UpdateAnswers(surveyData);
            var form = answerService.GetSurveyFormByUid(surveyData.UserId);
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://survey-dashboards.azurewebsites.net");
                var content = new StringContent(JsonConvert.SerializeObject(aggregationService.GetChartData(form)));
                var result = await client.PostAsync("/questionnaire/", content);
                string resultContent = await result.Content.ReadAsStringAsync();
            }
            return Ok(surveyData);
        }

        [HttpDelete]
        [EnableCors("MyPolicy")]
        public IActionResult Delete(string uid)
        {
            var result = answerService.DeleteAnswers(uid);
            var message = $"Number of records updated: {result}";
            return Ok(message);
        }
    }
}
