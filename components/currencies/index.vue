<script setup lang="ts">
import moment from "moment";
import { useAuthStore } from "~/store/auth";

//components
import type { ReportHeadersData } from "../reports/Types";

const DEFAULT_ITEMS_PER_PAGE = 50;

//types
type CurrencyType = {
	id: number;
	update_time: string;
	currency: string;
	rate: number;
}

//models
const { user } = storeToRefs(useAuthStore());
const totalItems = ref<number>(0);
const items = ref<CurrencyType[]>([]);
const loading = ref<boolean>(true);
const searchText = ref<string>("");
const options = ref<any>({});
const headers = ref<ReportHeadersData[]>([
	{
		title: "Currency",
		align: "start",
		sortable: false,
		value: "name",
		width: "70%",
	},
	{
		title: "Rate",
		align: "start",
		sortable: false,
		value: "created_at",
		width: "30%",
	},
]);

//watchers 
watch(options, () => ({
	handler() {
		reloadList();
	},
	deep: true,
}))

//methods
const convertDate = (date: string) => moment(date).format("MM/DD/YYYY H:mm");

const reloadList = async () => {
	loading.value = true;
	const { page, itemsPerPage } = options.value;

	const { success, data } = await useAPIFetch("/selector/currencies", {
		start: page,
		length: itemsPerPage,
		search: searchText.value,
	});
	if (success) {
		items.value = data.data;
		totalItems.value = data.data.length;
	}

	loading.value = false;
}

const onClear = () => {
	searchText.value = "";
	reloadList();
}

//watch
watch(searchText, () => {
	if (searchText.value.length >= 2) {
		reloadList();
	}
})

//mounted
onMounted(() => {
	reloadList();
});
</script>
<template>
	<v-data-table :headers="headers as any" :items="items" :options.sync="options" :server-items-length="totalItems"
		:loading="loading" class="elevation-1 pa-2" :height="550" :items-per-page="DEFAULT_ITEMS_PER_PAGE">
		<template v-slot:top>
			<v-row justify="end" class="align-center">
				<v-col cols="12" md="6" lg="3">
					<v-text-field v-model="searchText" label="Search" hide-details variant="solo" density="compact"
						class="filter-search text-field-component" clearable @click:clear="onClear"></v-text-field>
				</v-col>
			</v-row>
		</template>
		<template v-slot:item="{ item }">
			<tr :class="{
				'active-user': user && user.id === item.id,
			}">
				<td class="custom-class">
					{{ item.currency }} <br />
					<v-chip size="x-small">{{ convertDate(item.update_time) }}</v-chip>
				</td>
				<td class="custom-class">{{ item.rate }}</td>
			</tr>
		</template>
	</v-data-table>
</template>