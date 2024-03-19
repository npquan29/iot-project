import { useEffect, useRef } from "react";
import { IoThermometerOutline, IoWaterOutline, IoSunnyOutline } from "react-icons/io5";

interface IValueProps {
    values: {
        temp: number,
        humi: number,
        light: number,
        time: string
    }
}

const Elements = ({ values }: IValueProps) => {
    const bgTempRef = useRef<HTMLDivElement>(null);
    const bgHumiRef = useRef<HTMLDivElement>(null);
    const bgLightRef = useRef<HTMLDivElement>(null);

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
    }, [values]);

    return (
        <>
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
        </>
    )
}

export default Elements;