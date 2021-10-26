using System;
using System.Threading.Tasks;
using backend.v2.Authentication.Models;
using backend.v2.Exceptions.AuthenticationExceptions;
using backend.v2.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

namespace backend.v2.Authentication.Services
{
    public interface IJWTTokenService
    {
        HttpContext Context { get; }

        ISystemClock Clock { get; }

        TokenData AuthenticateByTokens(string token);
    }
    
    public class JWTTokenService: IJWTTokenService
    {
        private readonly IJWTTokenManager tokenManager;
        private readonly ISystemClock clock;
        private readonly IHttpContextAccessor contextAccessor;

        public HttpContext Context
        {
            get
            {
                return this.contextAccessor.HttpContext;
            }
        }

        public ISystemClock Clock
        {
            get
            {
                return this.clock;
            }
        }
        
        public JWTTokenService(
            IJWTTokenManager tokenManager,
            ISystemClock clock,
            IHttpContextAccessor contextAccessor
        )
        {
            this.tokenManager = tokenManager;
            this.clock = clock;
            this.contextAccessor = contextAccessor;
        }

        public TokenData AuthenticateByTokens(string token)
        {
            var tokenData = this.tokenManager.DecodeToken(token);
                
            if (tokenData.Type == TokenType.Access && tokenData.ValidityDate < this.Clock.UtcNow)
            {
                throw new AuthenticationException("Token expired", tokenData.SessionGuid);
            } 
            
            if (tokenData.Type == TokenType.Refresh && tokenData.ValidityDate < this.Clock.UtcNow)
            {
                throw new AuthenticationException("Session expired", tokenData.SessionGuid);
            }
            
            if (tokenData.Type == TokenType.Refresh && tokenData.ValidityDate >= this.Clock.UtcNow)
            {
                var accessToken = this.GetAccessToken(tokenData);
                var refreshToken = this.GetRefreshToken(tokenData);
                
                this.AppendTokens(accessToken, refreshToken);
            }

            return tokenData;
        }
        
        private string GetAccessToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextAccessTime;

            return tokenManager.EncodeToken(data);
        }

        private string GetRefreshToken(TokenData data) {
            data.ValidityDate = this.tokenManager.NextRefreshTime;

            return tokenManager.EncodeToken(data);
        }
        
        private void AppendTokens(string access, string refresh)
        {
            this.Context.Response.Headers[JWTDefaults.AccessHeaderName] = access;
            this.Context.Response.Headers[JWTDefaults.RefreshHeaderName] = refresh;
        }
    }
}