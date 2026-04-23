import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const existing = await prisma.savedStaff.findUnique({
        where: { staffId: id },
    })

    if (!existing) {
        return NextResponse.json(
            { error: "Saved staff member not found" },
            { status: 404 }
        )
    }

    await prisma.savedStaff.delete({
        where: { staffId: id },
    })

    return new NextResponse(null, { status: 204 })
}