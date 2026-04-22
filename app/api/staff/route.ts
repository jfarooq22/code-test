import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Availability } from "@prisma/client"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("search") ?? ""
    const department = searchParams.get("department") ?? ""
    const availability = searchParams.get("availability") ?? ""

    // Simulate network latency so loading states are visible
    await new Promise((resolve) => setTimeout(resolve, 300))

    const staff = await prisma.staff.findMany({
        where: {
            AND: [
                query.length > 0
                    ? {
                        OR: [
                            { firstName: { contains: query, mode: "insensitive" } },
                            { lastName: { contains: query, mode: "insensitive" } },
                            { role: { contains: query, mode: "insensitive" } },
                            { department: { contains: query, mode: "insensitive" } },
                        ],
                    }
                    : {},
                department.length > 0
                    ? { department: { equals: department, mode: "insensitive" } }
                    : {},
                availability.length > 0
                    ? { availability: { equals: availability as Availability } }
                    : {},
            ],
        },
        orderBy: { lastName: "asc" },
    })

    return NextResponse.json({
        results: staff,
        total: staff.length,
        query,
    })
}