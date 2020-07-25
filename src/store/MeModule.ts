import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { User } from "@/models/User";
import SecurityService from "@/services/SecurityService";

@Module
export default class UserModule extends VuexModule {
  public me: User | null = null;
  public isLoggingIn = false;
  public isRefreshing = false;

  get isLoggedIn(): boolean {
    return !!this.me;
  }

  @Mutation
  setMe(val: User | null) {
    this.me = val;
  }

  @Mutation
  setIsLoggingIn(val: boolean) {
    this.isLoggingIn = val;
  }

  @Mutation
  setIsRefreshing(val: boolean) {
    this.isRefreshing = val;
  }

  @Action
  async refreshTokensAndMe() {
    this.setIsRefreshing(true);
    const me = await SecurityService.refreshLogin();
    localStorage.setItem("saved_user", JSON.stringify(me));
    this.setMe(me);
    this.setIsRefreshing(false);
    return me;
  }
}
