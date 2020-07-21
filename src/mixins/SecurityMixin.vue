<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { User } from "../models/User";

@Component
export default class SecurityMixin extends Vue {
  public get $me(): User | null {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.$root.me;
  }

  public get isLoggedIn(): boolean {
    return !!this.$me;
  }

  public get hasModerationQueue(): boolean {
    return this.$me ? !!this.$me.guilds?.some(guild => guild.isOwner) : false;
  }
}
</script>
