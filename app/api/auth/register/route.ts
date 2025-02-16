import prismadb from "@/lib/prismadb";
import {hash} from "bcrypt";
import {NextRequest, NextResponse} from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email, name, password } = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({error: 'User already exists'}, {status: 422})
        }

        const hashedPassword = await hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Error registering user'}, {status: 500})
    }
}