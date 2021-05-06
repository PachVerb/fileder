declare module "vue-progressbar" {
  import { PluginFunction } from "vue"

  export const install: PluginFunction<string, unknown>

  interface ProgressMethods {
    start(): void;
    finish(): void;
    fail(): void;
  }

  module "vue/types/vue" {
    interface Vue {
      $Progress: ProgressMethods;
    }
  }
}
