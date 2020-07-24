<template>
  <div class="mx-auto w-3/4 my-5 flex justify-between">
    <div v-if="!isLoading && guild" class="w-10/12 flex flex-col items-center">
      <dq-input v-model="newQuote.title" caption="Title:"></dq-input>
      <dq-textarea v-model="newQuote.text" caption="Text:"></dq-textarea>
      <span class="text-xl text-red-600 my-3">{{ errorMessage }}</span>
      <dq-button
        @click="submit()"
        bgColor="green-800"
        bgHoverColor="green-700"
        :busy="saving"
        >Submit!</dq-button
      >
    </div>
    <div v-else class="w-10/12 flex justify-center">
      <loader></loader>
    </div>
    <div class="w-2/12">
      <guild-badge v-if="!isLoading && guild" :guild="guild"></guild-badge>
      <div v-else class="w-full flex justify-center">
        <loader></loader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import GuildBadge from "@/components/GuildBadge.vue";
import Loader from "@/components/Loader.vue";
import DqInput from "@/components/DqInput.vue";
import DqTextarea from "@/components/DqTextarea.vue";
import DqButton from "@/components/DqButton.vue";
import { Guild } from "@/models/Guild";
import { guildModule } from "@/store";
import { Quote } from "../models/Quote";
import QuoteService from "../services/QuoteService";

@Component({
  components: {
    GuildBadge,
    Loader,
    DqInput,
    DqTextarea,
    DqButton
  }
})
export default class Dashboard extends Vue {
  errorMessage = "";
  newQuote: Partial<Quote> = {
    title: "",
    text: "",
    guildId: "0"
  };
  saving = false;

  get isLoading() {
    return guildModule.loading;
  }

  get guild(): Guild | null {
    return (
      guildModule.guilds?.find(
        guild => guild.id === this.$route.params.guildId
      ) || null
    );
  }

  @Watch("newQuote", { deep: true })
  formChanged() {
    this.errorMessage = "";
  }

  submit() {
    if (!this.newQuote.title || !this.newQuote.text) {
      this.errorMessage = "Please input a title and text!";
      return;
    }

    this.saving = true;

    const quote = this.newQuote;
    quote.guildId = this.guild?.id;
    QuoteService.submitQuote(quote).then(res => {
      this.saving = false;
      if (!res.success) {
        this.errorMessage = "Something went wrong!";
      } else {
        this.$router.push({
          name: "guild-dashboard",
          params: { guildId: this.guild?.id as string }
        });
      }
    });
  }
}
</script>
