import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/saved-staff — fetch the saved list
export async function GET() {
    const savedStaff = await prisma.savedStaff.findMany({
        include: {
            staff: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return NextResponse.json({
        results: savedStaff.map((entry) => entry.staff),
        total: savedStaff.length,
    })
}

// POST /api/saved-staff — save a staff member
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { staffId } = body

    if (!staffId) {
        return NextResponse.json(
            { error: "staffId is required" },
            { status: 400 }
        )
    }

    // Check staff member exists
    const staffMember = await prisma.staff.findUnique({
        where: { id: staffId },
    })

    if (!staffMember) {
        return NextResponse.json(
            { error: "Staff member not found" },
            { status: 404 }
        )
    }

    // Check for duplicate
    const existing = await prisma.savedStaff.findUnique({
        where: { staffId },
    })

    if (existing) {
        return NextResponse.json(
            { error: "Staff member already saved" },
            { status: 409 }
        )
    }

    const saved = await prisma.savedStaff.create({
        data: { staffId },
        include: { staff: true },
    })

    return NextResponse.json(saved, { status: 201 })
}