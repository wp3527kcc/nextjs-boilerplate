'use server'
import {neon} from "@neondatabase/serverless"; // Your database client

const sql = neon(`${process.env.DATABASE_URL}`);

export async function fetchUsers(key: string) {
    const data = await sql('SELECT * FROM users') as { id: string, name: string, email: string }[];
    return [data, key]
}

export async function fetchComents() {
    const data = await sql('SELECT * FROM comments') ;
    return data as { comment: string }[]
}

export async function createComment(comment: string) {
    // Connect to the Neon database
    // Insert the comment from the form into the Postgres database
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
}
