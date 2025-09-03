export const useGetReport = () => {
  const items = ref<any[]>([]);
  const loading = ref<boolean>(false);
  const totalItems = ref<number>(0);

  const reloadList = async (
    _filter: any,
    report: string,
    options: any = {}
  ) => {
    loading.value = true;
    const { success, data } = await useAPIFetch("/reports/summary-by-studios", {
      ..._filter,
      ...options,
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
