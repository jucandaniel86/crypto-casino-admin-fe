<script setup lang="ts">
import { useRoute } from "vue-router";
import type { ReportHeadersData } from "../Types";
import { GAMES_REPORT_HEADERS } from "./headers";
import { useAuthStore } from "~/store/auth";
import { convertDates, convertNumber } from "../Utils";

const { user } = useAuthStore();
const headers = ref<ReportHeadersData[]>(GAMES_REPORT_HEADERS);
const options = ref<any>({});
const hiddenColumns = ref<any[]>([]);
const route = useRoute();

//computed
const activeHeaders: any = computed(() => {
	return headers.value.filter(
		(el: ReportHeadersData) => hiddenColumns.value.indexOf(el.value) === -1
	)
})

//watchers
watch(options, () => ({
	handler() {
		reloadList();
	},
	deep: true,
}))

//@ts-ignore
watch(user, () => {
	reloadList();
})

//emitters
const emitters = defineEmits(['summary:reload-games-list', 'summary:change-report']);

//methods
const changeReport = (_options: any) => {
	emitters('summary:change-report', _options);
}

const reloadList = () => {
	emitters('summary:reload-games-list', route.query);
}

const checkActiveData = (_key: any) => {
	return activeHeaders.value.map((el: any) => el.value).indexOf(_key) !== -1;
}

//mounted
onMounted(() => {
	reloadList();
})

//props 
defineProps({
	loading: {
		type: Boolean,
		required: false,
		default: false,
	},
	items: {
		type: Array,
		required: true,
	}
}) 
</script>
<template>
	<v-data-table :headers="activeHeaders" :items="items" :options.sync="options" :loading="loading" hide-default-footer
		class="pa-2" :height="450" :items-per-page="-1">
		<template v-slot:top>
			<v-row no-gutters>
				<v-col cols="12" md="4">
					<v-breadcrumbs :items="[
						{
							title: 'Summary',
							href: '#',
							exact: true,
							to: {
								path: '/reports/summary',
							},
						},
						{ title: 'Games', href: '#', disabled: true },
						{ title: (route.query.site_id ? route.query.site_id as string : ''), href: '#', disabled: false },
					]" density="compact"></v-breadcrumbs>
				</v-col>
				<v-col cols="12" md="5" align-self="center" class="d-flex justify-end pr-2">
					<b>{{ convertDates() }}</b>
				</v-col>
				<v-col cols="12" md="3">
					<div class="d-flex ga-2 align-center justify-end">
						<selector-fields v-model="hiddenColumns" :items="headers" style="max-width: 220px"></selector-fields>
					</div>
				</v-col>
			</v-row>
		</template>

		<template v-slot:item="{ item }: any">
			<tr>
				<td v-if="checkActiveData('game_id')">{{ item.game_id }}</td>
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