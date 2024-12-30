"use client"

import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0)
    return (<div>
        <span>{count}</span>
        <br />
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
    </div>)
}

export default Counter
