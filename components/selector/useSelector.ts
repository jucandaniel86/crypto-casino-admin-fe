import { useAPIFetch } from "../../composables/useApiFetch";

export const useSelector = () => {
  const games = ref<any[]>([]);
  const operators = ref<any[]>([]);

  const getGames = async () => {
    const { data, success } = await useAPIFetch("/selector/games");
    if (success) {
      games.value = data.data;
    }
  };

  const getOperators = async () => {
    const { data, success } = await useAPIFetch("/selector/operators");
    if (success) {
      operators.value = data.data;
    }
  };

  return {
    games,
    operators,
    getGames,
    getOperators,
  };
};
