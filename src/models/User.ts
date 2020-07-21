import { Guild } from "./Guild";

export interface User {
  id: string;
  createdAt: Date;
  discordId: string;
  username: string;
  descriminator: number;
  profileUrl: string;
  guilds: Guild[] | null;
}
