import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../Redux/TodoHooks";
import { sortByDescMillis } from "../../Redux/TodoSlice"

export const SortList = () => {
    const newestFirst = useAppSelector(state => state.todo.newestFirst);
    const dispatch = useAppDispatch();

    return (
        <Button
            style={{ color: "#f0f2f5", verticalAlign: "super" }}
            type="text"
            icon={newestFirst ? <DownOutlined /> : <UpOutlined />}
            onClick={() => dispatch(sortByDescMillis(!newestFirst))} />
    )
}