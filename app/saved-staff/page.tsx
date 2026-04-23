import { SavedStaffClient } from "../../components/staff/SavedStaffClient"

export const metadata = {
    title: "On-Call List | ER CareView",
    description: "Your saved on-call staff members",
}

export default function SavedStaffPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
            <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1e2d40]">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <span className="text-white font-semibold text-sm">CareView</span>
                </div>
                <div className="flex items-center gap-8">
                    <a href="/staff" className="text-[#8892a4] text-sm hover:text-white cursor-pointer transition-colors">
                        Staff Directory
                    </a>
                    <a href="/saved-staff" className="text-blue-400 text-sm font-medium border-b border-blue-400 pb-0.5">
                        On-Call List
                    </a>
                </div>
            </nav>

            <div className="px-8 py-8 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">On-Call List</h1>
                    <p className="text-[#8892a4] text-sm mt-1">Your saved staff members for quick access</p>
                </div>
                <SavedStaffClient />
            </div>
        </main>
    )
}