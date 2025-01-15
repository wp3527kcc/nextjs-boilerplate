import Image from "next/image";
import {Table} from 'antd'
import {Suspense} from 'react'
import Counter from './components/Count'
import Link from "next/link";
import {connection} from 'next/server'
import {getRedisVal, getUserList} from "@/app/action";
import {countRedisKey} from "@/app/constants";

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
    console.log('rerender', new Date());
    await connection()
    const posts = getRedisVal(countRedisKey)
    const data = await getUserList()

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
                <Image
                    className="dark:invert"
                    src='/output.png'
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <Suspense fallback={<div>Loading...</div>}>
                    <Counter posts={posts}/>
                </Suspense>
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
