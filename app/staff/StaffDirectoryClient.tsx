"use client"

import { SearchInput } from "@/components/staff/SearchInput"
import { StaffGrid } from "@/components/staff/StaffGrid"
import { useStaffSearch } from "@/lib/hooks/useStaffSearch"

const DEPARTMENTS = [
    "Cardiology",
    "Dermatology",
    "Emergency",
    "Endocrinology",
    "Gastroenterology",
    "Intensive Care",
    "Maternity",
    "Mental Health",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "Rehabilitation",
    "Respiratory",
    "Surgery",
]

const AVAILABILITY_OPTIONS = [
    { value: "available", label: "Available" },
    { value: "busy", label: "Busy" },
    { value: "off_duty", label: "Off Duty" },
]

export function StaffDirectoryClient() {
    const {
        searchTerm,
        setSearchTerm,
        department,
        setDepartment,
        availability,
        setAvailability,
        results,
        total,
        isLoading,
        isError,
    } = useStaffSearch()

    return (
        <div className="flex flex-col gap-6">
            <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                isLoading={isLoading}
                resultCount={total}
            />

            {/* Filters */}
            <div className="flex gap-4">
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    aria-label="Filter by department"
                    className="px-4 py-2 rounded-lg border border-[#1e2d40] text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: "#161b27" }}
                >
                    <option value="">All Departments</option>
                    {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>

                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    aria-label="Filter by availability"
                    className="px-4 py-2 rounded-lg border border-[#1e2d40] text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: "#161b27" }}
                >
                    <option value="">All Availability</option>
                    {AVAILABILITY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <StaffGrid
                results={results}
                total={total}
                isLoading={isLoading}
                isError={isError}
                searchTerm={searchTerm}
                department={department}
                availability={availability}
            />
        </div>
    )
}