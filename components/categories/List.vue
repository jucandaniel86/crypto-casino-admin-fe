<script setup lang="ts">
import { type CategoryType, CategoryViewType } from "./types";

type CategoryListT = {
  hasSearch?: boolean;
  viewType: CategoryViewType;
  loading?: boolean;
  items: CategoryType[];
};
//props
const props = withDefaults(defineProps<CategoryListT>(), {
  hasSearch: true,
  loading: false,
});

//composables
const { findRecursive } = useUtils();

//models
const search = ref("");
const selected = ref<CategoryType>();

//emitters
const emitters = defineEmits(["onSelect", "onEdit", "onDelete", "onAdd"]);

//computed
const displayList = computed(() => {
  return search.value.length > 1
    ? findRecursive(search.value, "name", props.items)
    : props.items;
});

//methods
const handleEdit = (_category: CategoryType) => emitters("onEdit", _category);
const handleDelete = (_category: CategoryType) =>
  emitters("onDelete", _category.id);
const handleAdd = (_category?: CategoryType) => {
  if (_category) return emitters("onAdd", { parent: _category });
  return emitters("onAdd");
};
const handleSelect = (_category: CategoryType) => {
  selected.value = _category;
  emitters("onSelect", _category);
};

console.log("display list", displayList.value);
</script>
<template>
  <v-card>
    <v-card-title>
      <div
        v-if="props.hasSearch || props.viewType === CategoryViewType.EDITABLE"
        class="d-flex justify-space-between align-center ga-2"
      >
        <v-text-field
          v-model="search"
          v-if="props.hasSearch"
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          placeholder="Search category by name"
          variant="solo"
          density="compact"
        />
        <div
          class="d-flex justify-center align-center"
          v-if="props.viewType === CategoryViewType.EDITABLE"
        >
          <v-btn @click.prevent="handleAdd" variants="flat" color="blue">
            <v-icon icon="mdi-plus" />
            Add
          </v-btn>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th width="80%">Name</th>
            <th v-if="props.viewType === CategoryViewType.EDITABLE">Actions</th>
          </tr>
        </thead>
        <tbody>
          <CategoriesItem
            v-for="(category, i) in displayList"
            :key="category.id"
            :item="category"
            :level="0"
            :has-actions="props.viewType === CategoryViewType.EDITABLE"
            @onEdit="handleEdit"
            @onDelete="handleDelete"
          />
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
