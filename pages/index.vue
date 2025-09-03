<script setup lang="ts">
import { APP_BREADCRUMBS } from "~/app/breadcrumbs";
console.log("index page");
</script>

<template>
  <SharedBreadcrumb :title="'Dashboard'" :items="APP_BREADCRUMBS.DASHBOARD" />
</template>
