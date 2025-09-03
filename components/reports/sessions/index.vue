<script setup lang="ts">
import moment from "moment";
import { useGetReport } from "../useGetReport";
import { useTableHeaders } from "../useTableHeaders";
import { SESSIONS_REPORT_HEADERS } from "./headers";
import { convertDateToUTC, convertNumber, downloadCSVData } from "../Utils";


//models
const DEFAULT_ITEMS = 50;
const options = ref<any>({});
const firstLoading = ref<boolean>(true);
const { headers, activeHeaders, hiddenColumns, checkActiveData, } = useTableHeaders(SESSIONS_REPORT_HEADERS);
const { items, totalItems, loading, reloadList } = useGetReport();
const period = ref([
	moment().subtract(1, "week"),
	moment()
]);
const filter = reactive({
	currency: "",
	fromDate: period.value[0].format("YYYY-MM-DD"),
	toDate: period.value[1].format("YYYY-MM-DD"),
	session_id: "",
	player_id: "",
});

//computed
const activeItems: any = computed(() => {
	if (activeHeaders.value.length === 0) return items;
	return items.value.map((el) => {
		let item: any = {};
		activeHeaders.value.forEach((_el: any) => {
			if (typeof el[_el.value] !== "undefined") {
				item[_el.value] = el[_el.value];
			}
		});
		return item;
	});
});

watch(period, () => {
	if (period.value && Array.isArray(period.value)) {
		if (typeof period.value[0] !== "undefined") {
			filter.fromDate = convertDateToUTC(period.value[0]);
		}
		if (typeof period.value[1] !== "undefined") {
			filter.toDate = convertDateToUTC(period.value[1])
		}
	}
})

//methods
const getList = (options: any) => {
	//@ts-ignore
	let { itemsPerPage, page } = options;

	if (!itemsPerPage) itemsPerPage = 50;
	if (!page) page = 1;

	if (!firstLoading.value) {
		reloadList({ ...filter, itemsPerPage, page }, 'session');
	}

	firstLoading.value = false;
}

const download = () => {
	downloadCSVData({
		headers: activeHeaders.value,
		data: items.value,
	})
}

const parsePlayerTimestamp = (_timestamp: string, _start: boolean = true) => {

	if (_timestamp === "") return '';

	const timestampParts = _timestamp.split(',');
	if (timestampParts.length > 1) {

		const reorderedTimestamp = timestampParts.sort(function (a: any, b: any) {
			//@ts-ignore
			return new Date(a) - new Date(b);
		});

		if (_start) return moment(reorderedTimestamp[0]).format('HH:mm:ss');
		else return moment(reorderedTimestamp[timestampParts.length - 1]).format('HH:mm:ss');
	}
	return moment(_timestamp).format('HH:mm:ss');
}

</script>
<template>
	<v-data-table-server :headers="activeHeaders" :items="activeItems" :options.sync="options" :loading="loading"
		class="pa-2" :height="450" :items-per-page="DEFAULT_ITEMS" @update:options="getList" :items-length="totalItems">
		<template v-slot:top>
			<v-row class="align-start d-flex" no-gutters>
				<v-col cols="12" md="8">
					<v-row class="pt-2">
						<v-col cols="12" md="3">
							<v-text-field v-model="filter.session_id" label="Session ID" hide-details variant="solo" density="compact"
								class="filter-search text-field-component" />
						</v-col>
						<v-col cols="12" md="3">
							<v-text-field v-model="filter.player_id" label="Player ID" hide-details variant="solo" density="compact"
								class="filter-search text-field-component" />
						</v-col>
						<v-col cols="12" md="6">
							<div class="d-flex ga-2 align-center">
								<SelectorDatetimepicker v-model="period" />
								<v-btn color="primary" small @click.prevent="getList">
									<v-icon color="white" small>mdi-magnify</v-icon>
								</v-btn>
							</div>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="4">
					<v-row class="pt-2" no-gutters>
						<v-col cols="6" md="6" class="d-flex justify-md-end pa-1">
							<v-btn color="primary" class="pl-1 pr-1" :disabled="items.length === 0" @click="download" small>
								<v-icon color="white">mdi-download</v-icon>
								Download <b>({{ items.length }})</b>
							</v-btn>
						</v-col>
						<v-col cols="6" md="6" class="d-flex justify-md-end pa-1">
							<selector-fields v-model="hiddenColumns" :items="headers"></selector-fields>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</template>

		<template v-slot:item="{ item }: any">
			<tr>
				<td v-if="checkActiveData('client_name')">
					{{ item.client_name }}
				</td>
				<td v-if="checkActiveData('game_name')">
					{{ item.game_name }}
				</td>
				<td v-if="checkActiveData('operator_session_id')">
					{{ item.operator_session_id }}
				</td>
				<td v-if="checkActiveData('operator_player_id')">{{ item.operator_player_id }}</td>
				<td v-if="checkActiveData('player_country')">
					{{ item.player_country }}
				</td>
				<td v-if="checkActiveData('total_bets')">
					{{ convertNumber(item.total_bets) }}
				</td>
				<td v-if="checkActiveData('total_wins')">
					{{ convertNumber(item.total_wins) }}
				</td>
				<td v-if="checkActiveData('total_refunds')">
					{{ convertNumber(item.total_refunds) }}
				</td>
				<td v-if="checkActiveData('total_refunds_count')">
					{{ item.total_refunds_count }}
				</td>
				<td v-if="checkActiveData('ggr')">{{ convertNumber(item.ggr) }}</td>
				<td v-if="checkActiveData('bonus_bets')">
					{{ item.bonus_bets }}
				</td>
				<td v-if="checkActiveData('bonus_wins')">
					{{ item.bonus_wins }}
				</td>
				<td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
				<td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
				<td v-if="checkActiveData('total_spins')">
					{{ item.total_spins }}
				</td>
				<td v-if="checkActiveData('total_spins')">{{ parsePlayerTimestamp(item.timestamp_player) }}</td>
				<td v-if="checkActiveData('total_spins')">{{ parsePlayerTimestamp(item.timestamp_player, false) }}</td>
			</tr>
		</template>
	</v-data-table-server>
</template>