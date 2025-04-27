import { useEffect, useReducer } from "react";
import { ACTIONS } from "../constant/ACTIONS.js";
import { useApi } from "./useApi.js";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.READ:
            return action.payload;
        case ACTIONS.CREATE:
            return [...state, action.payload];
        case ACTIONS.DELETE:
            return state.filter((item) => item._id !== action.payload.id);
        case ACTIONS.UPDATE:
            if (!action.payload || !action.payload._id) return state; // Ensure _id exists for update
            return state.map((item) =>
                item._id === action.payload._id ? { ...item, ...action.payload } : item
            );
        case ACTIONS.FAILS:
            console.error("API Error:", action.payload);
            return state;
        default:
            return state;
    }
};

export const useCRUD = () => {
    const { getAll, post, del, update } = useApi('http://localhost:5000/api/v1/todos');
    const [state, dispatch ] = useReducer(reducer, []);

    const init = async () => {
        try {
            const todos = await getAll();
            dispatch({ type: ACTIONS.READ, payload: todos });
        } catch (err) {
            dispatch({ type: ACTIONS.FAILS, payload: err.message });
        }
    };

    useEffect(() => {
        init();
    }, []);

    const create = async (body) => {
        const newTodo = await post(body);
        if (newTodo) {
            dispatch({ type: ACTIONS.CREATE, payload: newTodo });
        }
    };

    const deleteOne = async (id) => {
        try {
            await del(id);
            dispatch({ type: ACTIONS.DELETE, payload: { id } });
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    const updateOne = async (body) => {
        try {
            const updatedTodo = await update(body); 
            if (updatedTodo) {
                dispatch({ type: ACTIONS.UPDATE, payload: updatedTodo });
            }
        } catch (err) {
            console.error("Failed to update:", err);
        }
    };

    return { state, create, deleteOne, updateOne };
};
