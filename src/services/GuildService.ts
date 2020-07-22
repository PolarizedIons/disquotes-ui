import HttpClient from './HttpClient';
import { ApiResult } from '@/models/ApiResult';
import { PagedResponse } from '@/models/PagedResponse';
import { Quote } from '@/models/Quote';
import { Guild } from '@/models/Guild';

class GuildService { 
    public findGuilds(pageNumber: number, pageSize: number): Promise<ApiResult<PagedResponse<Guild>>> {
        return HttpClient.get('/guilds', { params: { pageNumber, pageSize}}).then(res => res.data);
    }
    
}

export default new GuildService();
