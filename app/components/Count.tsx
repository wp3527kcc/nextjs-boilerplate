"use client"

import {CSSProperties, useState, useEffect, use} from "react";
import {Button, Space, Table, Input, message} from "antd";
import {createComment, fetchComents, syncRedis} from '../action'
import {countRedisKey} from "@/app/constants";

const btnStyle: CSSProperties = {
    border: "1px solid #fa541c",
    color: "#fa541c",
    padding: "4px 12px",
    borderRadius: 4,
}

function Counter({posts}: { posts: Promise<number> }) {
    const [messageApi, contextHolder] = message.useMessage();
    const initialCount = use(posts)
    const [count, setCount] = useState(initialCount)
    const [commentLoading, setCommentLoading] = useState(false)
    const [syncLoading, setSyncLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [commentList, setCommentList] = useState<{ comment: string }[]>([])

    function getCommentList() {
        setCommentLoading(true)
        console.time('t1')
        fetchComents().then(result => {
            setCommentList(result)
            console.timeEnd('t1')
        }).finally(() => {
            setCommentLoading(false)
        })
    }

    async function setCountAndSync(isAdd: boolean) {
        setSyncLoading(true)
        syncRedis(countRedisKey, isAdd).then((newResp) => {
            setCount(newResp.result)
        }).finally(() => {
            setSyncLoading(false)
        })
    }

    useEffect(() => {
        getCommentList()
    }, []);

    return (
        <section>
            {contextHolder}
            <Space>
                <Button
                    loading={syncLoading}
                    onClick={() => {
                        setCountAndSync(true)
                    }} style={btnStyle}>+
                </Button>
                <Button
                    type={'dashed'}
                    loading={syncLoading}
                    onClick={() => {
                        setCountAndSync(false)
                    }} style={btnStyle}>-
                </Button>
                <span>{count}</span>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => createComment(inputValue).then((fileUrl) => {
                    setInputValue('')
                    getCommentList()
                    messageApi.success('添加成功')
                    setTimeout(() => {
                        window.open(fileUrl)
                    }, 800)
                })}>
                    append comment
                </Button>
                <Button onClick={() => {
                    getCommentList()
                }}>
                    拉取列表
                </Button>
                <Button onClick={() => {
                    fetch('/api/submit', {
                        method: 'POST',
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify({name: inputValue, email: '777888@qq.com'}),
                    }).then(res => res.json()).then(res => console.log(res))
                }}>
                    POST
                </Button>
            </Space>
            <Table dataSource={commentList.filter(Boolean)}
                   columns={[{key: 'comment', dataIndex: 'comment', title: '评论内容'}]}
                   loading={commentLoading}
                   pagination={{pageSize: 5}}
                   style={{marginTop: 20}}
            />
        </section>
    )
}

export default Counter
