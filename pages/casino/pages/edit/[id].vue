<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";

const title = "Page Administration";

useHead({
  title,
});

const sections = ref<any>([]);
const loading = ref<boolean>(false);
const route = useRoute();
const pageID = route.params.id;

//methods
const addNew = async (payload: any): Promise<void> => {
  loading.value = true;
  const { data, success, error } = await useApiPostFetch(
    "/sections/save-draft",
    {
      ...payload,
      page: route.params.id,
    }
  );
  if (success) {
    useNuxtApp().$toast.success(data.message);
    sections.value.push(data.data);
  } else {
    useNuxtApp().$toast.error("Something went wrong");
  }
  loading.value = false;
};

const getPage = async (): Promise<void> => {
  loading.value = true;
  const { data } = await useAPIFetch("/pages/get", {
    id: route.params.id,
  });
  if (data) {
    sections.value = data.data.sections;
  }
  loading.value = false;
};

//mounted
onMounted(() => {
  getPage();
});
</script>
<template>
  <SharedBreadcrumb :items="APP_BREADCRUMBS.PAGE_ADD" :title="title" />

  <v-row no-gutters>
    <v-col cols="9">
      <Section
        :page-id="pageID"
        :sections="sections"
        @onAddNew="addNew"
        @reload-list="getPage"
        :is-tag="false"
      />
    </v-col>
    <v-col cols="3"> PAGE OPTIONS </v-col>
  </v-row>
</template>
