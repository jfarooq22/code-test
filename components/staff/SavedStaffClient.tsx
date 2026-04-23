"use client"

import { useSavedStaff } from "@/lib/hooks/useSavedStaff"
import { StaffCard } from "@/components/staff/StaffCard"

export function SavedStaffClient() {
    const { savedStaff, savedIds, save, remove, isLoading } = useSavedStaff()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (savedStaff.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-[#1e2d40]"
                    style={{ backgroundColor: "#161b27" }}
                >
                    <svg aria-hidden="true" className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <p className="text-lg font-medium text-white">No staff saved yet</p>
                <p className="text-sm text-[#8892a4] mt-1">
                    Go to the{" "}
                    <a href="/staff" className="text-blue-400 hover:underline">
                        Staff Directory
                    </a>{" "}
                    to save staff to your on-call list
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-[#8892a4]">
                {savedStaff.length} {savedStaff.length === 1 ? "staff member" : "staff members"} saved
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedStaff.map((member) => (
                    <StaffCard
                        key={member.id}
                        member={member}
                        isSaved={savedIds.has(member.id)}
                        onSave={save}
                        onRemove={remove}
                    />
                ))}
            </div>
        </div>
    )
}