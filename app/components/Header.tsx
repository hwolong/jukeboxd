"use client";
import FlexSpace from "./FlexSpace";
import SearchBar from "./SearchBar";

export default function Header() {

    const linksRight: readonly [string, string][] = [["Login", "/login"], ["Register", "/register"]];

    function searchBarHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const input = (event.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
        console.log(input);
    }

    return (
        <header className="h-12 w-full bg-(--color-main) flex items-center p-2 text-white">
            <a className="text-lg font-bold flex-1 text-white" href="/">Jukeboxd</a>
            <FlexSpace></FlexSpace>
            <SearchBar submitHandler={searchBarHandler} hint="Search for an Album"></SearchBar>
            <FlexSpace></FlexSpace>
            <p className="font-medium text-lg flex-1 text-right">A community music board</p>
        </header>   
    );
}