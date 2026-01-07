<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";

const title = "Summary Report";

useHead({
  title,
});
</script>
<template>
  <SharedBreadcrumb :items="APP_BREADCRUMBS.SUMMARY" :title="title" />
  <Summary />
</template>
