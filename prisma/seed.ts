import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("Seeding database...")

    await prisma.savedStaff.deleteMany()
    await prisma.staff.deleteMany()

    await prisma.staff.createMany({
        data: [
            {
                firstName: "Sarah",
                lastName: "Mitchell",
                role: "Emergency Physician",
                department: "Emergency",
                email: "s.mitchell@ercareview.com",
                phone: "03 9000 0001",
                availability: "available",
            },
            {
                firstName: "James",
                lastName: "Nguyen",
                role: "Triage Nurse",
                department: "Emergency",
                email: "j.nguyen@ercareview.com",
                phone: "03 9000 0002",
                availability: "busy",
            },
            {
                firstName: "Priya",
                lastName: "Sharma",
                role: "Radiologist",
                department: "Radiology",
                email: "p.sharma@ercareview.com",
                phone: "03 9000 0003",
                availability: "available",
            },
            {
                firstName: "Tom",
                lastName: "Bradley",
                role: "Surgical Registrar",
                department: "Surgery",
                email: "t.bradley@ercareview.com",
                phone: "03 9000 0004",
                availability: "off_duty",
            },
            {
                firstName: "Aisha",
                lastName: "Rahman",
                role: "ICU Nurse",
                department: "Intensive Care",
                email: "a.rahman@ercareview.com",
                phone: "03 9000 0005",
                availability: "available",
            },
            {
                firstName: "David",
                lastName: "Park",
                role: "Cardiologist",
                department: "Cardiology",
                email: "d.park@ercareview.com",
                phone: "03 9000 0006",
                availability: "busy",
            },
            {
                firstName: "Emma",
                lastName: "Wilson",
                role: "Pediatric Nurse",
                department: "Pediatrics",
                email: "e.wilson@ercareview.com",
                phone: "03 9000 0007",
                availability: "available",
            },
            {
                firstName: "Marcus",
                lastName: "Thompson",
                role: "Anesthesiologist",
                department: "Surgery",
                email: "m.thompson@ercareview.com",
                phone: "03 9000 0008",
                availability: "off_duty",
            },
            {
                firstName: "Rachel",
                lastName: "Chen",
                role: "Senior Nurse",
                department: "Emergency",
                email: "r.chen@ercareview.com",
                phone: "03 9000 0009",
                availability: "available",
            },
            {
                firstName: "Omar",
                lastName: "Hassan",
                role: "General Surgeon",
                department: "Surgery",
                email: "o.hassan@ercareview.com",
                phone: "03 9000 0010",
                availability: "busy",
            },
            {
                firstName: "Lisa",
                lastName: "Patel",
                role: "Neurologist",
                department: "Neurology",
                email: "l.patel@ercareview.com",
                phone: "03 9000 0011",
                availability: "available",
            },
            {
                firstName: "Kevin",
                lastName: "O'Brien",
                role: "Physiotherapist",
                department: "Rehabilitation",
                email: "k.obrien@ercareview.com",
                phone: "03 9000 0012",
                availability: "available",
            },
            {
                firstName: "Natalie",
                lastName: "Brooks",
                role: "Oncologist",
                department: "Oncology",
                email: "n.brooks@ercareview.com",
                phone: "03 9000 0013",
                availability: "off_duty",
            },
            {
                firstName: "Ahmed",
                lastName: "Al-Rashid",
                role: "Psychiatrist",
                department: "Mental Health",
                email: "a.alrashid@ercareview.com",
                phone: "03 9000 0014",
                availability: "available",
            },
            {
                firstName: "Sophie",
                lastName: "Laurent",
                role: "Dermatologist",
                department: "Dermatology",
                email: "s.laurent@ercareview.com",
                phone: "03 9000 0015",
                availability: "busy",
            },
            {
                firstName: "Michael",
                lastName: "Torres",
                role: "Gastroenterologist",
                department: "Gastroenterology",
                email: "m.torres@ercareview.com",
                phone: "03 9000 0016",
                availability: "available",
            },
            {
                firstName: "Grace",
                lastName: "Kim",
                role: "Endocrinologist",
                department: "Endocrinology",
                email: "g.kim@ercareview.com",
                phone: "03 9000 0017",
                availability: "available",
            },
            {
                firstName: "Daniel",
                lastName: "Walsh",
                role: "Respiratory Therapist",
                department: "Respiratory",
                email: "d.walsh@ercareview.com",
                phone: "03 9000 0018",
                availability: "off_duty",
            },
            {
                firstName: "Fatima",
                lastName: "Al-Zahra",
                role: "Obstetrician",
                department: "Maternity",
                email: "f.alzahra@ercareview.com",
                phone: "03 9000 0019",
                availability: "busy",
            },
            {
                firstName: "Ryan",
                lastName: "MacDonald",
                role: "Orthopedic Surgeon",
                department: "Orthopedics",
                email: "r.macdonald@ercareview.com",
                phone: "03 9000 0020",
                availability: "available",
            },
        ],
    })

    console.log("Seeding complete.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })