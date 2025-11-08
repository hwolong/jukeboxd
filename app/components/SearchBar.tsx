import React from "react";

interface SearchBarProps {
    submitHandler: React.FormEventHandler
    hint?: string
}

export default function SearchBar(props: SearchBarProps) {
    return (
        <form action="" onSubmit={props.submitHandler}>
            <input type="text" name="search" placeholder={props.hint || ""} className="border-2 border-(--color-dark) rounded-md px-1" />
        </form>
    );
}