import { useEffect, useState } from "react"
import axios from 'axios'
export const useApi = (url) => {
    const [todo, setTodos] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState('')
    const getData = async () => {
        try {
            setIsloading(true)
            const res = await axios.get(url)
            return res.data.data.todos 

        } catch (e) {
            setError(e.message)

        } finally {
            setIsloading(false)
        }
    }

    // Post a new todo
    const post = async (body) => {
        setIsloading(true);
        try {
            const res = await axios.post(url, body);
            return res.data.data.newTodo
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setIsloading(false);
        }
    };


    // Delete a todo by ID
    const del = async (id) => {
        setIsloading(true);
        try {
            await axios.delete(`${url}/${id}`);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsloading(false);
        }
    };


       // Update a todo
       const update = async (body , form) => {
        setIsloading(true);
        try {
            const res = await axios.patch(`${url}/${body}`, form); 
            return res?.data?.data?.updatedTodo;
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setIsloading(false);
        }
    };


    return { todo, isLoading, error, post, del,update, getData }
}