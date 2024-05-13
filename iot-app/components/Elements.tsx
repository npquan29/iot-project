import { useEffect, useRef } from "react";
import { IoThermometerOutline, IoWaterOutline, IoSunnyOutline, IoColorWand  } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IValueProps {
    values: {
        temp: number,
        humi: number,
        light: number,
        time: string
    }
};

interface IValueV1Props {
    values: {
        temp: number,
        humi: number,
        light: number,
        randomSensor: number,
        time: string
    }
};


// Show case 1
const Elements = ({ values }: IValueProps) => {
    const bgTempRef = useRef<HTMLDivElement>(null);
    const bgHumiRef = useRef<HTMLDivElement>(null);
    const bgLightRef = useRef<HTMLDivElement>(null);

    
    const notification = (message: string) => {
        toast.error(message, {
            autoClose: 2000,
            theme: 'colored',
            position: 'top-center',
            hideProgressBar: true,
            pauseOnHover: false
        })
    }

    // const getTempBg = () => {
    //     if (values.temp < 25) {
    //         return 'temp-1';
    //     }
    //     else if (values.temp < 40) {
    //         return 'temp-2';
    //     }
    //     return 'temp-3';
    // }

    // const getHumiBg = () => {
    //     if (values.humi < 30) {
    //         return 'humi-1';
    //     }
    //     else if (values.humi < 70) {
    //         return 'humi-2';
    //     }
    //     return 'humi-3';
    // }

    // const getLightBg = () => {
    //     if (values.light < 1500) {
    //         return 'light-1';
    //     }
    //     else if (values.light < 3500) {
    //         return 'light-2';
    //     }
    //     return 'light-3';
    // }

    useEffect(() => {
        if (bgTempRef.current) {
            const temperature = values.temp;
            bgTempRef.current.style.width = `${temperature}%`;
            bgTempRef.current.className = `bg-temp h-full leading-[1] transition-all`;
        }
        if (bgHumiRef.current) {
            const humidity = values.humi;
            bgHumiRef.current.style.width = `${humidity}%`;
            bgHumiRef.current.className = `bg-humi h-full leading-[1] transition-all`;
        }
        if (bgLightRef.current) {
            const brightness = values.light;
            bgLightRef.current.style.width = `${Math.floor(brightness / 4095 * 100)}%`;
            bgLightRef.current.className = `bg-light h-full leading-[1] transition-all`;
        }
        // if (values.temp >= 40) {
        //     notification('High temperature !');
        // }
        // if(values.humi >= 70) {
        //     notification('High humidity');
        // }
    }, [values]);

    return (
        <>
            <div className="flex justify-between mb-[30px]">
                <div className="card">
                    <div className="card-icon bg-temp">
                        <IoThermometerOutline />
                    </div>
                    <div className="py-[10px] px-[20px] flex-1 font-poppin">
                        <div className="card-title">Temperature</div>
                        <div className="flex items-center">
                            <span className="w-[80px] text-center text-[18px] leading-[1]">{values.temp} {"°C"}</span>
                            <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] transition-all`}></div>
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
                            <span className="w-[80px] text-center text-[18px] leading-[1]">{values.humi} {"%"}</span>
                            <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                <div ref={bgHumiRef} className={`bg-humi h-full leading-[1] transition-all`}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon bg-light">
                        <IoSunnyOutline />
                    </div>
                    <div className={`py-[10px] px-[20px] flex-1 font-poppin ${values.light > 2000 ? 'alertSensor' : ''}`}>
                        <div className="card-title">Brightness</div>
                        <div className="flex items-center">
                            <span className="w-[80px] text-center text-[18px] leading-[1]">{values.light} {"Lux"}</span>
                            <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                <div ref={bgLightRef} className="bg-light h-full leading-[1] transition-all"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="flex justify-between mb-[30px]">
                <div className="card">
                    <div className={`card-icon ${getTempBg()}`}>
                        <IoThermometerOutline />
                    </div>
                    <div className={`py-[10px] px-[20px] flex-1 font-poppin`}>
                        <div className="card-title">Temperature</div>
                        <div className="flex items-center">
                            <span className="w-[80px] text-center text-[18px] leading-[1]">{values.temp} {"°C"}</span>
                            <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] transition-all`}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className={`card-icon ${getHumiBg()}`}>
                        <IoWaterOutline />
                    </div>
                    <div className={`py-[10px] px-[20px] flex-1 font-poppin`}>
                        <div className="card-title">Humidity</div>
                        <div className="flex items-center">
                            <span className="w-[80px] text-center text-[18px] leading-[1]">{values.humi} {"%"}</span>
                            <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                <div ref={bgHumiRef} className={`bg-humi h-full leading-[1] transition-all`}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className={`card-icon ${getLightBg()}`}>
                        <IoSunnyOutline />
                    </div>
                    <div className="py-[10px] px-[20px] flex-1 font-poppin">
                        <div className="card-title">Brightness</div>
                        <div className="flex items-center">
                            <span className="w-[80px] text-center text-[18px] leading-[1]">{values.light} {"Lux"}</span>
                            <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
                                <div ref={bgLightRef} className="bg-light h-full leading-[1] transition-all"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <ToastContainer pauseOnFocusLoss={false} />
        </>
    )
}
// End Show case 1

/* Addition Sensor */
// const Elements = ({ values }: IValueV1Props) => {
//     const bgTempRef = useRef<HTMLDivElement>(null);
//     const bgHumiRef = useRef<HTMLDivElement>(null);
//     const bgLightRef = useRef<HTMLDivElement>(null);
//     const bgSensorRef = useRef<HTMLDivElement>(null);

//     // Warnning
//     // if (values.temp >= 40) {
//     //     notification('High temperature !');
//     // }
//     // if(values.humi >= 70) {
//     //     notification('High humidity');
//     // }

//     const getTempBg = () => {
//         if (values.temp < 25) {
//             return 'temp-1';
//         }
//         else if (values.temp < 40) {
//             return 'temp-2';
//         }
//         return 'temp-3';
//     }

//     const getHumiBg = () => {
//         if (values.humi < 30) {
//             return 'humi-1';
//         }
//         else if (values.humi < 70) {
//             return 'humi-2';
//         }
//         return 'humi-3';
//     }

//     const getLightBg = () => {
//         if (values.light < 1500) {
//             return 'light-1';
//         }
//         else if (values.light < 3500) {
//             return 'light-2';
//         }
//         return 'light-3';
//     }

//     const getSensorBg = () => {
//         if (values.randomSensor < 250) {
//             return 'sensor-1';
//         }
//         else if (values.randomSensor < 500) {
//             return 'sensor-2';
//         }
//         return 'sensor-3';
//     }

//     useEffect(() => {
//         if (bgTempRef.current) {
//             const temperature = values.temp;
//             bgTempRef.current.style.width = `${temperature}%`;
//             bgTempRef.current.className = `bg-temp h-full leading-[1] transition-all`;
//         }
//         if (bgHumiRef.current) {
//             const humidity = values.humi;
//             bgHumiRef.current.style.width = `${humidity}%`;
//             bgHumiRef.current.className = `bg-humi h-full leading-[1] transition-all`;
//         }
//         if (bgLightRef.current) {
//             const brightness = values.light;
//             bgLightRef.current.style.width = `${Math.floor(brightness / 4095 * 100)}%`;
//             bgLightRef.current.className = `bg-light h-full leading-[1] transition-all`;
//         }
//         if (bgSensorRef.current) {
//             const sensor = values.randomSensor;
//             bgSensorRef.current.style.width = `${Math.floor(sensor / 1000 * 100)}%`;
//             bgSensorRef.current.className = `bg-sensor h-full leading-[1] transition-all`;
//         }
//     }, [values]);

//     return (
//         <>
//             {/* Show Case First */}
//             {/* <div className="flex justify-between mb-[30px]">
//                 <div className="card">
//                     <div className="card-icon bg-temp">
//                         <IoThermometerOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Temperature</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.temp} {"°C"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className="card-icon bg-humi">
//                         <IoWaterOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Humidity</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.humi} {"%"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgHumiRef} className={`bg-humi h-full leading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className="card-icon bg-light">
//                         <IoSunnyOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Brightness</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.light} {"Lux"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgLightRef} className="bg-light h-full leading-[1] transition-all"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//             {/* End Show Case First */}
            
//             {/* Show Case First Additional */}
//             {/* <div className="flex justify-between mb-[30px]">
//                 <div className="card-v1">
//                     <div className="card-icon bg-temp">
//                         <IoThermometerOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Temperature</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.temp} {"°C"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card-v1">
//                     <div className="card-icon bg-humi">
//                         <IoWaterOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Humidity</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.humi} {"%"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgHumiRef} className={`bg-humi h-full leading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card-v1">
//                     <div className="card-icon bg-light">
//                         <IoSunnyOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Brightness</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.light} {"Lux"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgLightRef} className="bg-light h-full leading-[1] transition-all"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card-v1">
//                     <div className="card-icon bg-sensor">
//                         <IoColorWand />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">New Sensor</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.randomSensor} {"Unit"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgSensorRef} className="bg-sensor h-full leading-[1] transition-all"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//             {/* End Show Case First Additional */}

//             {/* Show Case 2 */}
//             {/* <div className="flex justify-between mb-[30px]">
//                 <div className="card">
//                     <div className={`card-icon ${getTempBg()}`}>
//                         <IoThermometerOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Temperature</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.temp} {"°C"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className={`card-icon ${getHumiBg()}`}>
//                         <IoWaterOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Humidity</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.humi} {"%"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgHumiRef} className={`bg-humi h-full leading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className={`card-icon ${getLightBg()}`}>
//                         <IoSunnyOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Brightness</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.light} {"Lux"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgLightRef} className="bg-light h-full leading-[1] transition-all"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//             {/* End Show Case 2 */}
            
//             {/* Show Case 2 Additional */}
//             <div className="flex justify-between mb-[30px]">
//                 <div className="card-v1">
//                     <div className={`card-icon ${getTempBg()}`}>
//                         <IoThermometerOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Temperature</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.temp} {"°C"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgTempRef} className={`bg-temp h-fullleading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card-v1">
//                     <div className={`card-icon ${getHumiBg()}`}>
//                         <IoWaterOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Humidity</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.humi} {"%"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgHumiRef} className={`bg-humi h-full leading-[1] transition-all`}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card-v1">
//                     <div className={`card-icon ${getLightBg()}`}>
//                         <IoSunnyOutline />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">Brightness</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.light} {"Lux"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgLightRef} className="bg-light h-full leading-[1] transition-all"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card-v1">
//                     <div className={`card-icon ${getSensorBg()}`}>
//                         <IoColorWand />
//                     </div>
//                     <div className="py-[10px] px-[20px] flex-1 font-poppin">
//                         <div className="card-title">New Sensor</div>
//                         <div className="flex items-center">
//                             <span className="w-[80px] text-center text-[18px] leading-[1]">{values.randomSensor} {"Unit"}</span>
//                             <div className="flex-1 ml-[15px] rounded-[30px] bg-gray-300 h-[15px] overflow-hidden">
//                                 <div ref={bgSensorRef} className="bg-sensor h-full leading-[1] transition-all"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* End Show Case 2 Additional*/}

//             <ToastContainer pauseOnFocusLoss={false} />
//         </>
//     )
// }
/* End Addition Sensor */

export default Elements;