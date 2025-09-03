import { HISTORY_ENDPOINTS, ROUNDS_ENDPOINTS } from "~/app/endpoints";
import { useAuthStore } from "~/store/auth";

export const useEndpoints = () => {
  const { user } = useAuthStore();

  const history = () => {
    if (user && typeof HISTORY_ENDPOINTS[user.env] !== "undefined") {
      return HISTORY_ENDPOINTS[user.env];
    }
    return HISTORY_ENDPOINTS.DEV;
  };

  const rounds = () => {
    if (user && typeof ROUNDS_ENDPOINTS[user.env] !== "undefined") {
      return ROUNDS_ENDPOINTS[user.env];
    }
    return ROUNDS_ENDPOINTS.DEV;
  };

  return {
    history,
    rounds,
  };
};
