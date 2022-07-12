import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload, UploadProps } from "antd"
import { useAppDispatch } from "../../Redux/TodoHooks";
import { addItems } from "../../Redux/TodoSlice";
import { TodoItem } from "../../TodoItem"

export type ImportTodosProps = {
    setIsLoading: (isLoading: boolean) => void
}

export const ImportTodos = ({ setIsLoading }: ImportTodosProps) => {

    const dispatch = useAppDispatch();

    const handleChange: UploadProps['onChange'] = async info => {
        // Extract data only when upload is complete
        if (info.event?.percent !== 100) return

        setIsLoading(true)
        const text = await info.file.originFileObj?.text()

        const values = text?.split(',')

        const nextTodos: TodoItem[] = []

        if (values && values.length % 3 == 0) {
            // Ignore headers
            for (let i = 3; i < values.length; i += 3) {
                const dateMillis = Date.parse(values[i + 2])
                if (isNaN(dateMillis)) continue;
                nextTodos.push({
                    text: values[i],
                    isDone: values[i + 1] === "true",
                    createdMillis: dateMillis
                })
            }
        }
        if (nextTodos.length > 0) {
            dispatch(addItems(nextTodos))
        }
        setIsLoading(false)
    }

    return (
        <Upload
            onChange={handleChange}
            accept=".csv"
            showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined />} >
                Upload
            </Button>
        </Upload>
    )
}