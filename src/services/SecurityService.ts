import { User } from "@/models/User";
import HttpClient from "./HttpClient";
import { ApiResult } from "@/models/ApiResult";
import IRefreshResponse from "@/models/RefreshResponse";

class SecurityService {
  public get accountId(): string {
    return this.accessToken
      ? JSON.parse(atob(this.accessToken.split(".")[1]))["Account-ID"]
      : null;
  }
  public get accessToken(): string | null {
    return sessionStorage.getItem("access_token");
  }
  public set accessToken(value: string | null) {
    sessionStorage.setItem("access_token", value as string);
  }
  public get refreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }
  public set refreshToken(value: string | null) {
    localStorage.setItem("refresh_token", value as string);
  }

  public startLogin(): void {
    HttpClient.get("/security/oauth").then(res => {
      const result = res.data as ApiResult<string>;

      if (result.success) {
        window.location.href = result.data;
      } else {
        // TODOs
      }
    });
  }

  public logout(): void {
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
    localStorage.removeItem("saved_user");
    HttpClient.defaults.headers.post["Authorization"] = undefined;
  }

  public setTokens(
    accessToken: string,
    refreshToken: string
  ): Promise<User | null> {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    HttpClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return HttpClient.get("/security/me", {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    }).then(res => {
      const result = res.data as ApiResult<User>;

      if (result.success) {
        return result.data;
      } else {
        this.logout();
        return null;
      }
    });
  }

  public refreshLogin(): Promise<User | null> {
    if (!this.refreshToken || !this.accountId) {
      return Promise.resolve(null);
    }

    const params = {
      accountId: this.accountId,
      refreshToken: this.refreshToken
    };
    return HttpClient.post("/security/refresh", params).then(res => {
      const result = res.data as ApiResult<IRefreshResponse>;

      if (result.success) {
        return this.setTokens(
          result.data.accessToken,
          result.data.refreshToken
        );
      } else {
        this.logout();
        return null;
      }
    });
  }
}

export default new SecurityService();
