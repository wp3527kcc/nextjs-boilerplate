"use client"

import {CSSProperties, useState, useEffect} from "react";
import {Button, Space, Table, Input, message} from "antd";
import {createComment, fetchComents} from '../action'

const btnStyle: CSSProperties = {
    border: "1px solid #fa541c",
    color: "#fa541c",
    padding: "4px 12px",
    borderRadius: 4,
}

function Counter() {
    const [messageApi, contextHolder] = message.useMessage();
    const [count, setCount] = useState(0)
    const [commentLoading, setCommentLoading] = useState<boolean>(false)
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

    useEffect(() => {
        getCommentList()
    }, []);

    return (
        <section>
            {contextHolder}
            <Space>
                <button onClick={() => setCount(count + 1)} style={btnStyle}>+</button>
                <button onClick={() => setCount(count - 1)} style={btnStyle}>-</button>
                <span>{count}</span>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => createComment(inputValue).then(() => {
                    setInputValue('')
                    getCommentList()
                    messageApi.success('添加成功')
                })}>
                    append comment
                </Button>
                <Button onClick={() => {
                    getCommentList()
                }}>
                    拉取列表
                </Button>
            </Space>
            <Table dataSource={commentList} columns={[{key: 'comment', dataIndex: 'comment', title: '评论内容'}]}
                   loading={commentLoading}
                   pagination={{pageSize: 5}}/>
        </section>
    )
}

export default Counter
