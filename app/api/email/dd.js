// let count = 0;
//
// async function logToFeiShu(
//     content,
//     webhookUrl = "https://open.feishu.cn/open-apis/bot/v2/hook/ad15802e-b359-451e-931e-78af5fc8c68d",
//     maxCount = 20
// ) {
//     console.log('count is=>',count)
//     // 限制一下发送次数，避免无限发送
//     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//     if (count++ < maxCount) {
//         console.time('t1')
//         const res = await fetch(webhookUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 card: {
//                     elements: [
//                         {
//                             tag: "div",
//                             text: {
//                                 tag: "lark_md",
//                                 content,
//                             },
//                         },
//                     ],
//                 },
//                 msg_type: "interactive",
//             }),
//         });
//         const data = await res.json();
//         console.timeEnd('t1')
//         console.log(data)
//     }
// }
// logToFeiShu('hello world')
const fs = require('fs');

async function start() {
    const file = fs.readFileSync('../../../public/icon.png',);
    console.log(file)
    const response = await fetch(
        `http://localhost:3000/api/upload?filename=kcc123.png`,
        {
            method: 'POST',
            body: file,
        },
    );
    const result = await response.json();
    console.log(result);
}

start()
