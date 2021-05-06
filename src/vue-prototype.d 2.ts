import api from "./axios/api"

declare module "vue/types/vue" {
  interface Vue {
    prototype: Record<string | unknow>
  }
}
