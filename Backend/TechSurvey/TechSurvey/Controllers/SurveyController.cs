using System.Web.Http;
using System.Web.Http.Cors;
using TechSurvey.Services;

namespace TechSurvey.Controllers
{
    public class SurveyController : ApiController
    {
        [HttpGet]
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Get(string uid)
        {
            var answerService = new AnswerService();
            //var survey = answerService.GetSurvey(uid);
            var survey = string.Empty;
            switch (uid)
            {
                case "dotnet":
                    survey = @"{ 	""questions"": [ 	{ ""id"": ""1"", ""question"": ""What versions of C# do you regularly use?"", ""description"": """",	""answerType"": ""multiple"", ""answerOptions"": [""C# 7"", ""C# 6"", ""C# 5"", ""Earlier version"", ""I'm not sure""], ""selectedAnswers"": """" }, 	{ ""id"": ""2"", ""question"": ""What runtimes do you regularly use?"", ""description"": """",	""answerType"": ""multiple"", ""answerOptions"": ["".NET Framework"", "".NET Core"", ""Mono""], ""selectedAnswers"": """" }, 	{ ""id"": ""3"", ""question"": ""Are you planing to migrate to new standard in next 12 months?"", ""description"": """",	""answerType"": ""single"", ""answerOptions"": [""Yes"", ""No"", ""I'm not sure""], ""selectedAnswers"": """" }, 	{ ""id"": ""4"", ""question"": ""Which compilers do you regularly use?"", ""description"": """",	""answerType"": ""single wit other"", ""answerOptions"": [""GCC"", ""MSVC"", ""Clang"", ""Intel"", ""Custom"", ""Other""], ""selectedAnswers"": """" }, 	{ ""id"": ""5"", ""question"": ""What do you like about .NET?"", ""description"": """",	""answerType"": ""input"", ""answerOptions"":"""", ""selectedAnswers"": """" }] }";
                    break;
                case "bi":
                    survey = @"{ 	""questions"": [ 	{ ""id"": ""1"", ""question"": ""What type of BI solutions have you started learning / continued to learn in the last 12 months, if any?"", ""description"": """",	""answerType"": ""multiple with other"", ""answerOptions"": [""Enterprise Solutions"", ""LOB Solutions"", ""Data Science"", ""Machine Learning"", ""Other""], ""selectedAnswers"": """" }, 	{ ""id"": 2, ""question"": ""Are the BI solutions you are working on Mobile Ready"", ""description"": """",	""answerType"": ""single"", ""answerOptions"": [""Yes – which mobile operating system"", ""No""], ""selectedAnswers"": """" }, 	{ ""id"": 3, ""question"": ""Which area of data warehousing process are you working on?"", ""description"": """",	""answerType"": ""multiple with other"", ""answerOptions"": [""Back End – ETL"", ""Front End – Dashboarding"", ""Intermediary steps: abstract layers, cubes etc."", ""Modelling"", ""Other""], ""selectedAnswers"": """" }, 	{ ""id"": 4, ""question"": ""Is the BI solution you are developing oriented to"", ""description"": """",	""answerType"": ""single"", ""answerOptions"": [""Cloud"", ""On-premise"", ""Hybrid""], ""selectedAnswers"": """" }, 	{ ""id"": 5, ""question"": ""What do you like about BI?"", ""description"": """",	""answerType"": ""input"", ""answerOptions"":"""", ""selectedAnswers"": """" }] }";
                    break;
            }
            return Ok(survey);
        }
    }
}
