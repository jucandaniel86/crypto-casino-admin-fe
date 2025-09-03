<script setup lang="ts">
import { useRoute } from "vue-router";
import { SESSIONS_REPORT_HEADERS } from "./headers";
import { useTableHeaders } from "../useTableHeaders";
import { useAuthStore } from "~/store/auth";
import { convertDates, decodeStr } from "../Utils";

const { user } = useAuthStore();
const { headers, hiddenColumns, activeHeaders, checkActiveData } = useTableHeaders(SESSIONS_REPORT_HEADERS);
const options = ref<any>({});
const modal = ref<boolean>(false);
const route = useRoute();

//watchers
watch(options, () => ({
	handler() {
		reloadList();
	},
	deep: true,
}))

//@ts-ignore
watch(user, () => reloadList());

//emitters
const emitters = defineEmits(['games:reload-sessions-list']);

//mounted
onMounted(() => {
	reloadList();
})

const reloadList = () => {
	emitters('games:reload-sessions-list', route.query);
}

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
	<div>
		<v-data-table :headers="activeHeaders" :items="items" :options.sync="options" :loading="loading" hide-default-footer
			class="pa-2" :height="450">
			<template v-slot:top>
				<v-row no-gutters>
					<v-col cols="12" md="4">
						<v-breadcrumbs :items="[
							{
								title: 'Games',
								link: true,
								exact: true,
								disabled: false,
								to: {
									path: '/reports/games',
								},
							},
							{ title: 'Sessions', href: '#', disabled: true },
							{ title: (route.query.gn ? decodeStr(route.query.gn as string) : ''), href: '#', disabled: false },
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
					<td v-if="checkActiveData('session_id')">
						<a class="text-primary font-weight-bold" href="" @click.prevent="modal = true">{{ item.session_id }}</a>
					</td>
					<td v-if="checkActiveData('player_id')">{{ item.operator_player_id }}</td>
					<td v-if="checkActiveData('brand')">{{ item.brand }}</td>
					<td v-if="checkActiveData('player_country')">
						{{ item.player_country }}
					</td>
					<td v-if="checkActiveData('total_bets')">{{ item.total_bets }}</td>
					<td v-if="checkActiveData('total_wins')">{{ item.total_wins }}</td>
					<td v-if="checkActiveData('total_refunds')">
						{{ item.total_refunds }}
					</td>
					<td v-if="checkActiveData('total_refunds_count')">
						{{ item.total_refunds_count }}
					</td>
					<td v-if="checkActiveData('ggr')">{{ item.ggr }}</td>
					<td v-if="checkActiveData('bonus_bets')">{{ item.bonus_bets }}</td>
					<td v-if="checkActiveData('bonus_wins')">{{ item.bonus_wins }}</td>
					<td v-if="checkActiveData('bonus_ggr')">{{ item.bonus_ggr }}</td>
					<td v-if="checkActiveData('rtp')">{{ item.rtp }}%</td>
					<td v-if="checkActiveData('total_sessions')">
						{{ item.total_sessions }}
					</td>
					<td v-if="checkActiveData('total_spins')">{{ item.total_spins }}</td>
					<td v-if="checkActiveData('total_spins')">{{ item.time_open }}</td>
					<td v-if="checkActiveData('total_spins')">{{ item.time_closed }}</td>
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
