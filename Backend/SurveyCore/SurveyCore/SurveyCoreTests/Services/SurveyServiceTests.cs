using FluentAssertions;
using Moq;
using SurveyCore.Infrastructure.Entities;
using SurveyCore.Infrastructure.Repositories;
using SurveyCore.Services;
using Xunit;

namespace SurveyCoreTests.Services
{
    public class SurveyServiceTests
    {
        private readonly SurveyService surveyService;
        private readonly Mock<ISurveyRepository> mockSurveyRepository;

        public SurveyServiceTests()
        {
            mockSurveyRepository = new Mock<ISurveyRepository>();
            surveyService = new SurveyService(mockSurveyRepository.Object);
        }

        [Fact]
        public void GetSurvey_ValidRequestNoAnswers_ShouldReturnTemplate()
        {
            var expected = new Survey
            {
                Template = "template",
                Answers = "",
                Submitted = false
            };
            mockSurveyRepository.Setup(repository => repository.GetSurveyByUid("testUid")).Returns(expected);

            var actual = surveyService.GetSurvey("testUid");
            actual.Should().Be(expected.Template);
        }
    }
}
