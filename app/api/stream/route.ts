export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // always run dynamically

export async function GET() {
    // This encoder will stream your text
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        start(controller) {
            // Start encoding 'Basic Streaming Test',
            // and add the resulting stream to the queue
            controller.enqueue(encoder.encode('Basic Streaming Test'));
            setTimeout(() => {
                controller.enqueue(encoder.encode('\nbbcc'))
            }, 800)
            setTimeout(() => {
                controller.enqueue(encoder.encode('\nddee'));
                // Prevent anything else being added to the stream
                controller.close();
            }, 1800)
        },
    });

    return new Response(customReadable, {
        headers: {'Content-Type': 'text/html; charset=utf-8'},
    });
}
