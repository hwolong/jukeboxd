import Header from "../components/Header";

export default function Login() {
    return (
        <main id="top" className="h-full w-full font font-['Ubuntu',sans-serif]">
            <Header />
            <form className="flex flex-col items-center justify-center h-full gap-4">
                <h1 className="text-2xl font-bold">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full max-w-sm px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </main>
    );
}