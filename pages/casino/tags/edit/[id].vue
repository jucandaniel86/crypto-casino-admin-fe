<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";

const title = "TAGS Administration";

useHead({
  title,
});

const sections = ref<any>([]);
const loading = ref<boolean>(false);
const saving = ref<boolean>(false);
const route = useRoute();
const pageID = route.params.id;
const form = ref({
  name: "",
  icon: "",
  id: 0,
});

//methods
const addNew = async (payload: any): Promise<void> => {
  loading.value = true;
  const { data, success, error } = await useApiPostFetch(
    "/sections/save-draft",
    {
      ...payload,
      tag: route.params.id,
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
  const { data } = await useAPIFetch("/tags/get", {
    id: route.params.id,
  });
  if (data) {
    sections.value = data.data.sections;
    form.value.name = data.data.name;
    form.value.icon = data.data.icon;
    form.value.id = data.data.id;
  }
  loading.value = false;
};

const save = async (): Promise<void> => {
  saving.value = true;
  const { data, success, error } = await useApiPostFetch(
    "/tags/save",
    form.value
  );
  if (success) {
    useNuxtApp().$toast.success(data.message);
  } else {
    useNuxtApp().$toast.error("Something went wrong");
  }
  saving.value = false;
};

//mounted
onMounted(() => {
  getPage();
});
</script>
<template>
  <SharedBreadcrumb :items="APP_BREADCRUMBS.TAG_SAVE" :title="title" />

  <v-row no-gutters>
    <v-col cols="9">
      <Section
        :page-id="pageID"
        :sections="sections"
        @onAddNew="addNew"
        @reload-list="getPage"
        :is-tag="true"
      />
    </v-col>
    <v-col cols="3">
      <v-card density="compact">
        <v-card-title>Tag Options</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.name"
            hide-details
            density="compact"
            label="Name"
          />
          <SharedIcons v-model="form.icon" :icon="form.icon" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            size="small"
            variant="flat"
            :disabled="saving"
            @click.prevent="save"
          >
            <v-icon icon="mdi-content-save" />
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
