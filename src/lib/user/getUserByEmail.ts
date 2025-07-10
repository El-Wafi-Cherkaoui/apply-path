import { prisma } from "../prisma";

export async function getUserByEmail(email : string) {
    return await prisma.user.findUnique({
        where : {email}
    })
}