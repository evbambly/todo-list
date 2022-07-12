import { Button, Input } from "antd"
import { useState } from "react"
import { useAppDispatch } from "../Redux/TodoHooks"
import { addItems } from "../Redux/TodoSlice"
import { getTodoItem, isValidItem } from "../TodoItem"

export const TodoInput = () => {
    const [text, setText] = useState("")

    const dispatch = useAppDispatch();

    const handleAddTodoItem = () => {
        if (isValidItem(text)) {
            const item = getTodoItem(text)
            dispatch(addItems([item]))
        }
        setText("")
    }

    return (
        <Input.Group compact>
            <Input placeholder="Text" value={text} style={{width:"75%"}} onChange={(e) => setText(e.target.value)} />
            <Button type="primary" onClick={handleAddTodoItem}>Todo</Button>
        </Input.Group>
    )
}