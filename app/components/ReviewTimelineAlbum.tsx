"use client";
import { useEffect, useState } from "react";
import { getReviewsForRG } from "../api_access";
import ReviewAlbum from "./ReviewAlbum";

interface ReviewTimelineAlbumProps {
    mbid: string;
}

interface ReviewData {
    album: string;
    artist: string;
    review: string;
    mbid: string;
    stars: number;
}

export default function ReviewTimelineAlbum({mbid}: ReviewTimelineAlbumProps) {
    const [lastTenReviews, setLastTenReviews] = useState<ReviewData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;
        
        const fetchReviews = async () => {
            setIsLoading(true);
            try {
                const reviews = await getReviewsForRG(mbid);
                if (mounted) {
                    setLastTenReviews(reviews);
                    setError(false);
                }
            } catch (err) {
                console.error("Failed to fetch reviews", err);
                if (mounted) {
                    setError(true);
                }
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchReviews();

        return () => { mounted = false; };
    }, [mbid]);

    if (isLoading) return <p>Loading reviews...</p>;
    if (error) return <p>Loading Reviews Failed.</p>;

    return (
        <div className="flex flex-row grow mx-8 mb-8">
            <div className="grow"></div>
            <section id="new_reviews" className="flex flex-col items-start w-9/10 md:w-4/5">
                {lastTenReviews ? lastTenReviews.map((r: ReviewData, i: number) => <ReviewAlbum albumName={r.album || "Unknown Album"} artistName={r.artist || "Unknown Artist"} reviewBody={r.review || "No Review Text"} id={r.mbid} key={i} stars={r.stars}></ReviewAlbum>) : <p>No reviews yet.</p>}
            </section>
            <div className="grow">
            </div>
        </div>
    ); 
}