import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { Guild } from '@/models/Guild';
import GuildService from '@/services/GuildService';

@Module
export default class GuildModule extends VuexModule {
    public loading = true;
    public guilds: Guild[] | null = null;

    public get hasModerationQueue(): boolean {
        return !!this.guilds?.some(guild => guild.isOwner);
    }

    @Mutation
    private setGuilds(value: Guild[] | null) {
        this.guilds = value;
    }

    @Mutation
    private setLoading(value: boolean) {
        this.loading = value;
    }

    @Action
    public async fetchGuilds() {
        this.setLoading(true);
        const res = await GuildService.findGuilds();
        if (res.success) {
            this.setGuilds(res.data);
            this.setLoading(false);
        }
    }
}
