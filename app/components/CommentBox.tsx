import { addReview } from "../api_access";

export default function CommentBox({mbid}: {mbid: string}) {
    return (
        <div>
            <form onSubmit={(event) => addReview(mbid, event)}>
                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your rating</label>
                <select name="rating" className="mb-2 p-2 border rounded-md">
                    <option value="10">★★★★★</option>
                    <option value="9">★★★★½</option>
                    <option value="8">★★★★</option>
                    <option value="7">★★★½</option>
                    <option value="6">★★★</option>
                    <option value="5">★★½</option>
                    <option value="4">★★</option>
                    <option value="3">★½</option>
                    <option value="2">★</option>
                    <option value="1">½</option>
                    <option value="0">ZERO!!!</option>
                </select>
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your comment</label>
                <textarea name="comment" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                <button id="submit-button" type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Submit</button>
            </form>
        </div>
    )
}