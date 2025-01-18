'use client'
import { FC } from "react"
import { List,Typography,Button } from "antd"
import {DeleteOutlined} from "@ant-design/icons";
import type {ListBlobResult} from "@vercel/blob"

const BlobList: FC<{ blobs: ListBlobResult['blobs'] }> = ({ blobs }) => {
    return <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={blobs}
        renderItem={(blob) =>
            <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text><a key={blob.url} href={blob.url} target="_blank">
                {blob.pathname}
                <Button onClick={()=>{console.log(blob.pathname)}} danger icon={<DeleteOutlined />} shape={'circle'} style={{marginLeft:'2em'}}/>
            </a>
            </List.Item>
        }
    />
}

export default BlobList;