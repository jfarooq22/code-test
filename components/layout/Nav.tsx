"use client"

import { usePathname } from "next/navigation"

const navLinks = [
    { label: "Staff Directory", href: "/staff" },
    { label: "On-Call List", href: "/saved-staff" },
]

export function Nav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1e2d40]">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-white font-semibold text-sm">CareView</span>
            </div>
            <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className={`text-sm transition-colors ${pathname === link.href
                            ? "text-blue-400 font-medium border-b border-blue-400 pb-0.5"
                            : "text-[#8892a4] hover:text-white"
                        }`}
                    >
                        {link.label}
                    </a>
        ))}
        </div>
    </nav >
  )
}