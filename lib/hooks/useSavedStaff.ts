import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { SavedStaffResponse } from "@/lib/schemas/staff"

async function fetchSavedStaff(): Promise<SavedStaffResponse> {
    const response = await fetch("/api/saved-staff")
    if (!response.ok) throw new Error("Failed to fetch saved staff")
    return response.json()
}

async function saveStaffMember(staffId: string): Promise<void> {
    const response = await fetch("/api/saved-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId }),
    })
    if (!response.ok && response.status !== 409) {
        throw new Error("Failed to save staff member")
    }
}

async function removeSavedStaffMember(staffId: string): Promise<void> {
    const response = await fetch(`/api/saved-staff/${staffId}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to remove staff member")
}

export function useSavedStaff() {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ["saved-staff"],
        queryFn: fetchSavedStaff,
    })

    const savedIds = new Set(query.data?.results.map((s) => s.id) ?? [])

    const saveMutation = useMutation({
        mutationFn: saveStaffMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-staff"] })
        },
    })

    const removeMutation = useMutation({
        mutationFn: removeSavedStaffMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved-staff"] })
        },
    })

    return {
        savedStaff: query.data?.results ?? [],
        savedIds,
        isLoading: query.isLoading,
        isSaving: saveMutation.isPending,
        isRemoving: removeMutation.isPending,
        save: saveMutation.mutate,
        remove: removeMutation.mutate,
    }
}