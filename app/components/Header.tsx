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
        <header className="h-12 w-full bg-(--color-main) flex items-center p-2">
            <nav className="flex w-full items-center">
                <SearchBar submitHandler={searchBarHandler}></SearchBar>
                <FlexSpace></FlexSpace>
                {/* <div className="self-end">
                    {linksRight.map((x, idx) => <a key={idx} href={x[1]} className="mx-2">{x[0]}</a>)}
                </div> */}
            </nav>
        </header>
    );
}