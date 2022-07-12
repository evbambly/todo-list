import { DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useAppSelector } from "../../Redux/TodoHooks";


export const ExportTodos = () => {

    const todoList = useAppSelector(state => state.todo.items);

    const getCsvData = () => {
        return todoList.reduce((rows, todoItem) => {
            const { text, isDone, createdMillis } = todoItem
            const dateString = new Date(createdMillis)
            rows.push([text, isDone, dateString].join(','))
            return rows
        }, ['Text,Done,CreatedDate'])
    }

    const downloadFile = (data: any) => {
        const blob = new Blob([data], { type: "text/csv" })
        const a = document.createElement('a')
        a.download = "todo-list"
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    return (
        <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => downloadFile(getCsvData())} >
            Download
        </Button>
    )
}