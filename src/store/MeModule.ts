import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { User } from "@/models/User";
import SecurityService from "@/services/SecurityService";

@Module
export default class UserModule extends VuexModule {
  public me: User | null = null;

  get isLoggedIn(): boolean {
    return !!this.me;
  }

  @Mutation
  setMe(val: User | null) {
    this.me = val;
  }

  @Action
  async refreshTokensAndMe() {
    const me = await SecurityService.refreshLogin();
    localStorage.setItem("saved_user", JSON.stringify(me));
    this.setMe(me);
  }
}
