import { DeleteFilled } from "@ant-design/icons";
import { Button, Checkbox, List, Tooltip, Typography } from "antd"
import Paragraph from "antd/lib/typography/Paragraph";
import { useAppDispatch, useAppSelector } from "../Redux/TodoHooks"
import { checkTodoItem, editText, removeItemAtIndex } from "../Redux/TodoSlice";


export const TodoList = () => {

    const todoList = useAppSelector(state => state.todo.items);
    const dispatch = useAppDispatch();

    const getTimeAndDate = (timeInMillis: number) => {
        const date = new Date(timeInMillis)
        const formattedTime = `${date.getHours()}:${Math.floor(date.getMinutes() / 10)}0`
        const formattedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear() % 100}`
        return formattedTime + " " + formattedDate
    }

    return (
        <>
            <List
                style={{ textAlign: "initial" }}
                locale={{ emptyText: "Start Creating!" }}
                bordered
                size="large"
                itemLayout="horizontal"
                dataSource={todoList}
                renderItem={(item, index) => (
                    <List.Item
                        style={{ listStyleType: "none", width: "100%", padding: "14px" }}>
                        <Checkbox
                            style={{ flexBasis: "12%", marginBottom: "1em" }}
                            checked={item.isDone}
                            onChange={() => dispatch(checkTodoItem({ index, nextIsDone: !item.isDone }))} />
                        <Paragraph
                            editable={{ onChange: (nextText) => dispatch(editText({ index, nextText })) }}
                            style={{ flexBasis: "70%", overflowWrap: "anywhere" }}>
                            {item.text}
                        </Paragraph>
                        <Tooltip title="discard">
                            <Button
                                style={{ marginBottom: "1em" }}
                                size="small"
                                type="primary"
                                shape="circle"
                                icon={<DeleteFilled />}
                                onClick={() => dispatch(removeItemAtIndex(index))}
                            />
                        </Tooltip>
                        <br />
                        <Typography.Text code>
                            {getTimeAndDate(item.createdMillis)}
                        </Typography.Text>
                    </List.Item>)}>
            </ List>
   
        </>
    )
}