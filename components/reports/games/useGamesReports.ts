export const useGamesReports = () => {
  const games = ref<any[]>([]);
  const gamesLoading = ref<boolean>(false);

  const players = ref<any[]>([]);
  const playersLoading = ref<boolean>(false);

  const sessions = ref<any[]>([]);
  const sessionsLoading = ref<boolean>(false);

  const getReport = async (_filter: any, _report: any) => {
    const { data, success } = await useAPIFetch("/reports/summary-by-studios", {
      report: _report,
      ..._filter,
    });

    if (success) {
      return data.data.items;
    }

    return [];
  };

  const getGamesReport = async (_filter: any) => {
    gamesLoading.value = true;
    games.value = await getReport(_filter, "games");
    gamesLoading.value = false;
  };

  const getPlayersReport = async (_filter: any) => {
    playersLoading.value = true;
    players.value = await getReport(_filter, "players");
    playersLoading.value = false;
  };

  const getSessionsReport = async (_filter: any) => {
    sessionsLoading.value = true;
    sessions.value = await getReport(_filter, "sessions");
    sessionsLoading.value = false;
  };

  return {
    games,
    gamesLoading,
    players,
    playersLoading,
    sessions,
    sessionsLoading,
    getGamesReport,
    getPlayersReport,
    getSessionsReport,
  };
};
