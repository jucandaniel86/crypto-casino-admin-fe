<script setup lang="ts">
import { type ContainerType } from "./setup";

type SectionContainerT = {
  item: ContainerType;
};
const props = defineProps<SectionContainerT>();

//models
const form = ref({
  focusWidthPercent: "",
  iconColor: "",
  textColor: "",
  widthPercent: "",
});

const emits = defineEmits(["onUpdate"]);

watch(
  form,
  () => {
    emits("onUpdate", form.value);
  },
  { deep: true }
);
</script>
<template>
  <v-row>
    <v-col cols="6">
      <span class="text-h6">Input Settings</span>
      <v-text-field
        v-model="form.widthPercent"
        label="Width Percent"
        hide-details
        density="compact"
      />
      <v-text-field
        v-model="form.focusWidthPercent"
        label="Focus Width Percent"
        hide-details
        density="compact"
      />
      <v-text-field
        v-model="form.iconColor"
        label="Icon Color"
        hide-details
        density="compact"
      />
      <v-text-field
        v-model="form.textColor"
        label="Text Color"
        hide-details
        density="compact"
      />
    </v-col>
    <v-col cols="6">
      <SharedResolutionConfig>
        <template #XL>
          <v-text-field label="Items per row" hide-details density="compact" />
          <v-text-field
            label="Panel width percent"
            hide-details
            density="compact"
          />
        </template>
        <template #LG>
          <v-text-field label="Items per row" hide-details density="compact" />
          <v-text-field
            label="Panel width percent"
            hide-details
            density="compact"
          />
        </template>
        <template #MD>
          <v-text-field label="Items per row" hide-details density="compact" />
          <v-text-field
            label="Panel width percent"
            hide-details
            density="compact"
          />
        </template>
        <template #SM>
          <v-text-field label="Items per row" hide-details density="compact" />
          <v-text-field
            label="Panel width percent"
            hide-details
            density="compact"
          />
        </template>
        <template #XS>
          <v-text-field label="Items per row" hide-details density="compact" />
          <v-text-field
            label="Panel width percent"
            hide-details
            density="compact"
          />
        </template>
      </SharedResolutionConfig>
    </v-col>
  </v-row>
</template>
