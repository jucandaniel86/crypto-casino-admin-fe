//@ts-ignore
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import QuillTableBetter from "quill-table-better";
import "quill-table-better/dist/quill-table-better.css";

export default defineNuxtPlugin((app) => {
  QuillEditor;
  app.vueApp.component("QuillEditor", QuillEditor);
});
