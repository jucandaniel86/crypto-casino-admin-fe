import type { ReportHeadersData } from "./Types";

export const useTableHeaders = (_headers: ReportHeadersData[]) => {
  const headers = ref<ReportHeadersData[]>(_headers);
  const hiddenColumns = ref<any[]>([]);

  const activeHeaders: any = computed(() => {
    return headers.value.filter(
      (el: ReportHeadersData) => hiddenColumns.value.indexOf(el.value) === -1
    );
  });

  const checkActiveData = (_key: any) => {
    return activeHeaders.value.map((el: any) => el.value).indexOf(_key) !== -1;
  };

  return {
    headers,
    hiddenColumns,
    activeHeaders,
    checkActiveData,
  };
};
