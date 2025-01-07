"use client"

import {CSSProperties, useState} from "react";

const btnStyle:CSSProperties = {
    border : "1px solid #fa541c",
    color : "#fa541c",
    padding : "4px 12px",
    borderRadius: 4,
    marginRight: 12
}
function Counter() {
    const [count, setCount] = useState(0)
    return (<div>
        <button onClick={() => setCount(count + 1)} style={btnStyle}>+</button>
        <button onClick={() => setCount(count - 1)} style={btnStyle}>-</button>
        <span>{count}</span>
    </div>)
}

export default Counter
