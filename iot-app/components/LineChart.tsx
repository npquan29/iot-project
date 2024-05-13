"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DataEntry {
    temp: number;
    humi: number;
    light: number;
    time: string;
}

interface DashboardProps {
    dataSensors: DataEntry[]
}

// Additional
interface DataEntryV1 {
    temp: number;
    humi: number;
    light: number;
    randomSensor: number;
    time: string;
}

interface DashboardPropsV1 {
    dataSensors: DataEntryV1[]
}
// End Additional

const LineChart = ({ dataSensors }: DashboardProps) => {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                min: 0,
                max: 100
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                min: 0,
                max: 5000,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const data = {
        labels: dataSensors.map(item => item.time),
        datasets: [
            {
                label: 'Temperature',
                data: dataSensors.map(it => it.temp),
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Humidity',
                data: dataSensors.map(it => it.humi),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Brightness',
                data: dataSensors.map(it => it.light),
                borderColor: 'rgb(255, 255, 0)',
                backgroundColor: 'rgba(255, 255, 0, 0.3)',
                yAxisID: 'y1',
            },
        ],
    };

    return (
        <Line className='max-h-[352px]' options={options} data={data} />
    )
};

// Addition LineChart
// const LineChart = ({ dataSensors }: DashboardPropsV1) => {
//     const options = {
//         responsive: true,
//         interaction: {
//             mode: 'index' as const,
//             intersect: false,
//         },
//         stacked: false,
//         plugins: {
//             title: {
//                 display: false,
//             },
//         },
//         scales: {
//             y: {
//                 type: 'linear' as const,
//                 display: true,
//                 position: 'left' as const,
//                 min: 0,
//                 max: 100
//             },
//             y1: {
//                 type: 'linear' as const,
//                 display: true,
//                 position: 'right' as const,
//                 min: 0,
//                 max: 5000,
//                 grid: {
//                     drawOnChartArea: false,
//                 },
//             },
//         },
//     };

//     const data = {
//         labels: dataSensors.map(item => item.time),
//         datasets: [
//             {
//                 label: 'Temperature',
//                 data: dataSensors.map(it => it.temp),
//                 borderColor: 'rgb(255, 0, 0)',
//                 backgroundColor: 'rgba(255, 0, 0, 0.5)',
//                 yAxisID: 'y',
//             },
//             {
//                 label: 'Humidity',
//                 data: dataSensors.map(it => it.humi),
//                 borderColor: 'rgb(53, 162, 235)',
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//                 yAxisID: 'y',
//             },
//             {
//                 label: 'Brightness',
//                 data: dataSensors.map(it => it.light),
//                 borderColor: 'rgb(255, 255, 0)',
//                 backgroundColor: 'rgba(255, 255, 0, 0.3)',
//                 yAxisID: 'y1',
//             },
//             {
//                 label: 'New Sensor',
//                 data: dataSensors.map(it => it.randomSensor),
//                 borderColor: 'rgb(8, 226, 38)',
//                 backgroundColor: 'rgba(8, 226, 38, 0.3)',
//                 yAxisID: 'y1',
//             },
//         ],
//     };

//     return (
//         <Line className='max-h-[352px]' options={options} data={data} />
//     )
// };
// End Addition LineChart

export default LineChart;
