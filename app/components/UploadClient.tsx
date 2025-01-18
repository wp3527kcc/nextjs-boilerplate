'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { Button, Progress } from 'antd';

export default function AvatarUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [percent, setPercent] = useState(0)
    const [loading, setLoading] = useState(false)
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    return (
        <>
            <h1>Upload Your Avatar</h1>

            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (!inputFileRef.current?.files) {
                        throw new Error('No file selected');
                    }

                    const file = inputFileRef.current.files[0];
                    setLoading(true)
                    try {
                        const newBlob = await upload('clientUpload/' + file.name, file, {
                            access: 'public',
                            handleUploadUrl: '/api/clientUpload',
                            onUploadProgress: (progressEvent) => {
                                setPercent(progressEvent.percentage)
                            }
                        });

                        setBlob(newBlob);
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                <input name="file" ref={inputFileRef} type="file" required />
                <Button htmlType="submit" loading={loading}>Upload</Button>
                {loading && <Progress percent={percent} />}
            </form>
            {blob && (
                <div>
                    Blob url: <a href={blob.url} target='__blank__'>{blob.url}</a>
                </div>
            )}
        </>
    );
}
