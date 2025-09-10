<script setup lang="ts">
type SharedEditorT = {
  label: string;
  minHeight?: number;
  content?: string;
};
//props
const props = withDefaults(defineProps<SharedEditorT>(), {
  minHeight: 350,
  content: "",
});

//models
const model = ref("");

//emits
const emits = defineEmits(["update:modelValue"]);

//methods
const updateContent = (payload: any) => emits("update:modelValue", payload);
</script>
<template>
  <div>
    <label v-if="label">{{ props.label }}</label>
    <QuillEditor
      v-model="model"
      :style="{ height: `${minHeight}px` }"
      contentType="html"
      :content="props.content"
      @update:content="updateContent"
    />
  </div>
</template>

<style>
@import "@/assets/css/Editor.css";
.v-messages__message {
  border: 1px solid #ff9800 !important;
  color: #ff9800 !important;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
}
</style>
