import Swal from "sweetalert2";

const $swal = {
  install: (Vue: any, options: any) => {
    Vue.config.globalProperties.$swal = Swal.mixin(options);
  },
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use($swal, {
    reverseButtons: true,
    confirmButtonText: "confirmText",
    cancelButtonText: "cancelText",
    confirmButtonColor: "#84bd00",
  });
});
