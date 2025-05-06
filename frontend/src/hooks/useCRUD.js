import { useReducer } from "react";
import { useApi } from "./useApi";
import { ACTIONS } from "../constant/ACTIONS";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.READ:
            return action.payload;
        case ACTIONS.CREATE:
            return [action.payload , ...state];
        case ACTIONS.DELETE:
            return state.filter((item) => item._id !== action.payload.id);
        default:
            return state;
    }
};

export const useCRUD = () => {
    const { getData, post, del,update, isLoading, error } = useApi("http://localhost:5000/api/v1/todos");
    const [state, dispatch] = useReducer(reducer, []);


    const getAll = async () => {
        let data = await getData();
        dispatch({ type: ACTIONS.READ, payload: data });
    };



    const create = async (body) => {
        const newTodo = await post(body);
        if (newTodo) {
            await getAll(); 
        }
    };

    const updateTodo = async (body ,form) => {
        const updatedTodo = await update(body , form);
        if (updatedTodo) {
            await getAll(); 
        }
    };



    const delTodo = async (id) => {
        await del(id);
        dispatch({ type: ACTIONS.DELETE, payload: { id } });
    };

    return { getAll, create,updateTodo, delTodo, state, error, isLoading };
};
