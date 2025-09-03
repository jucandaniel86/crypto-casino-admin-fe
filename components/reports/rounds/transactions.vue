<script setup lang="ts">
import moment from "moment";
import { useRoute } from "vue-router";
import { TRANSACTIONS_REPORT_HEADERS } from "./headers";
import { useGetTransactions } from "../useGetTransactions";
import { useTableHeaders } from "../useTableHeaders";
import { convertNumber } from "../Utils";

const DEFAULT_ITEMS = 50;

const { headers, activeHeaders, hiddenColumns, checkActiveData, } = useTableHeaders(TRANSACTIONS_REPORT_HEADERS);
const options = ref<any>({});
const route = useRoute();
const { items, loading, reloadList, totalItems } = useGetTransactions();

const period = ref([
	moment(route.query.fromDate as string),
	moment(route.query.toDate as string)
]);

//emitters
const emitters = defineEmits(['players:download', 'players:change-report']);

//methods
const getList = (options: any = {}) => {
	let fromDate = moment().subtract(1, "week");
	let toDate = moment();

	if (period.value && Array.isArray(period.value)) {
		fromDate = moment(period.value[0]);
		toDate = moment(period.value[1]);
	}

	const { itemsPerPage, page } = options;;

	reloadList({
		...route.query,
		...options,
		fromDate: fromDate.format("YYYY-MM-DD HH:mm:ss"),
		toDate: toDate.format("YYYY-MM-DD HH:mm:ss"),
		roundComplete: true,
		itemsPerPage,
		page
	}, 'session');
}

const download = () => {
	emitters('players:download', {
		headers: activeHeaders.value,
		data: items.value,
	});
}

const formatDate = (_date: string) => moment(_date).format("YYYY-MM-DD HH:mm:ss")

</script>
<template>
	<div>
		<v-data-table-server :headers="activeHeaders" :items="items" :options.sync="options" :loading="loading"
			:items-per-page="DEFAULT_ITEMS" @update:options="getList" :items-length="totalItems" class="pa-2" :height="450">
			<template v-slot:top>
				<v-row no-gutters>
					<v-col cols="12" md="9" class="pa-1">
						<v-row no-gutters>
							<v-col md="5" cols="12">
								<v-breadcrumbs :items="[
									{
										title: 'Player Rounds',
										link: true,
										exact: true,
										disabled: false,
										to: {
											path: '/reports/rounds',
										},
									},
									{
										title: 'Transactions for user ' + (route.query.player_id ? route.query.player_id as string : ''),
										link: true,
										exact: true,
										disabled: false,

										to: {
											path: '/reports/rounds',
											query: {
												'player_id': route.query.player_id
											},
										},
									},
									{ title: (route.query.round_id ? route.query.round_id as string : ''), href: '#', disabled: true },
								]" density="compact"></v-breadcrumbs>
							</v-col>
							<v-col md="5" cols="10" class="pa-1">
								<SelectorDatetimepicker v-model="period" />
							</v-col>
							<v-col md="2" cols="2" class="pa-1">
								<v-btn color="primary" small @click.prevent="getList" :disabled="loading">
									<v-icon color="white" small>mdi-magnify</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="12" md="3">
						<v-row no-gutters>
							<v-col cols="6" md="12" class="d-flex justify-md-end pa-1">
								<v-btn color="primary" :disabled="items.length === 0" @click="download" small>
									<v-icon color="white">mdi-download</v-icon>
									Download Report
								</v-btn>
							</v-col>
							<v-col cols="6" md="12" class="d-flex justify-md-end pa-1">
								<selector-fields v-model="hiddenColumns" :items="headers"></selector-fields>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</template>

			<template v-slot:item="{ item }">
				<tr>
					<td v-if="checkActiveData('bet_id')">{{ item.id }}</td>
					<td v-if="checkActiveData('date')">{{ item.date }}</td>
					<td v-if="checkActiveData('currency')">{{ item.currency }}</td>
					<td v-if="checkActiveData('stake')">{{ convertNumber(item.stake) }}</td>
					<td v-if="checkActiveData('returns')">{{ convertNumber(item.returns) }}</td>
				</tr>
			</template>
		</v-data-table-server>
	</div>
</template>
