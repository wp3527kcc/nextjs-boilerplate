import {NextResponse} from 'next/server'

let count = 0;

function logToFeiShu(
    content: string,
    webhookUrl = "https://open.feishu.cn/open-apis/bot/v2/hook/ad15802e-b359-451e-931e-78af5fc8c68d",
    maxCount = 20
) {
    // 限制一下发送次数，避免无限发送
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    count++ < maxCount &&
    fetch(webhookUrl, {
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
}

export async function POST() {
    const now = new Date();
    try {
        logToFeiShu('has request ' + now);
        // Process the request
        return NextResponse.json(
            {message: 'Successfully processed POST request', now},
            {status: 201}
        )
    } catch (e) {
        console.log(e)
        // Handle any errors
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        )
    }
}
