<script setup lang="ts">
import {
  ButtonActionTypesEnum,
  type ActionButtonType,
} from "~/core/types/ActionButton";
import type { PageType } from "~/core/types/Page";

type ActionButtonComponentType = {
  label: string;
  color?: string;
};

const props = withDefaults(defineProps<ActionButtonComponentType>(), {
  color: "primary",
});

//models
const pages = ref<PageType[]>([]);
const model = ref<ActionButtonType>({
  action: {
    type: ButtonActionTypesEnum.OPEN_INTERNAL_PAGE,
    slug: "",
    url: "",
    noFollow: false,
    isSameTab: false,
  },
  color: props.color,
  title: "",
});
const menu = ref<boolean>(false);
const ACTION_TYPES = [
  { id: ButtonActionTypesEnum.OPEN_INTERNAL_PAGE, label: "Open Internal Page" },
  { id: ButtonActionTypesEnum.OPEN_EXTERNAL_PAGE, label: "Open External Page" },
];
const availableColors = [
  "primary",
  "secondary",
  "purple",
  "blue",
  "yellow",
  "red",
  "pink",
  "black",
];
const { label } = props;

//methods
const getPages = async (): Promise<void> => {
  const { data } = await useAPIFetch("/pages/list");
  pages.value = data.data;
};

//mounted
onMounted(() => {
  getPages();
});
</script>
<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template #activator="{ props }">
      <div class="d-flex flex-column" style="max-width: 200px">
        <label v-if="label">{{ label }}</label>
        <v-btn v-bind="props" :color="model.color" flat>{{
          model.title || "Undefined"
        }}</v-btn>
      </div>
    </template>
    <v-card width="500">
      <v-card-text>
        <v-text-field
          v-model="model.title"
          hide-details
          density="compact"
          label="Button Label"
        />
        <v-select
          label="Color"
          v-model="model.color"
          :items="availableColors"
          hide-details
          density="compact"
        />
        <v-select
          label="Choose Action Type"
          v-model="model.action.type"
          :items="ACTION_TYPES"
          item-title="label"
          item-value="id"
          hide-details
          density="compact"
        ></v-select>

        <v-select
          v-if="model.action.type === ButtonActionTypesEnum.OPEN_INTERNAL_PAGE"
          v-model="model.action.slug"
          label="Choose internal page"
          :items="pages"
          item-title="name"
          item-value="slug"
          hide-details
          density="compact"
        />

        <div
          class="d-flex w-100 flex-column"
          v-if="model.action.type === ButtonActionTypesEnum.OPEN_EXTERNAL_PAGE"
        >
          <v-textarea
            v-model="model.action.url"
            label="External URL Page"
            hide-details
            density="compact"
          />
          <div class="d-flex ga-1">
            <v-checkbox
              v-model="model.action.isSameTab"
              label="Same Tab?"
              hide-details
              density="compact"
            />
            <v-checkbox
              v-model="model.action.noFollow"
              label="No Follow?"
              hide-details
              density="compact"
            />
          </div>
        </div>
        <div class="d-flex w-100 justify-end">
          <v-btn
            density="compact"
            color="primary"
            flat
            @click.prevent="menu = false"
            >Save</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
