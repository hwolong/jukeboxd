import { getReviews } from "../api_access";
import Review from "./Review";

export default async function ReviewTimeline() {
    
    const lastTenReviews = await getReviews();

    return (
        <div className="flex flex-row grow mx-8 mb-8">
            <div className="grow"></div>
            <section id="new_reviews" className="flex flex-col items-start w-9/10 md:w-4/5">
                {lastTenReviews ? lastTenReviews.map((r, i) => <Review albumName={r.album || "Unknown Album"} artistName={r.artist || "Unknown Artist"} reviewBody={r.review || "No Review Text"} id={r.mbid} key={i} stars={r.stars}></Review>) : <p>Loading Reviews Failed.</p>}
            </section>
            <div className="grow">
            </div>
        </div>
    ); 
}