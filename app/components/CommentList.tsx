'use client'
import { Table } from "antd"
import { use, useState } from "react"
import { getUserList } from '../action'


function CommentList({ postCommentList }: { postCommentList: Promise<{ list: { id: string, name: string, email: string }[], total: number }> }) {
    const { list, total: initTotal } = use(postCommentList)
    const [listData, setListData] = useState(list)
    const [total, setTotal] = useState(initTotal)
    const [loading, setLoading] = useState(false)
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
    return <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Table
            dataSource={listData}
            rowKey={'id'}
            columns={tableColumns}
            loading={loading}
            onChange={({ current }) => {
                setLoading(true)
                getUserList(current as number).then(({ list, total }) => {
                    setListData(list)
                    setTotal(total)
                }).finally(() => {
                    setLoading(false)
                })
            }}
            pagination={{ pageSize: 5, total }}
        />
    </section>
}

export default CommentList