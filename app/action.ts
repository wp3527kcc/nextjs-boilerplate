'use server'
import {neon} from "@neondatabase/serverless"; // Your database client
import {put} from "@vercel/blob";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function fetchUsers(key: string) {
    const data = await sql('SELECT * FROM users') as { id: string, name: string, email: string }[];
    return [data, key]
}

export async function fetchComents() {
    const data = await sql('SELECT * FROM comments');
    return data as { comment: string }[]
}

export async function createComment(comment: string) {
    // Connect to the Neon database
    // Insert the comment from the form into the Postgres database
    const [, fileUrl] = await Promise.all([sql('INSERT INTO comments (comment) VALUES ($1)', [comment]), putFile(comment)]);
    return fileUrl
}

// export async function deleteComment(comment: string) {
// }

export async function putFile(comment: string) {
    const {url} = await put('articles/blob.txt', comment, {access: 'public'});
    return url
}

const redisHeaders = new Headers({
    Authorization: 'Bearer AdHqAAIjcDE2ZjRkZGFmYzUyODA0YjQ2YTBkOTM4Y2U3Y2E5M2I1NXAxMA'
})

export async function syncRedis(key: string, value: number) {
    await fetch(`https://brief-kid-53738.upstash.io/set/${key}/${value}`, {
        headers: redisHeaders
    })
}

export async function getRedisVal(key: string) {
    const res = await fetch(`https://brief-kid-53738.upstash.io/get/${key}`, {
        headers: redisHeaders,
        cache: 'no-store'
    })
    const {result} = await res.json()
    return +result
}
