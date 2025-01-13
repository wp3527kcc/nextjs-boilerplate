'use server'
import {neon} from "@neondatabase/serverless"; // Your database client
import {put} from "@vercel/blob";
import {
    // cookies,
    headers
} from 'next/headers'

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

export async function syncRedis(key: string, isAdd = false) {
    const resp = await fetch(`https://brief-kid-53738.upstash.io/${isAdd ? 'incr' : 'decr'}/${key}`, {
        headers: redisHeaders
    })
    const result = await resp.json();
    return result
}

export async function getRedisVal(key: string) {
    const acceptValue = (await headers()).get('accept')
    console.log('acceptValue', acceptValue)
    const res = await fetch(`https://brief-kid-53738.upstash.io/get/${key}`, {
        headers: redisHeaders,
        // cache: 'no-store',
        // next: { revalidate: 10 },
    })
    const {result} = await res.json()
    return +result
}

export async function getUserList() {
    const data = await sql('SELECT * FROM users') as { id: string, name: string, email: string }[];
    return data;
}
