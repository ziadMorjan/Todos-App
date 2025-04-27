import axios from "axios";
import { useState } from "react";

export const useApi = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Get all data in array
    const getAll = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(url);
            return res.data.data.todos;
        } catch (e) {
            setError(e.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Post a new todo
    const post = async (body) => {
        setIsLoading(true);
        try {
            const res = await axios.post(url, body);
            return res?.data?.data?.todo;
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Update a todo
    const update = async (body) => {
        setIsLoading(true);
        try {
            const res = await axios.patch(`${url}/${body._id}`, body); // Corrected API call to include the ID in the URL
            return res?.data?.data?.todo;
        } catch (e) {
            setError(e.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a todo by ID
    const del = async (id) => {
        setIsLoading(true);
        try {
            await axios.delete(`${url}/${id}`);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { url ,getAll, isLoading, error, post, del, update };
};
