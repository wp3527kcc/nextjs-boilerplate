import {ImageResponse} from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const name = searchParams.get('name');
    const text = `👋 Hello ${name}`
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 40,
                    color: 'black',
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    padding: '50px 200px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 24
                }}
            >
                {text}
            </div>
        ),
        {
            width: 800,
            height: 630,
        },
    );
}
