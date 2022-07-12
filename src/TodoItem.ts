export type TodoItem = {
    text: string
    createdMillis: number
    isDone: boolean
}

export const isValidItem = (text: string) => !!text

export const getTodoItem = (text: string): TodoItem => {
    return {
        text: text,
        createdMillis: new Date().getTime(),
        isDone: false
    }
}