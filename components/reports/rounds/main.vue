<script setup lang="ts">
import { useRoute } from "vue-router";
import { ROUNDS_REPORT_HEADERS } from "./headers";
import { useTableHeaders } from "../useTableHeaders";
import moment from "moment";
import { convertDateToUTC, convertNumber } from "../Utils";
import { useGetRounds } from "../useGetRounds";
import { useAuthStore, UserTypeEnum } from "~/store/auth";
import { ROUNDS_ENDPOINTS } from "~/app/endpoints";


//composables
const { alertError } = useAlert();
const route = useRoute();
const { rounds } = useEndpoints();

//models 
const { headers, activeHeaders, hiddenColumns, checkActiveData, } = useTableHeaders(ROUNDS_REPORT_HEADERS);
const options = ref<any>({});
const { items, loading, totalItems, reloadList } = useGetRounds();
const period = ref([
	moment().subtract(1, "week"),
	moment()
]);
const modalHistory = ref<boolean>(false);
const historyUrl = ref<string>("");
const DEFAULT_ITEMS = 50;

const { user } = useAuthStore();

let exchangeValue = reactive({
	label: "EUR",
	value: 1,
})

let filter = reactive({
	currency: "",
	player_id: "",
	site_id: "",
	fromDate: period.value[0].format("YYYY-MM-DD"),
	toDate: period.value[1].format("YYYY-MM-DD")
})

//computed 
const activeItems: any = computed(() => {
	return items.value.map((el) => ({
		...el,
		total_bets: Number(exchangeValue.value * el.total_bets).toFixed(2),
		total_refunds: Number(
			exchangeValue.value * el.total_refunds
		).toFixed(2),
		ggr: Number(exchangeValue.value * el.ggr).toFixed(2),
		avg_bets: Number(exchangeValue.value * el.avg_bets).toFixed(2),
	}));
})

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

//emitters
const emitters = defineEmits(['rounds:change-report', 'rounds:download'])

//methods
const getList = (options: any = {}) => {
	const { itemsPerPage, page } = options;;

	if (filter.player_id === "") {
		return alertError("Please complete 'Player ID' field")
	}

	reloadList({
		...filter,
		itemsPerPage,
		page
	}, 'players');
}

const changeReport = (_options: any) => {
	emitters('rounds:change-report', _options);
}

const download = () => {
	emitters('rounds:download', {
		headers: activeHeaders.value,
		data: items.value,
	});
}

const showHistory = (_item: any) => {
	window.open(`${rounds()}?roundId=${_item.round_id}`, '_blank');
}

//onMounted
onMounted(() => {
	if (route.query.player_id) {
		//@ts-ignore
		filter.player_id = route.query.player_id;
		getList();
	}
});

</script>
<template>
	<v-data-table-server :headers="activeHeaders" :items="activeItems" :options.sync="options" :loading="loading"
		class="pa-2" :height="450" :items-per-page="DEFAULT_ITEMS" :items-length="totalItems" :hide-default-footer="true">
		<template v-slot:top>
			<v-row>
				<v-col cols="12" md="8">
					<v-row>
						<v-col cols="12" md="5">
							<v-text-field v-model="filter.player_id" placeholder="Player ID" hide-details variant="solo"
								density="compact" class="filter-search text-field-component" min-width="200" />
						</v-col>
						<v-col cols="12" md="3" v-if="user?.user_type !== UserTypeEnum.OPERATOR">
							<SelectorOperators v-model="filter.site_id" />
						</v-col>
						<v-col cols="9" md="8" class="pt-0 mb-2">
							<SelectorDatetimepicker v-model="period" />
						</v-col>
						<v-col cols="3" md="4" class="pt-0 mb-2">
							<v-btn color="primary" small @click.prevent="getList" :disabled="loading">
								<v-icon color="white" small>mdi-magnify</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="4">
					<v-row no-gutters>
						<v-col cols="12" class="d-flex justify-end ga-2">
							<v-btn color="primary" :disabled="items.length === 0" @click="download" small>
								<v-icon color="white">mdi-download</v-icon>
								Download Report
							</v-btn>
							<selector-fields v-model="hiddenColumns" :items="headers" style="max-width: 220px"></selector-fields>
						</v-col>
						<v-col cols="12" class="d-flex justify-end align-center pt-2">
							<v-chip x-small>Total: <b>{{ items.length }}</b></v-chip>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</template>

		<template v-slot:item="{ item }: any">
			<tr>
				<td v-if="checkActiveData('round_id')">
					<a href="" class="text-primary font-weight-bold" @click.prevent="
						changeReport({
							player_id: filter.player_id,
							toDate: filter.toDate,
							fromDate: filter.fromDate,
							site_id: filter.site_id,
							report: 'transactions',
							round_id: item.round_id
						})
						">
						{{ item.round_id }}
					</a>
				</td>
				<td v-if="checkActiveData('operator_player_id')">{{ filter.player_id }}</td>
				<td v-if="checkActiveData('game')">{{ item.game }}</td>
				<td v-if="checkActiveData('site_id')">{{ item.site_id }}</td>
				<td v-if="checkActiveData('stake')">
					{{ convertNumber(item.stake) }}
				</td>
				<td v-if="checkActiveData('returns')">
					{{ convertNumber(item.returns) }}
				</td>
				<td v-if="checkActiveData('profit')">
					{{ convertNumber(item.profit) }}
				</td>
				<td>
					<v-btn variant="tonal" @click="showHistory(item)">Details</v-btn>
				</td>
			</tr>
		</template>
	</v-data-table-server>
	<v-dialog v-model="modalHistory" scrollable max-width="800px">
		<v-card>
			<v-card-text>
				<iframe width="100%" style="min-height:500px; border: 0;" :src="historyUrl" border="0" />
			</v-card-text>
		</v-card>
	</v-dialog>
</template>