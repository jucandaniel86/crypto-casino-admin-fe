<script setup lang="ts">
import { RESOURCE_HEADERS } from "./headers";
import OperatorFieldsModal from "./partials/OperatorFieldsModal.vue";
import SaveResource from "./partials/SaveResource.vue";

useSeoMeta({
  title: "Games Resources",
  ogTitle: "Games Resources",
});
definePageMeta({
  middleware: "auth",
});

//models
const games = ref<any[]>([]);
const loading = ref<boolean>(false);
const totalItems = ref<number>(0);
const searchText = ref<string>("");
const displayForm = ref<boolean>(false);
const selectedGame = ref<number | string>(0);
const openModalFields = ref<boolean>(false);

//composables
const { removeDuplicates } = useUtils();

//methods
const getGames = async (): Promise<void> => {
  const { data } = await useAPIFetch("/selector/games");
  if (data.success) {
    games.value = removeDuplicates(data.data, "id");
    totalItems.value = games.value.length;
  }
};
const add = () => {
  openModalFields.value = true;
};

const addFields = (gameID: number | string) => {
  displayForm.value = true;
  selectedGame.value = gameID;
};

//computed
const filter = (value: any, search: any, item: any) => {
  // console.log("item", item);
  return String(item.value).toLowerCase().includes(search);

  return [...games.value].filter((game) => {
    if (searchText.value.length >= 2) {
      return (
        String(game.id).toLowerCase().includes(searchText.value) ||
        String(game.label).toLowerCase().includes(searchText.value)
      );
    }
    return true;
  });
};

//mounted
onMounted(() => {
  getGames();
});
</script>
<template>
  <Transition name="fade">
    <SaveResource
      :gameId="selectedGame"
      v-if="selectedGame"
      :key="selectedGame"
      @on-modal-close="selectedGame = 0"
    />
  </Transition>

  <v-data-table
    :headers="RESOURCE_HEADERS as any"
    :items="games"
    :loading="loading"
    class="pa-2"
    :height="450"
    :hide-default-footer="true"
    :items-per-page="0"
    :search="searchText"
    filter-mode="some"
    :item-value="'id'"
  >
    <template v-slot:top>
      <v-row justify="end" class="align-center">
        <v-col cols="12" md="6" lg="3">
          <v-text-field
            v-model="searchText"
            label="Search"
            hide-details
            variant="solo"
            density="compact"
            class="filter-search text-field-component"
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn color="secondary" @click="add">
            <i class="ph-plus-circle" /> Add Operator Fields
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.actions="{ item, index }">
      <v-btn size="small" color="primary" @click="addFields(item.id)">
        <v-icon icon="mdi-file-edit-outline" />
        Add fields
      </v-btn>
    </template>
  </v-data-table>
  <v-dialog v-model="openModalFields" :max-width="600">
    <OperatorFieldsModal @on-modal-close="openModalFields = false" />
  </v-dialog>
</template>
