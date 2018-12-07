using FluentAssertions;
using Moq;
using SurveyCore.Infrastructure.Entities;
using SurveyCore.Infrastructure.Repositories;
using SurveyCore.Services;
using Xunit;

namespace SurveyCoreTests.Services
{
    public class AnswerServiceTests
    {
        private AnswerService answerService;
        private Mock<ISurveyRepository> mockSurveyRepository;

        public AnswerServiceTests()
        {
            mockSurveyRepository = new Mock<ISurveyRepository>();
            answerService = new AnswerService(mockSurveyRepository.Object);
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

            var actual = answerService.GetSurvey("testUid");
            actual.Should().Be(expected.Template);
        }
    }
}
