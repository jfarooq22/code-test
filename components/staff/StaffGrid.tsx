"use client"

import { StaffCard } from "@/components/staff/StaffCard"
import { useSavedStaff } from "@/lib/hooks/useSavedStaff"
import type { StaffMember } from "@/lib/schemas/staff"

interface StaffGridProps {
    results: StaffMember[]
    total: number
    isLoading: boolean
    isError: boolean
    searchTerm: string
    department: string
    availability: string
}

function StaffCardSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="rounded-xl border border-[#1e2d40] p-5 flex flex-col gap-4 animate-pulse"
            style={{ backgroundColor: "#161b27" }}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#1e2d40]" />
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-[#1e2d40] rounded" />
                        <div className="h-3 w-24 bg-[#1e2d40] rounded" />
                    </div>
                </div>
                <div className="h-6 w-16 bg-[#1e2d40] rounded-full" />
            </div>
            <div className="h-3 w-28 bg-[#1e2d40] rounded" />
            <hr className="border-[#1e2d40]" />
            <div className="flex flex-col gap-2">
                <div className="h-3 w-48 bg-[#1e2d40] rounded" />
                <div className="h-3 w-36 bg-[#1e2d40] rounded" />
            </div>
            <div className="h-8 w-full bg-[#1e2d40] rounded-lg" />
        </div>
    )
}

export function StaffGrid({
    results,
    total,
    isLoading,
    isError,
    searchTerm,
    department,
    availability,
}: StaffGridProps) {
    const { savedIds, save, remove } = useSavedStaff()

    if (isLoading) {
        return (
            <section aria-label="Loading staff results">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <StaffCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        )
    }

    if (isError) {
        return (
            <section aria-label="Search error">
                <div role="alert" className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-medium text-white">Something went wrong</p>
                    <p className="text-sm text-[#8892a4] mt-1">Unable to fetch staff members. Please try again.</p>
                </div>
            </section>
        )
    }

    if (searchTerm.length === 0 && department.length === 0 && availability.length === 0) {
        return (
            <section aria-label="Staff search prompt">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-[#1e2d40]"
                        style={{ backgroundColor: "#161b27" }}
                    >
                        <svg aria-hidden="true" className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium text-white">Search for staff members</p>
                    <p className="text-sm text-[#8892a4] mt-1">Search by name, role or department</p>
                </div>
            </section>
        )
    }

    if (results.length === 0) {
        return (
            <section aria-label="No results found">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-medium text-white">No staff found</p>
                    <p className="text-sm text-[#8892a4] mt-1">Try a different search or filter</p>
                </div>
            </section>
        )
    }

    return (
        <section aria-label={`Search results for ${searchTerm}`}>
            <p className="text-sm text-[#8892a4] mb-4">
                Showing {total} {total === 1 ? "result" : "results"}
                {searchTerm && ` for "${searchTerm}"`}
            </p>
            <div id="search-results" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((member) => (
                    <StaffCard
                        key={member.id}
                        member={member}
                        isSaved={savedIds.has(member.id)}
                        onSave={save}
                        onRemove={remove}
                    />
                ))}
            </div>
        </section>
    )
}