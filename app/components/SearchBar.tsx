import { isHmrRefresh } from "next/dist/server/app-render/work-unit-async-storage.external";
import React from "react";

interface SearchBarProps {
    submitHandler: React.FormEventHandler
    hint?: string
}

export default function SearchBar(props: SearchBarProps) {
    return (
        <form action="" onSubmit={props.submitHandler}>
            {/* <button className="block sm:hidden ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300" onClick={() => {window.location.href = "/"}}>⬅️</button> */}
            <input type="text" name="search" placeholder={props.hint || ""} className="border-2 border-(--color-dark) rounded-md px-1" />
            <button onClick={() => window.location.href='/search/' + encodeURIComponent((document.querySelector('input[name="search"]') as HTMLInputElement).value)} type="submit" className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Search</button> 
        </form>
    );
}