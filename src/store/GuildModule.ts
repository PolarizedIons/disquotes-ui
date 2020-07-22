import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Guild } from '@/models/Guild';
import GuildService from '@/services/GuildService';
import PageInfo from '@/models/PageInfo';

@Module
export default class GuildModule extends VuexModule {
    public guilds: Guild[] | null = null;
    public pageNumber = 1;
    public pageSize = 25;
    public pageInfo: PageInfo = {hasNext: false, hasPrevious: false};

    get hasModerationQueue() {
        return this.guilds?.some(guild => guild.isOwner);
    }

    @Mutation
    private setGuilds(value: Guild[] | null) {
        this.guilds = value;
    }

    @Mutation
    private setPageNumber(value: number) {
        this.pageNumber = value;
    }

    @Mutation
    private setPageInfo(value: PageInfo) {
        this.pageInfo = value;
    }

    @Action
    async fetchGuilds() {
        const res = await GuildService.findGuilds(this.pageNumber, this.pageSize);
        if (res.success) {
            this.setGuilds(res.data.items);
            this.setPageInfo({hasPrevious: res.data.hasPrevious, hasNext: res.data.hasNext});
        }
    }

    @Action
    async nextPage() {
        this.setPageNumber(this.pageNumber + 1);
        return this.fetchGuilds();
    }

    @Action
    async previousPage() {
        this.setPageNumber(this.pageNumber - 1);
        return this.fetchGuilds();
    }
}
