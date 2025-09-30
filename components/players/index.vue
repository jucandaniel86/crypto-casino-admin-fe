<script setup lang="ts">
import moment from "moment";
import { PLAYERS_TABLE_HEADERS } from "./headers";

//composables
const router = useRouter();

//models
const totalItems = ref(0);
const items = ref<any[]>();
const loading = ref(true);
const searchText = ref("");
const options = ref<any>({});

//methods
const reloadList = async () => {
  loading.value = true;
  const { page, itemsPerPage } = options.value;

  const { success, data } = await useAPIFetch("/players/list", {
    start: page,
    length: itemsPerPage,
    search: searchText.value,
  });
  if (success) {
    items.value = data.data.items;
    totalItems.value = data.data.total;
  }

  loading.value = false;
};
const formatDate = (date: string) => moment(date).fromNow();
const activity = (userID: number) =>
  router.push({ name: "players-activity-id", params: { id: userID } });

//watchers
watch(
  options,
  () => {
    reloadList();
  },
  { deep: true }
);

watch(searchText, () => {
  if (searchText.value && searchText.value.length > 2) {
    return reloadList();
  }
  if (searchText.value.length <= 1) reloadList();
});

//onMounted
onMounted(() => {
  reloadList();
});
</script>
<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center ga-2">
      <v-text-field
        v-model="searchText"
        label="Search"
        chips
        hide-details
        density="compact"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="PLAYERS_TABLE_HEADERS"
        :items="items"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        :search="searchText"
        class="elevation-1"
        :height="400"
        density="compact"
        fixed-header
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.email }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.fixed_id }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>
              <v-btn
                flat
                variant="tonal"
                color="blue"
                @click.prevent="activity(item.id)"
                size="small"
                >Activity</v-btn
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
