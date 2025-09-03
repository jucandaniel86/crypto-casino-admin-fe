<script setup lang="ts">
const props = defineProps({
  defaultValue: {
    type: String,
    required: false,
    default: "",
  },
  displayExchangeButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const items = ref({
  currencies: [],
});
const model = ref<any>(props.defaultValue !== "" ? props.defaultValue : []);
const loading = ref<boolean>(false);

//emitters
const emitters = defineEmits(["modelUpdate"]);

//computed
const customKey = () => `Currency${new Date().getTime()}`;

//watchers
watch(model, () => {
  if (!model.value) {
    emitters("modelUpdate", "");
    return;
  }
  if (Array.isArray(model.value) && model.value.length) {
    emitters("modelUpdate", model.value);
  } else {
    //@ts-ignore
    emitters("modelUpdate", model.value.value);
  }
});

const getCurrency = async () => {
  loading.value = true;
  const { data, success } = await useAPIFetch("/reports/currencies", {});
  if (success) {
    items.value = data.data;
  }
  loading.value = false;
};

//mounted
onMounted(() => {
  getCurrency();
});
</script>

<template>
  <v-autocomplete
    v-model="model"
    :items="items.currencies"
    label="Currency"
    :key="customKey"
    :disabled="loading"
    item-title="label"
    item-value="value"
    :multiple="multiple"
    :return-object="!multiple"
    hide-details
    variant="solo"
    density="compact"
    clearable
    class="menu-select-filter menu-select-autocomplete"
  ></v-autocomplete>
</template>
