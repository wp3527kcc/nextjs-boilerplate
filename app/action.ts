"use server"
import { neon } from "@neondatabase/serverless"; // Your database client
import { put } from "@vercel/blob";
import { Redis } from "@upstash/redis"

const sql = neon("" + process.env.DATABASE_URL);
const redis = new Redis({
    url: "https://brief-kid-53738.upstash.io",
    token: process.env.KV_REST_API_TOKEN,
})

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export async function fetchUsers(key: string) {
    const data = await sql("SELECT * FROM users") as { id: string, name: string, email: string }[];
    return [data, key]
}

export async function fetchComents() {
    const data = await sql("SELECT * FROM comments");
    return data as { comment: string }[]
}

export async function createComment(comment: string) {
    // Connect to the Neon database
    // Insert the comment from the form into the Postgres database
    const [, fileUrl] = await Promise.all([sql("INSERT INTO comments (comment) VALUES ($1)", [comment]), putFile(comment)]);
    return fileUrl
}

// export async function deleteComment(comment: string) {
// }

async function putFile(comment: string) {
    const { url } = await put("articles/blob.txt", comment, { access: "public" });
    return url
}

export async function syncRedis(key: string, isAdd = false) {
    return await redis[isAdd ? "incr" : "decr"](key)
}

export async function getRedisVal(key: string) {
    console.time("redis查询耗时")
    const result = await redis.get<number>(key)
    console.timeEnd("redis查询耗时")
    return +(result || 0)
}

export async function getUserList(pageNumber = 1, pageSize = 5) {
    const [listResult, countResult] = await Promise.all([
        sql(`SELECT *
             FROM users LIMIT ${pageSize}
             OFFSET ${pageSize * (pageNumber - 1)}`),
        sql("SELECT COUNT(*) as count FROM users"),
    ]);
    // 提取结果
    const list = listResult as { id: string, name: string, email: string }[];
    const [{ count }] = countResult;
    return { total: count, list };
}
