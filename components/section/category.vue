<script setup lang="ts">
import { type ContainerType } from "./setup";

type SectionContainerT = {
  item: ContainerType;
};
const props = defineProps<SectionContainerT>();

//models
const form = ref({});

//emits
const emits = defineEmits(["onUpdate"]);

//watch
watch(
  form,
  () => {
    emits("onUpdate", form.value);
  },
  { deep: true }
);

onMounted(() => {});
</script>
<template>
  <div>CATEGORY</div>
</template>
