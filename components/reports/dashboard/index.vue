<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useDashboardReports } from './useDashboardReports';

const isLoading = ref<boolean>(true);
const gameId = ref<number>();
const days = ref<number>(7);
const { report, topGames, topGamesModel, series, playersPerDay, getDashboad, playerPerDay, top10Games, top10Brands, top10Clients } = useDashboardReports();
const chartOptions = reactive({
	legend: {
		position: "top",
	},
	chart: {
		id: "ApexChart" + new Date().getTime(),
		type: "pie",
	},
	labels: [],
});
const formatNumber = (_number: number, _decimals: number = 2) => {
	return Number(_number).toLocaleString('en-US', { style: "currency", minimumFractionDigits: _decimals, currency: 'EUR' });
}
onMounted(async () => {
	isLoading.value = true;

	await getDashboad();
	await playerPerDay(days.value);
	await top10Games();
	// await top10Brands();
	// await top10Clients();

	chartOptions.labels = topGames.value.map((el: any) => el.title) as any;
	isLoading.value = false;
})

watch(gameId, () => {
	getDashboad();
});

watch(days, () => {
	playerPerDay(days.value);
})

</script>
<template>
	<v-row>
		<v-col cols="12" class="h-100">
			<v-sheet v-if="isLoading" min-height="600"
				class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4">
				<v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
			</v-sheet>

			<div v-else>
				<v-row align-content="center">
					<v-col cols="6" md="3">
						<CommonCard title="Players playing Today">
							<div class="mt-3 font-weight-bold text-h5 pl-2">
								{{ report.total_players }}
							</div>
						</CommonCard>
					</v-col>
					<v-col cols="6" md="3">
						<CommonCard title="Bets Today">
							<div class="mt-3 font-weight-bold text-h5 pl-2">
								{{ formatNumber(report.total_bets) }}
							</div>
						</CommonCard>
					</v-col>
					<v-col cols="6" md="3">
						<CommonCard title="GGR Today">
							<div class="mt-3 font-weight-bold text-h5 pl-2">
								{{ formatNumber(report.ggr) }}
							</div>
						</CommonCard>
					</v-col>
					<v-col cols="6" md="3">
						<CommonCard title="Wins Today">
							<div class="mt-3 font-weight-bold text-h5 pl-2">
								{{ formatNumber(report.total_wins) }}
							</div>
						</CommonCard>
					</v-col>
				</v-row>

				<v-row align-content="center">
					<v-col cols="12" md="6">
						<CommonCard title="Top 10 Games">
							<v-select :items="[
								{ label: 'Bets (€)', value: 'bets' },
								{ label: 'Wins (€)', value: 'wins' },
								{ label: 'GGR (€)', value: 'ggr' },
								{ label: 'Spins', value: 'spins' },
							]" item-title="label" item-value="value" v-model="topGamesModel" />
							<apexchart type="pie" :height="300" :options="chartOptions" :series="series"></apexchart>
						</CommonCard>
					</v-col>

					<v-col cols="12" md="6">
						<CommonCard title="Avg playing players per day">
							<v-select :items="[
								{ label: '7 Days', value: 7 },
								{ label: '30 Days', value: 30 },
								{ label: '90 Days', value: 90 },
							]" item-title="label" item-value="value" v-model="days" />
							<h2 class="text-h2 pa-2">{{ playersPerDay }}</h2>
						</CommonCard>

						<CommonCard title="Players playing per hour (avg)" class="mt-4">
							<h2 class="text-h2 pa-2">{{ report.players_per_hour }}</h2>
						</CommonCard>
					</v-col>
				</v-row>
			</div>
		</v-col>
	</v-row>
</template>