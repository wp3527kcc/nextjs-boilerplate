import Image from "next/image";
import {Pool} from 'pg'
import {Table} from 'antd'
import {config} from 'dotenv'
import Counter from './components/Count'

const configVal = config()
console.log('process.env.PGHOST_UNPOOLED', configVal, process.env.PGHOST_UNPOOLED)
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Optional: For development environments only
    },
});
const tableColumns = [
    {
        title: 'id',
        dataIndex: 'id',

    },
    {
        title: 'name',
        dataIndex: 'name',
    },
    {
        title: 'email',
        dataIndex: 'email',
    },
]
export default async function Home() {
    const {rows}: {
        rows: Array<{ id: string, name: string, email: string }>
    } = await pool.query('SELECT * FROM users');
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <Counter/>
            </main>
            <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Table
                    dataSource={rows}
                    rowKey={'id'}
                    columns={tableColumns}
                />
            </section>
        </div>
    );
}
