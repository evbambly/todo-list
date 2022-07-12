import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isValidItem as isValidText, TodoItem } from '../TodoItem';

export interface TodoListState {
    items: TodoItem[],
    newestFirst: boolean
}

const initialState: TodoListState = {
    items: [],
    newestFirst: true
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItems: (state, { payload }: PayloadAction<TodoItem[]>) => {
            state.items = [...state.items, ...payload].sort(sortFn(state.newestFirst))
        },
        checkTodoItem: (state, { payload }: PayloadAction<{ index: number, nextIsDone: boolean }>) => {
            const { index, nextIsDone } = payload
            if (state.items.length > index) {
                state.items = updateItem(state.items, index, { isDone: nextIsDone })
            }
        },
        editText: (state, { payload }: PayloadAction<{ index: number, nextText: string }>) => {
            const { index, nextText } = payload
            if (isValidText(nextText)) {
                state.items = updateItem(state.items, index, { text: nextText })
            }
        },
        removeItemAtIndex: (state, { payload }: PayloadAction<number>) => {
            if (state.items.length > payload) {
                state.items = [...state.items.slice(0, payload), ...state.items.slice(payload + 1)]
            }
        },
        sortByDescMillis: (state, {payload}: PayloadAction<boolean>) => {
            state.newestFirst = payload
            state.items = state.items.sort(sortFn(state.newestFirst))
        }
    },
});

const sortFn = (newestFirst: boolean) => (a : TodoItem,b: TodoItem) => newestFirst ? b.createdMillis - a.createdMillis : a.createdMillis - b.createdMillis

const updateItem = (list: TodoItem[], index: number, amendProps: Partial<TodoItem>) => {
    const item: TodoItem = { ...list[index], ...amendProps }
    return [...list.slice(0, index), item, ...list.slice(index + 1)]
}

export const { addItems, checkTodoItem, editText, removeItemAtIndex, sortByDescMillis } = todoSlice.actions;


export default todoSlice.reducer;
