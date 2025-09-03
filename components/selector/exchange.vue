<script setup lang="ts">
// type ExchangeType = {
//   defaultValue?: any;
// };
// //props
// const props = withDefaults(defineProps<ExchangeType>(), {
//   defaultValue: "",
// });

//models
const items = ref<any[]>([]);
let model = defineModel();
const loading = ref<boolean>(true);
const popup = ref<boolean>(false);
const search = ref<string>("");

//methods
const getCurrency = async () => {
  const { data, success } = await useAPIFetch("/reports/currencies", {});
  if (success) {
    items.value = data.data.exchange;
  }
  loading.value = false;
};
const openPopup = () => (popup.value = true);
const onClose = () => {
  popup.value = false;
  search.value = "";
};
const onSelect = (item: any) => {
  model.value = item.value;
  onClose();
};

//computed
const activeCurrencies = computed(() => {
  return items.value.filter((item) => {
    return item.label.includes(search.value.toUpperCase());
  });
});

//mounted
onMounted(() => {
  getCurrency();
});
</script>
<template>
  <div class="d-flex">
    <v-btn color="primary" @click="openPopup" small>
      <v-icon color="white">mdi-currency-sign</v-icon>
      Exchange
    </v-btn>
    <v-dialog v-model="popup">
      <v-card class="mx-auto" max-width="300" :width="400" :height="400">
        <v-card-title>
          <v-icon size="x-small" color="blue">mdi-currency-sign</v-icon>
          Exchange
        </v-card-title>
        <v-card-text class="pt-0 pl-1 pr-1 pb-0">
          <v-text-field
            v-model="search"
            label="Search by currency"
            hide-details
            variant="solo"
            density="compact"
            class="filter-search text-field-component"
          />
          <v-list
            density="compact"
            lines="one"
            style="max-height: 240px; overflow: scroll"
          >
            <v-list-item
              v-for="(item, i) in activeCurrencies"
              :key="`List_Exchange${i}`"
              :value="item"
              color="primary"
              @click="onSelect(item)"
            >
              <template v-slot:prepend>
                <v-icon :icon="'mdi-arrow-left-bold-box-outline'"></v-icon>
              </template>

              <v-list-item-title v-text="item.label"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn :append-icon="'mdi-close'" @click.prevent="onClose"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
