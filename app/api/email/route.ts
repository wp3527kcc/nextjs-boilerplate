import { NextResponse } from 'next/server'

async function logToFeiShu(
    content: string,
    webhookUrl = "https://open.feishu.cn/open-apis/bot/v2/hook/ad15802e-b359-451e-931e-78af5fc8c68d",
) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    console.time('logTime')
    const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            card: {
                elements: [
                    {
                        tag: "div",
                        text: {
                            tag: "lark_md",
                            content,
                        },
                    },
                ],
            },
            msg_type: "interactive",
        }),
    });
    const data = await res.json();
    console.timeEnd('logTime')
    return data
}

export async function GET() {
    const now = new Date();
    try {
        const response = await logToFeiShu('has request ' + now);
        // Process the request
        return NextResponse.json(
            { message: 'Successfully processed POST request', now, response },
            { status: 201 }
        )
    } catch (e) {
        console.log(e)
        // Handle any errors
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
