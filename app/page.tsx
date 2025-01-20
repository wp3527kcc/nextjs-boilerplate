import Image from "next/image";
import {Suspense} from 'react'
import {list} from '@vercel/blob';
import Counter from './components/Count'
import UploadArea from "@/app/components/UploadArea";
import UploadClient from "@/app/components/UploadClient";
import BlobList from "@/app/components/BlobList";
import Link from "next/link";
import {connection} from 'next/server'
import {getRedisVal, getUserList} from "@/app/action";
import {countRedisKey} from "@/app/constants";
import CommentList from "./components/CommentList";
import SignIn from "@/app/components/sign-in";
import {auth} from "@/auth";

export default async function Home() {
    console.log('rerender on Home');
    await connection()
    const session = await auth();
    const response = await list({
        prefix: '',
        // limit: Infinity
    });
    const posts = getRedisVal(countRedisKey)
    const postCommentList = getUserList(1)

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
                {/*<Image*/}
                {/*    className="dark:invert"*/}
                {/*    src='/output.png'*/}
                {/*    alt="Next.js logo"*/}
                {/*    width={180}*/}
                {/*    height={38}*/}
                {/*    priority*/}
                {/*/>*/}
                <SignIn session={session}/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Counter posts={posts}/>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <UploadArea/>
                </Suspense>
                <UploadClient/>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <CommentList postCommentList={postCommentList}/>
                {/* </Suspense> */}
            </main>
            <Link href={'/demo'}>to demo</Link>

            <UploadArea/>
            <BlobList blobs={response.blobs}/>
        </div>
    );
}
