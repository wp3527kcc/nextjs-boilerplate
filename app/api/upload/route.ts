import {NextResponse} from 'next/server'
import {put} from '@vercel/blob';
import {neon} from "@neondatabase/serverless"; // Your database client

const prefix = 'avatar/';
const sql = neon(`${process.env.DATABASE_URL}`);
export async function POST(request: Request): Promise<NextResponse> {
    const {searchParams} = new URL(request.url);
    const filename = searchParams.get('filename');

    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(prefix + filename || 'hhh', request.body!, {
        access: 'public',
    });
    await sql(`insert into avatarlist("previewUrl", "downloadUrl", "filename") values('${blob.url}', '${blob.downloadUrl}', '${filename}')`);
    return NextResponse.json(blob, {status: 200});
}
