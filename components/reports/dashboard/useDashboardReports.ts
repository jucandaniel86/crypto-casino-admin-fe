import { topGamesModelEnum } from "../Types";
import { type useAPIFetchType } from "~/composables/useApiFetch";

export const useDashboardReports = () => {
  const topGames = ref<any[]>([]);
  const topGamesModel = ref<topGamesModelEnum>(topGamesModelEnum.BETS);
  const report = ref<any>({});
  const playersPerDay = ref<number>(0);

  const series = computed(() => {
    switch (topGamesModel.value) {
      case topGamesModelEnum.BETS:
        return topGames.value.map((el: any) => el.total_bets);
      case topGamesModelEnum.SPINS:
        return topGames.value.map((el: any) => el.spins);
      case topGamesModelEnum.WINS:
        return topGames.value.map((el: any) => el.total_wins);
      case topGamesModelEnum.GGR:
        return topGames.value.map((el: any) => el.ggr);
      default:
        return topGames.value.map((el: any) => el.total_bets);
    }
  });

  const getDashboad = async () => {
    const response: useAPIFetchType = await useAPIFetch("/reports/dashboard");
    if (response.success) {
      report.value = response.data.data;
    }
  };

  const playerPerDay = async (days: number) => {
    const response: useAPIFetchType = await useAPIFetch(
      "/reports/players-per-day",
      { days }
    );
    if (response.success) {
      playersPerDay.value = response.data.data.totalPlayers;
    }
  };

  const top10Games = async () => {
    const response: useAPIFetchType = await useAPIFetch("/reports/top-10", {
      group: "game",
    });
    if (response.success) {
      topGames.value = response.data.data;
    }
  };

  const top10Brands = async () => {
    const response: useAPIFetchType = await useAPIFetch("/reports/top-10", {
      group: "brand",
    });
    if (response.success) {
      topGames.value = response.data.data;
    }
  };

  const top10Clients = async () => {
    const response: useAPIFetchType = await useAPIFetch("/reports/top-10", {
      group: "client",
    });
    if (response.success) {
      topGames.value = response.data.data;
    }
  };

  return {
    report,
    topGames,
    playersPerDay,
    series,
    topGamesModel,
    getDashboad,
    playerPerDay,
    top10Games,
    top10Brands,
    top10Clients,
  };
};
