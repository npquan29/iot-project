"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const pathname = usePathname();

    const listLink = [
        { href: "/", title: "Dashboard"},
        { href: "/datasensor", title: "Data sensor"},
        { href: "/actionhistory", title: "Action History"},
        { href: "/profile", title: "Profile"},
    ];

    return (
        <>
            <div className="p-5 bg-white shadow-one">
                <div className="flex justify-evenly font-poppin">
                    {listLink.map((item, index) => (
                        <div key={index} className="w-56">
                            <Link href={item.href} className={`nav-link ${pathname === item.href ? 'active' : ''}`}>{item.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NavBar;