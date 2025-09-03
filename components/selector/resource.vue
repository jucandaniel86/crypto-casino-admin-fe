<script setup lang="ts">
//type
type SelectorResouceT = {
  operatorId: any;
};
const props = defineProps<SelectorResouceT>();

//models
const items = ref<any[]>([]);
const loading = ref<boolean>(false);
const k = ref("aa");

//emitters
const emitters = defineEmits(["input"]);

//methods
const getItems = async () => {
  loading.value = true;
  const { data, success } = await useAPIFetch(
    "/resources/operator-fields/get",
    {
      operatorID: props.operatorId,
    }
  );

  if (success) {
    items.value = data.fields || [];
  }
  loading.value = false;
};

const onChange = (val: any) => {
  emitters("input", val);
};

watch(
  props,
  async () => {
    if (props.operatorId) {
      await getItems();

      k.value = `K${new Date().getTime()}`;
      return onChange(null);
    }
    items.value = [];
    k.value = `K${new Date().getTime()}`;
  },
  { deep: true }
);
</script>
<template>
  <div>
    <v-select
      @update:model-value="onChange"
      :items="items"
      label="Resource type"
      :item-title="'field_key'"
      :item-value="'id'"
      :return-object="true"
      :disabled="loading"
      hide-details
      variant="solo"
      density="compact"
      class="menu-select-filter menu-select-autocomplete"
      :key="k"
    ></v-select>
  </div>
</template>
