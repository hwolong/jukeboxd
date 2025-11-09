import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hoihxvixsnpaffkaketj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
if (!supabaseKey) {
    throw new Error('SUPABASE_KEY environment variable is not set');
}
const supabase = createClient(supabaseUrl, supabaseKey)


async function submitComment(mbid: string, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    console.log(`Submitting comment for MBID ${mbid}: ${comment} with rating ${rating}`);
    const { data, error } = await supabase
        .from('Reviews')
        .insert([
            { mbid: mbid, stars: rating, review: comment as string},
        ]);
    if (error) {
        console.error('Error submitting comment:', error);
    } else {
        console.log('Comment submitted successfully:', data);
    }
}

export default function CommentBox({mbid}: {mbid: string}) {
    return (
        <div>
            <form onSubmit={(event) => submitComment(mbid, event)}>
                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your rating</label>
                <select name="rating" className="mb-2 p-2 border rounded-md">
                    <option value="1">½</option>
                    <option value="2">★</option>
                    <option value="3">★½</option>
                    <option value="4">★★</option>
                    <option value="5">★★½</option>
                    <option value="6">★★★</option>
                    <option value="7">★★★½</option>
                    <option value="8">★★★★</option>
                    <option value="9">★★★★½</option>
                    <option value="10">★★★★★</option>
                </select>
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your comment</label>
                <textarea name="comment" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Submit</button>
            </form>
        </div>
    )
}