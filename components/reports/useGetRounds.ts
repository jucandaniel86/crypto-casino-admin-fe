export const useGetRounds = () => {
  const items = ref<any[]>([]);
  const loading = ref<boolean>(false);
  const totalItems = ref<number>(0);

  const reloadList = async (_filter: any, report: string) => {
    loading.value = true;
    const { success, data } = await useAPIFetch("/reports/rounds", {
      ..._filter,
      report,
    });
    if (success) {
      items.value = data.data.items;
      totalItems.value = data.data.total;
    }
    loading.value = false;
  };

  return {
    items,
    loading,
    totalItems,
    reloadList,
  };
};
