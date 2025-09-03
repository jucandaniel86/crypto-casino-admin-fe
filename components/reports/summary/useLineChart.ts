import moment from "moment";

type WeagerdSeries = {
  date: string;
  operator: string;
  total: number;
};

export const useLineChart = () => {
  var options = {
    series: [],
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Number(val).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        });
      },
    },

    markers: {
      size: 0,
    },
    title: {
      text: "Wagered by period",
      align: "left",
    },

    yaxis: {
      labels: {
        formatter: function (val: number) {
          return Number(val).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          });
        },
      },
      title: {
        text: "Weagerd",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return Number(val).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          });
        },
      },
    },
  };

  const chartOptions = ref(options);
  const series = ref<any>([]);

  const formatSeries = (_data: any[]) => {
    const { result, sites }: any = _data;
    const r: any[] = [];

    sites.forEach((site: string) => {
      let data: any[] = [];

      Object.entries(result)
        .sort((a: any, b: any) => {
          //@ts-ignore
          return new Date(a[0]) - new Date(b[0]);
        })
        .map((el: any) => {
          const dt = String(el[0]);
          const values = el[1];
          data.push([dt, values.find((el: any) => el.operator === site).value]);
        });

      r.push({
        name: site,
        data,
      });
    });

    series.value = r;
  };

  return {
    chartOptions,
    series,
    formatSeries,
  };
};
