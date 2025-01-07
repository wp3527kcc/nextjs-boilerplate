"use client"

import {CSSProperties, useState, useEffect} from "react";
import {Button, Space, Table, Input, message} from "antd";
import {createComment, fetchComents, syncRedis} from '../action'
import {countRedisKey} from "@/app/constants";

const btnStyle: CSSProperties = {
    border: "1px solid #fa541c",
    color: "#fa541c",
    padding: "4px 12px",
    borderRadius: 4,
}

function Counter({initialCount}: {initialCount: number}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [count, setCount] = useState(initialCount)
    const [commentLoading, setCommentLoading] = useState<boolean>(false)
    const [syncLoading, setSyncLoading] = useState<boolean>(false)
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

    async function setCountAndSync(newCount: number) {
        setSyncLoading(true)
        syncRedis(countRedisKey, newCount).then(() => {
        }).finally(() => {
            setSyncLoading(false)
            setCount(newCount)
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
                        setCountAndSync(count + 1)
                    }} style={btnStyle}>+
                </Button>
                <Button
                    type={'dashed'}
                    loading={syncLoading}
                    onClick={() => {
                        setCountAndSync(count - 1)
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
