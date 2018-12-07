﻿using SurveyCore.Infrastructure.Entities;
using SurveyCore.Models;

namespace SurveyCore.Infrastructure.Repositories
{
    public interface ISurveyRepository
    {
        int DeleteSurveyAnswers(string uid);
        Survey GetSurveyByUid(string uid);
        bool GetSurveyStatus(string uid);
        void UpdateSurveyAnswers(SurveyData surveyData, bool isSubmit = false);
    }
}