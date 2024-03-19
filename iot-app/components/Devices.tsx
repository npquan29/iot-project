import Image from "next/image";
import LightOffImage from "../assets/images/light-off.png";
import LightOnImage from "../assets/images/light-on.png";
import FanImage from "../assets/images/fan-1.png";
import { MouseEventHandler, useState } from "react";
import axios from "axios";

const Devices = () => {
    const [ledState, setLedState] = useState(false);
    const [fanState, setFanState] = useState(false);

    const handleChangeDevice = async (device: string) => {
        const body = {
            device: '',
            status: false
        }
        if(device === 'led') {
            body.device = 'led';
            body.status = !ledState;
        }
        else {
            body.device = 'fan';
            body.status = !fanState;
        }
        
        const response = await axios.post('http://localhost:5000/api/action', body);
        if(response.status === 201) {
            const deviceResult = response.data.data.device;
            const statusResult = response.data.data.status;

            if(deviceResult === 'led') {
                if(statusResult === 'on') setLedState(true);
                else setLedState(false);
            }
            else {
                if(statusResult === 'on') setFanState(true);
                else setFanState(false);
            }
        }
        else {
            console.log('Server not response');
        }
    }

    return (
        <>
            <div className="w-[18%] flex flex-col justify-between">
                <div className="bg-second p-[15px] border border-third rounded-lg">
                    <Image src={ledState ? LightOnImage : LightOffImage} alt="LightImage" className="w-[60%] aspect-[1/1] mx-auto" />
                    <button onClick={() => handleChangeDevice('led')} className={`btn-change ${ledState ? `bg-[#cc1c1c] hover:bg-[#ff2020]` : `bg-[#16c916] hover:bg-[#24fc24]`}`}>
                        {ledState ? 'OFF' : 'ON'}
                    </button>
                </div>
                <div className="bg-second p-[15px] border border-third rounded-lg">
                    <Image src={FanImage} alt="FanImage" className={`w-[60%] aspect-[1/1] mx-auto ${fanState ? 'animate-spin' : ''}`} />
                    <button onClick={() => handleChangeDevice('fan')} className={`btn-change ${fanState ? `bg-[#cc1c1c] hover:bg-[#ff2020]` : `bg-[#16c916] hover:bg-[#24fc24]`}`}>
                        {fanState ? 'OFF' : 'ON'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Devices;