<script setup lang="ts">
import moment from "moment";
import { useGetReport } from "../useGetReport";
import { useTableHeaders } from "../useTableHeaders";
import { GAMES_REPORT_HEADERS } from "./headers";
import { convertNumber } from "../Utils";

//models
const options = ref<any>({});
const route = useRoute();
const { headers, activeHeaders, hiddenColumns, checkActiveData, } = useTableHeaders(GAMES_REPORT_HEADERS);
const { items, loading, reloadList } = useGetReport();
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
const emitters = defineEmits(['players:download'])

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
	}, 'games');
}

const download = () => {
	emitters('players:download', {
		headers: activeHeaders.value,
		data: items.value,
	});
}

//mounted
onMounted(() => {
	getList();
})
</script>
<template>
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
						{ title: 'Games', href: '#', disabled: true },
						{ title: (route.query.player_id ? route.query.player_id as string : ''), href: '#', disabled: false },
					]" density="compact"></v-breadcrumbs>
				</v-col>
				<v-col cols="10" md="4" class="pa-1">
					<SelectorDatetimepicker v-model="period" />
				</v-col>
				<v-col cols="2" md="2" class="pa-1">
					<v-btn color="primary" small @click.prevent="getList" :disabled="loading">
						<v-icon color="white" small>mdi-magnify</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="12" md="2" class="d-flex align-center justify-end ga-2 flex-direction-">
					<v-row no-gutters>
						<v-col cols="6" md="12" class="pa-1">
							<v-btn color="primary" :disabled="items.length === 0" @click="download" small>
								<v-icon color="white">mdi-download</v-icon>
								Download Report
							</v-btn>
						</v-col>
						<v-col cols="6" md="12" class="pa-1">
							<selector-fields v-model="hiddenColumns" :items="headers" class="mb-0"></selector-fields>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</template>

		<template v-slot:item="{ item }">
			<tr>
				<td v-if="checkActiveData('game_id')">
					{{ item.game_id }}
				</td>
				<td v-if="checkActiveData('game_name')">{{ item.game_name }}</td>
				<td v-if="checkActiveData('site_id')">{{ item.site_id }}</td>
				<td v-if="checkActiveData('total_brands')">{{ item.total_brands }}</td>
				<td v-if="checkActiveData('total_bets')">{{ convertNumber(item.total_bets) }}</td>
				<td v-if="checkActiveData('total_wins')">{{ convertNumber(item.total_wins_amount) }}</td>
				<td v-if="checkActiveData('total_refunds')">
					{{ convertNumber(item.total_refunds) }}
				</td>
				<td v-if="checkActiveData('ggr')">{{ convertNumber(item.ggr) }}</td>
				<td v-if="checkActiveData('bonus_bets')">{{ item.bonus_bets }}</td>
				<td v-if="checkActiveData('bonus_wins')">{{ item.bonus_wins }}</td>
				<td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
				<td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
				<td v-if="checkActiveData('avg_bets')">{{ item.avg_bets }}</td>
				<td v-if="checkActiveData('total_players')">
					{{ item.total_players }}
				</td>
				<td v-if="checkActiveData('total_sessions')">
					{{ item.total_sessions }}
				</td>
				<td v-if="checkActiveData('total_spins')">{{ item.total_spins }}</td>
			</tr>
		</template>
	</v-data-table>
</template>