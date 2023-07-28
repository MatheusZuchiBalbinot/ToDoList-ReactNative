import { useContext } from "react";
import { ToDoContext } from '../ToDoContext'

export default function useToDoContext() {

    const context = useContext(ToDoContext)

    if (context === undefined) {
        throw new Error('Não está dentro do contexto')
    }

    return context
}