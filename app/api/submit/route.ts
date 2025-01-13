import {NextRequest, NextResponse} from 'next/server'
import {getUserList} from "@/app/action";

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming JSON body
        const body = await request.json()

        // Validate the request body
        if (!body.name) {
            return NextResponse.json(
                {error: 'Name is required1'},
                {status: 400}
            )
        }

        // Process the request
        return NextResponse.json(
            {message: 'Successfully processed POST request', data: body, list: await getUserList()},
            {status: 201}
        )
    } catch  {
        // Handle any errors
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        )
    }
}
