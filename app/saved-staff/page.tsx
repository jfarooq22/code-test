import { SavedStaffClient } from "../../components/staff/SavedStaffClient"
import { Nav } from "../../components/layout/Nav"

export const metadata = {
    title: "On-Call List | ER CareView",
    description: "Your saved on-call staff members",
}

export default function SavedStaffPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
            <Nav />
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