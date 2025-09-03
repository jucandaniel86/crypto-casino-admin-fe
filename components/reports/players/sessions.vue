<script setup lang="ts">
import moment from "moment";
import { useRoute } from "vue-router";
import { SESSIONS_REPORT_HEADERS } from "./headers";
import { useGetReport } from "../useGetReport";
import { useTableHeaders } from "../useTableHeaders";
import { convertNumber } from "../Utils";

const { headers, activeHeaders, hiddenColumns, checkActiveData, } = useTableHeaders(SESSIONS_REPORT_HEADERS);
const options = ref<any>({});
const modal = ref<boolean>(false);

//composables
const route = useRoute();
const { items, loading, reloadList } = useGetReport();
const { history } = useEndpoints();

const period = ref([
	moment(route.query.fromDate as string),
	moment(route.query.toDate as string)
]);

//watchers
watch(options, () => ({
	handler() {
		getList();
	},
	deep: true,
}))

//emitters
const emitters = defineEmits(['players:download', 'players:change-report']);

//methods
const getList = () => {
	let fromDate = moment().subtract(1, "week");
	let toDate = moment();

	if (period.value && Array.isArray(period.value)) {
		fromDate = moment(period.value[0]);
		toDate = moment(period.value[1]);
	}

	reloadList({
		...route.query,
		fromDate: fromDate.format("YYYY-MM-DD HH:mm:ss"),
		toDate: toDate.format("YYYY-MM-DD HH:mm:ss")
	}, 'session');
}

const download = () => {
	emitters('players:download', {
		headers: activeHeaders.value,
		data: items.value,
	});
}

const parsePlayerTimestamp = (_timestamp: string, _start: boolean = true) => {
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

const showHistory = (_item: any) => {
	//https://prod.igameforge.com/gforge/history?siteID=MOCK&gameID=11061&fixedID=PT_OK-0_2zX3k6sG5K2WE16cA
	window.open(`${history()}?siteID=${_item.client_name}&gameID=${_item.game_id}&fixedID=${_item.operator_player_id}`, '_blank');
}

//mounted
onMounted(() => {
	getList();
})
</script>
<template>
	<div>
		<v-data-table :headers="activeHeaders" :items="items" :options.sync="options" :loading="loading" class="pa-2"
			:height="450">
			<template v-slot:top>
				<v-row no-gutters>
					<v-col cols="12" md="4" class="pa-1">
						<v-breadcrumbs :items="[
							{
								title: 'Players',
								link: true,
								exact: true,
								disabled: false,
								to: {
									path: '/reports/players',
								},
							},
							{ title: 'Sessions', href: '#', disabled: true },
							{ title: (route.query.player_id ? route.query.player_id as string : ''), href: '#', disabled: false },
						]" density="compact"></v-breadcrumbs>
					</v-col>
					<v-col cols="10" md="4" class="pa-1">
						<VueDatePicker v-model="period" :teleport="true" placeholder="Select date" :month-change-on-scroll="false"
							:enable-time-picker="false" :range="{ partialRange: false }" />
					</v-col>
					<v-col cols="2" md="2" class="pa-1">
						<v-btn color="primary" small @click.prevent="getList" :disabled="loading">
							<v-icon color="white" small>mdi-magnify</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" md="2">
						<v-row no-gutters>
							<v-col cols="6" md="12" class="pa-1 d-flex justify-end-md">
								<v-btn color="primary" :disabled="items.length === 0" @click="download" small>
									<v-icon color="white">mdi-download</v-icon>
									Download Report
								</v-btn>
							</v-col>
							<v-col cols="6" md="12" class="pa-1 d-flex justify-end-md">
								<selector-fields v-model="hiddenColumns" :items="headers" style="max-width: 220px"></selector-fields>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</template>

			<template v-slot:item="{ item }">
				<tr>
					<td v-if="checkActiveData('session_id')">
						<a href="" class="text-primary font-weight-bold" @click.prevent="showHistory(item)">{{
							item.operator_session_id
							}}</a>
					</td>
					<td v-if="checkActiveData('player_id')">{{ item.operator_player_id }}</td>
					<td v-if="checkActiveData('operator')">{{ item.client_name }}</td>
					<td v-if="checkActiveData('player_country')">
						{{ item.player_country }}
					</td>
					<td v-if="checkActiveData('total_bets')">{{ convertNumber(item.total_bets) }}</td>
					<td v-if="checkActiveData('total_wins')">{{ convertNumber(item.total_wins_amount) }}</td>
					<td v-if="checkActiveData('total_refunds')">
						{{ convertNumber(item.total_refunds) }}
					</td>
					<td v-if="checkActiveData('total_refunds_count')">
						{{ item.total_refunds_count }}
					</td>
					<td v-if="checkActiveData('ggr')">{{ convertNumber(item.ggr) }}</td>
					<td v-if="checkActiveData('bonus_bets')">{{ item.bonus_bets }}</td>
					<td v-if="checkActiveData('bonus_wins')">{{ item.bonus_wins }}</td>
					<td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
					<td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
					<td v-if="checkActiveData('total_sessions')">
						{{ item.total_sessions }}
					</td>
					<td v-if="checkActiveData('total_spins')">{{ item.total_spins }}</td>
					<td v-if="checkActiveData('total_spins')">{{ parsePlayerTimestamp(item.timestamp_player) }}</td>
					<td v-if="checkActiveData('total_spins')">{{ parsePlayerTimestamp(item.timestamp_player, false) }}</td>
				</tr>
			</template>
		</v-data-table>
		<v-dialog v-model="modal" max-width="600">
			<v-card>
				<v-card-title>Bets Details</v-card-title>
				<v-card-text> ================ </v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>
