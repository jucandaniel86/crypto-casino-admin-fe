<script setup lang="ts">
import { type CategoryType, CategoryViewType } from "./types";

const items = ref<CategoryType[]>([
  {
    id: 1,
    name: "1",
    seo: {},
    slug: "",
    restricted: false,
    parent_id: 0,
    children: [
      {
        id: 2,
        name: "1.2",
        children: [],
        seo: {},
        slug: "",
        restricted: false,
        parent_id: 0,
      },
      {
        id: 4,
        name: "1.4",
        seo: {},
        slug: "",
        restricted: false,
        parent_id: 0,
        children: [
          {
            id: 5,
            name: "test",
            children: [],
            seo: {},
            slug: "",
            restricted: false,
            parent_id: 0,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "3",
    children: [],
    seo: {},
    slug: "",
    restricted: false,
    parent_id: 0,
  },
]);
</script>
<template>
  <CategoriesList :view-type="CategoryViewType.EDITABLE" :items="items" />
</template>
