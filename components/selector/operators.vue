<script setup lang="ts">
import { useSelector } from "./useSelector";
const { operators, getOperators } = useSelector();

//props
const props = defineProps({
  defaultValue: {
    type: String,
    required: false,
    default: "",
  },
});

//models
const customKey = ref<string>("OperatorSelector");
const model = ref<any>(props.defaultValue !== "" ? props.defaultValue : "");
const loading = ref<boolean>(true);

//emitters
const emitters = defineEmits(["input"]);

const modelUpdate = (_value: any) => {
  emitters("input", _value);
};

//mounted
onMounted(async () => {
  await getOperators();
  loading.value = false;
});
</script>
<template>
  <v-autocomplete
    @update:model-value="modelUpdate"
    :items="operators"
    label="Operator"
    :item-title="'label'"
    :item-value="'val'"
    :key="customKey"
    :disabled="loading"
    hide-details
    variant="solo"
    density="compact"
    clearable
    hide-selected
    class="menu-select-filter menu-select-autocomplete"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="`${item.raw.label} (${item.raw.val})`"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>
