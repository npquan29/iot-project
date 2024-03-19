'use client'

import NavBar from "@/components/NavBar"
import Image from "next/image";
import StudentCard from "../../assets/images/sv.jpg";
import { useEffect, useState } from "react";

const Profile = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    }, [])

    return (
        <>
            <NavBar />

            {loading && (
                <div className="py-[30px] px-[60px]">
                    <div className="w-[80%] mx-auto">
                        <Image src={StudentCard} alt="SV" className="mx-auto max-w-[50%] rounded-lg" />
                        <h1 className="block mt-4 text-center text-[24px] font-poppin">Nguyen Phu Quan - B20DCPT161</h1>
                        <p className="block mt-2 text-center text-[24px] font-poppin">D20PTDPT</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile;