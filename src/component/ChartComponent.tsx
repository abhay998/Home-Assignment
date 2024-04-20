import React, { useEffect, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartComponentProps {
  chartOptions: Options;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartOptions }) => {
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && chartOptions) {
      chartRef.current.update(chartOptions);
    }
  }, [chartOptions]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        callback={(chart: Highcharts.Chart) => {
          if (chart) {
            chartRef.current = chart;
          }
        }}
      />
    </div>
  );
};

export default ChartComponent;
