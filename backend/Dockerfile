FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS base
WORKDIR /app
EXPOSE 80 81

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src

COPY server/server.csproj server/server.csproj
RUN dotnet restore server/server.csproj
COPY . .
RUN dotnet build server/server.csproj -c Release -o /app
COPY server/log4net.dev.xml app/log4net.xml

FROM build AS publish
RUN dotnet publish server/server.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "server.dll"]