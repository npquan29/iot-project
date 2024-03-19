import Link from "next/link";

const NavBar = () => {
    return (
        <>
            <div className="p-5 bg-white shadow-one">
                <div className="flex justify-evenly font-poppin">
                    <div className="w-56">
                        <Link href="/" className="w-full leading-[1.15] py-[15px] uppercase inline-block border border-main rounded-lg text-main bg-second tracking-[0.25px] transition-all text-center hover:text-second hover:bg-main">Dashboard</Link>
                    </div>
                    <div className="w-56">
                        <Link href="/datasensor" className="w-full leading-[1.15] py-[15px] uppercase inline-block border border-main rounded-lg text-main bg-second tracking-[0.25px] transition-all text-center hover:text-second hover:bg-main">Data sensor</Link>
                    </div>
                    <div className="w-56">
                        <Link href="/actionhistory" className="w-full leading-[1.15] py-[15px] uppercase inline-block border border-main rounded-lg text-main bg-second tracking-[0.25px] transition-all text-center hover:text-second hover:bg-main">Action History</Link>
                    </div>
                    <div className="w-56">
                        <Link href="/profile" className="w-full leading-[1.15] py-[15px] uppercase inline-block border border-main rounded-lg text-main bg-second tracking-[0.25px] transition-all text-center hover:text-second hover:bg-main">Profile</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;