import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import typeExpenses from "../../data/typeExpense";
import slugify from "../../utility/slugify";

import ChartDataLables from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLables);

function Chart({ list }) {
  const refType = {};
  let data: number[] = [];
  let colors: string[] = [];
  let totalSum = 0;
  
  if (list.length > 0) {
    list.map(function(item) {
      const { tipo } = item;
      if (Object.prototype.hasOwnProperty.call(refType, tipo)) {
        refType[tipo].count += 1;
      } else {
        refType[tipo] = {
          count: 1,
          color: typeExpenses[slugify(tipo)].color
        }
      }
      totalSum += 1;
    });

    data = Object.keys(refType).map(function(i) {
      return refType[i].count;
    });
    
    colors = Object.keys(refType).map(function(i) {
      return refType[i].color;
    });
  }

  return (
    <div className='p-2'>
      <Pie className="m-x-auto" width={"100%"} style={{maxWidth: '100%'}} data={
        {
          labels: [...Object.keys(refType)],
          datasets: [
            {
              data: data,
              backgroundColor: colors
            },
          ],
        }
      }
      options={
        {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: {
              color: "#fff",
              font: { size: 10 },
              backgroundColor: 'rgba(0,0,0,0.4)',
              formatter: function(value, context) {
                return `${context.chart.data.labels![context.dataIndex]}\n${value} (${(value/totalSum * 100).toFixed(2)}%)`;
              }
            },
          }
        }
      } />
    </div>
  )
};

export default Chart;
