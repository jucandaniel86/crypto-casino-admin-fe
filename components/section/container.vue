<script setup lang="ts">
import { ContainerSection, ContainerStatus, type ContainerType } from "./setup";
type SectionContainerT = {
  item: ContainerType;
  loading?: boolean;
};
const props = defineProps<SectionContainerT>();
const statusColor = computed(() => {
  switch (props.item.status) {
    case ContainerStatus.DRAFT:
      return "orange";
    case ContainerStatus.PUBLISHED:
      return "green";
    case ContainerStatus.PRIVATE:
      return "red";
    default:
      "blue";
  }
});

const emits = defineEmits(["onDelete", "onSave"]);
const dataRef = ref<any>(props.item.data);
const name = ref(props.item.name);
const handleDataChange = (payload: any) => (dataRef.value = payload);
const handleDelete = () => emits("onDelete", props.item.id);

const save = async () =>
  emits("onSave", {
    id: props.item.id,
    data: dataRef.value,
    name: name.value,
  });
</script>
<template>
  <v-card class="mb-1" :loading="props.loading">
    <v-card-title class="d-flex justify-space-between">
      <div class="w-100">
        <v-text-field
          v-model="name"
          density="compact"
          label="Section Name"
          hide-details
        />
        <v-chip size="x-small"
          >Section ID:
          <span class="font-weight-bold">{{ props.item.id }}</span></v-chip
        >

        <v-chip size="x-small"
          >Type:
          <span class="font-weight-bold">{{
            props.item.container
          }}</span></v-chip
        >
        <v-chip size="x-small" :color="statusColor"
          >Status:
          <span class="font-weight-bold">{{ props.item.status }}</span></v-chip
        >
      </div>

      <v-spacer></v-spacer>
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
    </v-card-title>

    <v-card-text class="SectionContainer" ref="SectionContainer">
      <SectionHtml
        v-if="props.item.container === ContainerSection.HTML"
        :item="props.item"
        @on-update="handleDataChange"
      />
      <SectionSeo
        v-if="props.item.container === ContainerSection.SEO"
        :item="props.item"
        @on-update="handleDataChange"
      />
      <SectionSearch
        v-if="props.item.container === ContainerSection.SEARCH"
        :item="props.item"
        @on-update="handleDataChange"
      />
      <SectionAccordion
        v-if="props.item.container === ContainerSection.ACCORDION"
        :item="props.item"
        @on-update="handleDataChange"
      />
      <SectionProviders
        v-if="props.item.container === ContainerSection.PROVIDER_LOGOS"
        :item="props.item"
        @on-update="handleDataChange"
      />
      <SectionCategory
        v-if="props.item.container === ContainerSection.GAMES_CATEGORY"
        :item="props.item"
        @on-update="handleDataChange"
      />
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <div class="d-flex">
        <v-btn icon="mdi-arrow-up" density="compact" />
        <v-btn icon="mdi-arrow-down" density="compact" />
      </div>
      <div class="d-flex ga-2">
        <v-btn
          density="compact"
          color="blue"
          flat
          :disabled="props.loading"
          :prepend-icon="props.loading ? 'mdi-reload' : 'mdi-content-save'"
          @click.prevent="save"
          >Save</v-btn
        >

        <v-btn
          density="compact"
          color="red"
          flat
          prepend-icon="mdi-delete-outline"
          @click.prevent="handleDelete"
          >Delete</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>
<style lang="css" scoped>
.SectionContainer {
  max-height: 300px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
