import React, { useEffect, useState } from 'react';
import { ApiInfo } from '../api_access';
import CommentBox from './CommentBox';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hoihxvixsnpaffkaketj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
if (!supabaseKey) {
    throw new Error('SUPABASE_KEY environment variable is not set');
}
const supabase = createClient(supabaseUrl, supabaseKey)

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

async function getAverageRating(mbid: string) {
    const { data, error } = await supabase
        .from('Reviews')
        .select('stars')
        .eq('mbid', mbid);
    if (error) {
        console.error('Error fetching ratings:', error);
        return null;
    }
    if (data && data.length > 0) {
        const totalStars = data.reduce((sum, review) => sum + review.stars, 0);
        return totalStars / data.length;
    }
    return null;
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
        <div className="flex flex-col items-center justify-center gap-4 border">
            <img className="rounded-lg pt-4 pr-2 pl-2 max-w-[50%]" src={apiInfo.coverArt.images[0].image} alt={`${apiInfo.releaseGroup.title} cover art`} />
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
    )

}