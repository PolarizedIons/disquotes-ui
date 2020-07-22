import Vue from "vue";
import Vuex from "vuex";
import MeModule from './MeModule';
import GuildModule from './GuildModule';

Vue.use(Vuex);
const store = new Vuex.Store({});

export const meModule = new MeModule({ store, name: "user" });
export const guildModule = new GuildModule({ store, name: "guild" });

export default store;
