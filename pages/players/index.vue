<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";

const title = "Players Administration";

useHead({
  title,
});
</script>
<template>
  <SharedBreadcrumb :items="APP_BREADCRUMBS.PLAYERS" :title="title" />
  <Players />
</template>
