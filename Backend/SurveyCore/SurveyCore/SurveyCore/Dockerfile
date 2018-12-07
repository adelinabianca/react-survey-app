FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 43816
EXPOSE 44301

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["SurveyCore/SurveyCore.csproj", "SurveyCore/"]
RUN dotnet restore "SurveyCore/SurveyCore.csproj"
COPY . .
WORKDIR "/src/SurveyCore"
RUN dotnet build "SurveyCore.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "SurveyCore.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SurveyCore.dll"]