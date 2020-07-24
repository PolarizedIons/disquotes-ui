import HttpClient from "./HttpClient";
import { ApiResult } from "@/models/ApiResult";
import { Guild } from "@/models/Guild";

class GuildService {
  public findGuilds(): Promise<ApiResult<Guild[]>> {
    return HttpClient.get("/guilds").then(res => res.data);
  }
}

export default new GuildService();
