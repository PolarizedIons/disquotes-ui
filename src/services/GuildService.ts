import HttpClient from './HttpClient';
import { ApiResult } from '@/models/ApiResult';
import { PagedResponse } from '@/models/PagedResponse';
import { Quote } from '@/models/Quote';
import { Guild } from '@/models/Guild';

class GuildService { 
    public findGuilds(): Promise<ApiResult<Guild[]>> {
        return HttpClient.get('/guilds').then(res => res.data);
    }
    
}

export default new GuildService();
