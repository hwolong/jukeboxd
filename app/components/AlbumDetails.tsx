import React, { Suspense, useEffect, useState } from 'react';
import { ApiInfo } from '../api_access';
import CommentBox from './CommentBox';
import { getAverageRating } from '../api_access';
import ReviewTimelineAlbum from './ReviewTimelineAlbum';
import ReviewTimeline from './ReviewTimeline';

interface albumDetailsProps {
    apiInfo: ApiInfo
}

function sortArtists(artists: Array<{ name: string }>){
    if (artists.length <= 0){
        return 'No artists found.'
    } else if (artists.length > 1){
        const artistNames = artists.map(artist => artist.name);
        return artistNames.join(', ');
    } else {
        return artists[0].name;
    }
}

export default function AlbumDetails( {apiInfo} : albumDetailsProps) {
    const [avgRating, setAvgRating] = useState<number | null | undefined>(undefined);

    useEffect(() => {
        let mounted = true;
        getAverageRating(apiInfo.releaseGroup.id)
            .then(r => {
                if (mounted) setAvgRating(r);
            })
            .catch(err => {
                console.error('Failed to load average rating', err);
                if (mounted) setAvgRating(null);
            });
        return () => { mounted = false; };
    }, [apiInfo.releaseGroup.id]);

    return (
        <>
            <div className="flex flex-row items-center justify-center gap-4 w-3/4 mx-auto max-h-3/5">
                {apiInfo.coverArt.images && (
                    <img className="rounded-3xl pt-4 pr-2 pl-2 max-h-full" src={apiInfo.coverArt.images[0].image} alt={`${apiInfo.releaseGroup.title} cover art`} />
                )}
                <div>
                <h1 className="text-xl font-bold">{sortArtists(apiInfo.artist.artists)}</h1>
                <h3 className="text-xl font-bold italic">{apiInfo.releaseGroup.title}</h3>
                <h3 className="text-lg">Released {apiInfo.releaseGroup['first-release-date']}</h3>
                <br></br>
                {avgRating !== undefined ? (
                    avgRating !== null ? (
                        <h4>Average rating: {(avgRating / 2).toFixed(2)}/5</h4>
                    ) : (
                        <h4>No ratings yet.</h4>
                    )
                ) : (
                    <h4>Loading rating...</h4>
                )}
                <CommentBox mbid={apiInfo.releaseGroup.id} />
                </div>
            </div>
            <h1 className='font-bold text-3xl mx-auto my-4'>Reviews</h1>
            <ReviewTimelineAlbum mbid={apiInfo.releaseGroup.id}></ReviewTimelineAlbum>
        </>
    )

}