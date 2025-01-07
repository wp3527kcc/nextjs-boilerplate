import Image from "next/image";
import {Table} from 'antd'
import Counter from './components/Count'
import {neon} from "@neondatabase/serverless";
import Link from "next/link";

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
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql('SELECT * FROM users') as { id: string, name: string, email: string }[];

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
            <Link href={'/demo'}>to demo</Link>
            <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Table
                    dataSource={data}
                    rowKey={'id'}
                    columns={tableColumns}
                    pagination={{pageSize: 5}}
                />
            </section>
        </div>
    );
}
