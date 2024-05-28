import Image from "next/image";
import LightOffImage from "../assets/images/light-off.png";
import LightOnImage from "../assets/images/light-on.png";
import DoorLockImage from "../assets/images/lock.png";
import DoorUnlockImage from "../assets/images/unlock.png";
import FanImage from "../assets/images/fan-1.png";
import { MouseEventHandler, useState } from "react";
import axios from "axios";

/* Show Case 1 */
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
/* End Show Case 1 */

// Addition Device
// const Devices = () => {
//     const [ledState, setLedState] = useState(false);
//     const [fanState, setFanState] = useState(false);
//     const [doorState, setDoorState] = useState(false);

//     const handleChangeDevice = async (device: string) => {
//         const body = {
//             device: '',
//             status: false
//         }
//         if(device === 'led') {
//             body.device = 'led';
//             body.status = !ledState;
//         }
//         else if(device === 'fan') {
//             body.device = 'fan';
//             body.status = !fanState;
//         }
//         else {
//             body.device = 'door';
//             body.status = !doorState;
//         }
        
//         const response = await axios.post('http://localhost:5000/api/action', body);
//         if(response.status === 201) {
//             const deviceResult = response.data.data.device;
//             const statusResult = response.data.data.status;

//             console.log(deviceResult, statusResult);

//             if(deviceResult === 'led') {
//                 if(statusResult === 'on') setLedState(true);
//                 else setLedState(false);
//             }
//             else if(deviceResult === 'fan') {
//                 if(statusResult === 'on') setFanState(true);
//                 else setFanState(false);
//             }
//             else {
//                 if(statusResult === 'on') setDoorState(true);
//                 else setDoorState(false);
//             }
//         }
//         else {
//             console.log('Server not response');
//         }
//     }

//     return (
//         <>
//             <div className="w-[13%] flex flex-col space-y-2 justify-between">
//                 <div className="bg-second pb-2 border border-third rounded-lg">
//                     <Image priority={true} src={ledState ? LightOnImage : LightOffImage} alt="LightImage" className="w-[50%] aspect-[1/1] mx-auto" />
//                     <button onClick={() => handleChangeDevice('led')} className={`btn-change ${ledState ? `bg-[#cc1c1c] hover:bg-[#ff2020]` : `bg-[#16c916] hover:bg-[#24fc24]`}`}>
//                         {ledState ? 'OFF' : 'ON'}
//                     </button>
//                 </div>
//                 <div className="bg-second pb-2 border border-third rounded-lg">
//                     <Image src={FanImage} alt="FanImage" className={`w-[50%] aspect-[1/1] mx-auto ${fanState ? 'animate-spin' : ''}`} />
//                     <button onClick={() => handleChangeDevice('fan')} className={`btn-change ${fanState ? `bg-[#cc1c1c] hover:bg-[#ff2020]` : `bg-[#16c916] hover:bg-[#24fc24]`}`}>
//                         {fanState ? 'OFF' : 'ON'}
//                     </button>
//                 </div>
//                 <div className="bg-second py-2 border border-third rounded-lg">
//                     <Image src={doorState ? DoorUnlockImage : DoorLockImage} alt="LightImage" className="w-[40%] aspect-[1/1] mx-auto" />
//                     <button onClick={() => handleChangeDevice('door')} className={`btn-change ${doorState ? `bg-[#cc1c1c] hover:bg-[#ff2020]` : `bg-[#16c916] hover:bg-[#24fc24]`}`}>
//                         {doorState ? 'OFF' : 'ON'}
//                     </button>
//                 </div>
                
//             </div>
//         </>
//     )
// }
// End Addition Device


export default Devices;