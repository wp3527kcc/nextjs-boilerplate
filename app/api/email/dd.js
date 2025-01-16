let count = 0;

function logToFeiShu(
    content,
    webhookUrl = "https://open.feishu.cn/open-apis/bot/v2/hook/ad15802e-b359-451e-931e-78af5fc8c68d",
    maxCount = 20
) {
    console.log('count is=>',count)
    // 限制一下发送次数，避免无限发送
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (count++ < maxCount) {
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
}

logToFeiShu('hello world')
