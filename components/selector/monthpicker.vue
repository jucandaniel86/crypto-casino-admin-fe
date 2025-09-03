<script setup lang="ts">
const month = ref({
	month: new Date().getMonth(),
	year: new Date().getFullYear()
}); 
</script>
<template>
	<VueDateTimePicker v-model="month" month-picker :teleport="true" />
</template>