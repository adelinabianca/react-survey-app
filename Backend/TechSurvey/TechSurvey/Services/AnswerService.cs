﻿using System.Collections.Generic;
using System.Linq;
using TechSurvey.Infrastructure.Repositories;
using TechSurvey.Models;

namespace TechSurvey.Services
{
    public class AnswerService
    {
        private readonly Repositories repositories = new Repositories();
        private readonly ExcelService excelService = new ExcelService();

        public string GetSurvey(string uid)
        {
            var survey = repositories.SurveyRepository.GetSurveyByUid(uid);

            if (survey == null)
            {
                return null;
            }

            return string.IsNullOrWhiteSpace(survey.Answers) ? survey.Template : survey.Answers;
        }

        public void UpdateAnswers(SurveyData surveyData)
        {
            var isSubmitted = repositories.SurveyRepository.GetSurveyStatus(surveyData.UserId);
            var isSurveyComplete = surveyData.Questions.All(q => q.SelectedAnswers.Any());

            if (isSubmitted) return;

            repositories.SurveyRepository.UpdateSurveyAnswers(surveyData, isSurveyComplete);

            if (isSurveyComplete)
            {
                excelService.UpdateExcelUsingClosedXml(surveyData);
            }
        }

        public int DeleteAnswers(string uid)
        {
           return repositories.SurveyRepository.DeleteSurveyAnswers(uid);
        }
    }
}