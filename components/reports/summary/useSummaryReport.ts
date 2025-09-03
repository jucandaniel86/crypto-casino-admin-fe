import { convertDateToUTC } from "../Utils";

export const useSummaryReport = () => {
  const brands = ref<any[]>([]);
  const brandsLoading = ref<boolean>(false);

  const players = ref<any[]>([]);
  const playersLoading = ref<boolean>(false);

  const games = ref<any[]>([]);
  const gamesLoading = ref<boolean>(false);

  const summary = ref<any[]>([]);
  const summaryLoading = ref<boolean>(false);

  const wageredDays = ref<any[]>([]);
  const wageredDaysLoading = ref<boolean>(false);

  const getReport = async (_filter: any, _report: any) => {
    const { data, success } = await useAPIFetch("/reports/summary-by-studios", {
      report: _report,
      ..._filter,
      fromDate: convertDateToUTC(_filter.fromDate),
      toDate: convertDateToUTC(_filter.toDate),
    });

    if (success) {
      return data.data.items;
    }

    return [];
  };

  const getBrandsReport = async (_filter: any) => {
    brandsLoading.value = true;
    brands.value = await getReport(_filter, "brands");
    brandsLoading.value = false;
  };

  const getPlayersReport = async (_filter: any) => {
    playersLoading.value = true;
    players.value = await getReport(_filter, "players");
    playersLoading.value = false;
  };

  const getGamesReport = async (_filter: any) => {
    gamesLoading.value = true;
    games.value = await getReport(_filter, "games");
    gamesLoading.value = false;
  };

  const getSummaryReport = async (_filter: any) => {
    summaryLoading.value = true;
    summary.value = await getReport(_filter, "");
    summaryLoading.value = false;
  };

  const getWageredByDays = async (_filter: any) => {
    wageredDaysLoading.value = true;
    const { data, success } = await useAPIFetch("/reports/wagerd-by-days", {
      ..._filter,
      fromDate: convertDateToUTC(_filter.fromDate),
      toDate: convertDateToUTC(_filter.toDate),
    });

    if (success) {
      wageredDays.value = data.data;
      return data.data.result;
    }
    wageredDaysLoading.value = false;
  };

  return {
    brands,
    brandsLoading,
    players,
    playersLoading,
    games,
    gamesLoading,
    summary,
    summaryLoading,
    wageredDays,
    wageredDaysLoading,
    getBrandsReport,
    getPlayersReport,
    getGamesReport,
    getSummaryReport,
    getWageredByDays,
  };
};
