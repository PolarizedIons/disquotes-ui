import HttpClient from './HttpClient';
import { ApiResult } from '@/models/ApiResult';
import { PagedResponse } from '@/models/PagedResponse';
import { Quote } from '@/models/Quote';

class QuoteService { 
    public findQuotes(guildId: string | undefined, pageNumber: number, pageSize: number): Promise<ApiResult<PagedResponse<Quote>>> {
        return HttpClient.get('/quotes', { params: { guildsFilter: guildId, pageNumber, pageSize}}).then(res => res.data);
    }

    public findUnmoderatedQuotes(guildId: string | undefined, pageNumber: number, pageSize: number): Promise<ApiResult<PagedResponse<Quote>>> {
        return HttpClient.get('/quotes/unmoderated', { params: { guildsFilter: guildId, pageNumber, pageSize}}).then(res => res.data);
    }
}

export default new QuoteService();
