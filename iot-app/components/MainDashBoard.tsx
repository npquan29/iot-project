'use client'

import LineChart from "./LineChart";
import { useEffect, useState } from "react";
import Elements from "./Elements";
import Devices from "./Devices";
import axios from "axios";
import { formatTimeFromISOString } from "@/helpers/formatTimeDB";

const MainDashBoard = () => {
    const defaultDataSensors = [
        { temp: 20, humi: 20, light: 2000, time: '20:20:20' },
        { temp: 25, humi: 24, light: 2430, time: '20:20:20' },
        { temp: 34, humi: 25, light: 2230, time: '20:20:20' },
        { temp: 55, humi: 20, light: 2870, time: '20:20:20' },
        { temp: 43, humi: 28, light: 2098, time: '20:20:20' },
        { temp: 25, humi: 40, light: 2910, time: '20:20:20' },
        { temp: 22, humi: 50, light: 1108, time: '20:20:20' },
        { temp: 36, humi: 23, light: 2002, time: '20:20:20' },
        { temp: 37, humi: 18, light: 3006, time: '20:20:20' },
        { temp: 28, humi: 80, light: 1129, time: '20:20:20' }
    ];

    const [dataSensors, setDataSensors] = useState(defaultDataSensors);

    // Function to generate random data
    // const generateRandomData = () => {
    //     return {
    //         temp: Math.floor(Math.random() * 100),
    //         humi: Math.floor(Math.random() * 100),
    //         light: Math.floor(Math.random() * 4096),
    //         time: getCurrentTime()
    //     };
    // };

    // Function to get current time
    // const getCurrentTime = () => {
    //     const now = new Date();
    //     return `${formatTimeUnit(now.getHours())}:${formatTimeUnit(now.getMinutes())}:${formatTimeUnit(now.getSeconds())}`;
    // };

    // Function to format time unit
    // const formatTimeUnit = (unit: number) => {
    //     return unit < 10 ? '0' + unit : unit.toString();
    // };

    // const bgTempRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDataSensor = async () => {
            const response = await axios.get('http://localhost:5000/api/sensor');
            const dataSensor = response.data.results.reverse()[0];
            const dataSensorTime = formatTimeFromISOString(dataSensor.time);

            setDataSensors(prevData => {
                // Clone previous data array
                const newData = [...prevData];

                // Push new data to the end of the array
                const newEntry = {
                    temp: dataSensor.temperature,
                    humi: dataSensor.humidity,
                    light: dataSensor.light,
                    time: dataSensorTime,
                }; // Assuming you have a function to generate random data
                newData.push(newEntry);

                // Remove the first entry from the array
                newData.shift();

                return newData;
            });
        }

        const intervalId = setInterval(() => {
            fetchDataSensor();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [dataSensors]);

    return (
        <>
            <div className="py-[30px] px-[60px] bg-blueBg">
                <div className="flex justify-between mb-[30px]">
                    <Elements values={dataSensors[dataSensors.length - 1]} />
                    {/* <div className="card">
                        <div className="card-icon bg-temp">
                            <IoThermometerOutline />
                        </div>
                        <div className="py-[10px] px-[20px] flex-1 font-poppin">
                            <div className="card-title">Temperature</div>
                            <div className="flex items-center">
                                <span className="w-[80px] text-center text-[18px] leading-[1]">{dataSensors[dataSensors.length - 1].temp} {"°C"}</span>
                                <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                    <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] temp-value`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-icon bg-humi">
                            <IoWaterOutline />
                        </div>
                        <div className="py-[10px] px-[20px] flex-1 font-poppin">
                            <div className="card-title">Humidity</div>
                            <div className="flex items-center">
                                <span className="w-[80px] text-center text-[18px] leading-[1]">{dataSensors[dataSensors.length - 1].humi} {"%"}</span>
                                <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                    <div className={`w-[${dataSensors[dataSensors.length - 1].humi}%] bg-humi h-full  leading-[1] transition-colors`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-icon bg-light">
                            <IoSunnyOutline />
                        </div>
                        <div className="py-[10px] px-[20px] flex-1 font-poppin">
                            <div className="card-title">Brightness</div>
                            <div className="flex items-center">
                                <span className="w-[80px] text-center text-[18px] leading-[1]">{dataSensors[dataSensors.length - 1].light} {"Lux"}</span>
                                <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                    <div className="bg-light h-full w-[60%] leadding-[1]"></div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="flex justify-evenly">
                    <div className="flex flex-col py-[20px] px-[30px] w-[70%] justify-center items-center border border-third rounded-lg bg-white">
                        <div className="mb-[20px] text-2xl font-poppin font-extrabold">Chart</div>
                        <LineChart dataSensors={dataSensors} />
                    </div>
                    
                    <Devices />
                </div>
            </div>
        </>
    )
}

export default MainDashBoard;