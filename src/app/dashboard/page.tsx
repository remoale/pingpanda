import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const auth = await currentUser()

    if (!auth) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: { externalId: auth.id},
    })

    return <p>Dashboard</p>
}

export default Page
