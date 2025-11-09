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
            <div className="flex-grow">
                <a className="text-lg font-bold text-white" href="/">Jukeboxd</a>
            </div>
            <div className="flex-grow">
            <nav className="flex w-full items-center block">
                <SearchBar submitHandler={searchBarHandler}></SearchBar>
                <FlexSpace></FlexSpace>
                {/* <div className="self-end">
                    {linksRight.map((x, idx) => <a key={idx} href={x[1]} className="mx-2">{x[0]}</a>)}
                </div> */}
            </nav>
            </div>
        </header>
    );
}