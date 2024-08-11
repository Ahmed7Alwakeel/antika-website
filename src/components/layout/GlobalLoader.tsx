import React from "react";
import axios from "axios";
const { useState, useCallback, useMemo, useEffect } = React;

const ax = axios.create(); // export this and use it in all your components

const useAxiosLoader = () => {
    const [counter, setCounter] = useState(0);

    const inc = useCallback(() => setCounter(counter => counter + 1), [
        setCounter
    ]); // add to counter
    const dec = useCallback(() => setCounter(counter => counter - 1), [
        setCounter
    ]); // remove from counter

    const interceptors = useMemo(
        () => ({
            request: (config:any) => {
                inc();
                return config;
            },
            response: (response:any) => {
                dec();
                return response;
            },
            error: (error:any) => {
                dec();
                return Promise.reject(error);
            }
        }),
        [inc, dec]
    ); // create the interceptors

    useEffect(() => {
        // add request interceptors
        ax.interceptors.request.use(interceptors.request, interceptors.error);
        // add response interceptors
        ax.interceptors.response.use(interceptors.response, interceptors.error);
        return () => {
            // remove all intercepts when done
            ax.interceptors.request.eject(interceptors.request as any);
            ax.interceptors.request.eject(interceptors.error as any);
            ax.interceptors.response.eject(interceptors.response as any);
            ax.interceptors.response.eject(interceptors.error as any);
        };
    }, [interceptors]);

    return [counter > 0];
};

const GlobalLoader = () => {
    const [loading] = useAxiosLoader();

    return <div>{loading ?
        <div className="spinner">
            <div className="loader"></div>
        </div>
        : null}</div>;
};

export default GlobalLoader;