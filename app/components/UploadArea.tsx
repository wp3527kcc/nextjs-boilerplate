"use client"
import React, {useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';
import type {GetProp, UploadFile, UploadProps} from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        // const formData = new FormData();
        // fileList.forEach((file) => {
        //     formData.append('files[]', file as FileType);
        // });
        const file = fileList[0] as FileType
        setUploading(true);
        // You can use any AJAX library you like
        fetch('/api/upload?filename=' + file.name, {
            method: 'POST',
            body: file,
            headers: new Headers({"content-type": file.type})
        })
            .then((res) => res.json())
            .then((v) => {
                console.log(v)
                setFileList([]);
                messageApi.success('upload successfully.');
            })
            .catch(() => {
                messageApi.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined/>}>Select File</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{marginTop: 16}}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </>
    );
};

export default App;
