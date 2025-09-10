//@ts-ignore
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineNuxtPlugin((app) => {
  app.vueApp.component("QuillEditor", QuillEditor);
});
