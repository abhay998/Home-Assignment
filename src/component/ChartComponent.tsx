// ChartComponent.tsx

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
      // Update the chart with new options
      chartRef.current.update(chartOptions);
    }
  }, [chartOptions]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        // Using a callback ref to get the Highcharts chart instance
        callback={(chart: any) => {
          if (chart) {
            // Store the chart instance in the ref
            chartRef.current = chart;
          }
        }}
      />
    </div>
  );
};

export default ChartComponent;
