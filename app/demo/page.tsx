import {neon} from '@neondatabase/serverless';

export default function Page() {
    async function create(formData: FormData) {
        'use server';
        // Connect to the Neon database
        const sql = neon(`${Deno.env.get("DATABASE_URL")}`);
        const comment = formData.get('comment');
        // Insert the comment from the form into the Postgres database
        await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
        console.log(comment);
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 400
        }}>
            <form action={create}>
                <input type="text" placeholder="write a comment" name="comment"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
