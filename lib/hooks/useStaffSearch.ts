import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDebounce } from "./useDebounce"
import type { StaffSearchResponse } from "@/lib/schemas/staff"

async function fetchStaff(query: string, department: string, availability: string): Promise<StaffSearchResponse> {
    const params = new URLSearchParams()
    if (query) params.set("search", query)
    if (department) params.set("department", department)
    if (availability) params.set("availability", availability)

    const response = await fetch(`/api/staff?${params.toString()}`)

    if (!response.ok) {
        throw new Error("Failed to fetch staff members")
    }

    return response.json()
}

export function useStaffSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const [department, setDepartment] = useState("")
    const [availability, setAvailability] = useState("")
    const debouncedSearch = useDebounce(searchTerm, 300)

    const hasFilters = debouncedSearch.length > 0 || department.length > 0 || availability.length > 0

    const query = useQuery({
        queryKey: ["staff", debouncedSearch, department, availability],
        queryFn: () => fetchStaff(debouncedSearch,department,availability),
        enabled: hasFilters,
        placeholderData: (previousData) => previousData,
    })

    return {
        searchTerm,
        setSearchTerm,
        department,
        setDepartment,
        availability,
        setAvailability,
        results: query.data?.results ?? [],
        total: query.data?.total ?? 0,
        isLoading: query.isFetching,
        isError: query.isError,
        error: query.error,
    }
}