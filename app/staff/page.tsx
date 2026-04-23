import { StaffDirectoryClient } from "./StaffDirectoryClient"
import { Nav } from "../../components/layout/Nav"

export const metadata = {
    title: "Staff Directory | ER CareView",
    description: "Search for emergency department staff members",
}

export default function StaffDirectoryPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
            {/* Nav */}
            <Nav />          

            {/* Content */}
            <div className="px-8 py-8 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Staff Directory</h1>
                    <p className="text-[#8892a4] text-sm mt-1">Search for staff by name, role or department</p>
                </div>
                <StaffDirectoryClient />
            </div>
        </main>
    )
}