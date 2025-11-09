import { MusicBrainzApi, CoverArtArchiveApi, IReleaseGroup, IBrowseReleasesResult, IRelease, IBrowseArtistsResult, ICoversInfo } from "musicbrainz-api"

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hoihxvixsnpaffkaketj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
if (!supabaseKey) {
    throw new Error('SUPABASE_KEY environment variable is not set');
}
const supabase = createClient(supabaseUrl, supabaseKey)

export interface ApiInfo {
    releaseGroup: IReleaseGroup;
    releases: IBrowseReleasesResult;
    primaryRelease: IRelease;
    artist: IBrowseArtistsResult;
    coverArt: ICoversInfo;
}

const mbApi = new MusicBrainzApi({
    appName: 'Jukeboxd',
    appVersion: '0.1.0',
    appContactInfo: 'hwolong@gmail.com',
});

const caaApi = new CoverArtArchiveApi();

export async function getReleaseGroup({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching release group with MBID: ${mbid}`);
        const releaseGroup = await mbApi.lookup('release-group', mbid);
        return releaseGroup
    } catch (error) {
        console.error(error);
    }
}

async function getCoverArt({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching cover art for release MBID: ${mbid}`);
        const coverArt = await caaApi.getReleaseCovers(mbid);
        return coverArt;
    } catch (error) {
        console.error(error);
    }
}

export async function getInfo({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching release group with MBID: ${mbid}`);
        const response = await fetch(`/api/musicbrainz?mbid=${mbid}`);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data: ApiInfo = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addReview(mbid: string, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    const albumInfo = await getInfo({ mbid });
    console.log(albumInfo);
    console.log(`Submitting comment for MBID ${mbid}: ${comment} with rating ${rating}`);
    const { data, error } = await supabase
        .from('Reviews')
        .insert([
            {
                mbid: mbid,
                artist: albumInfo?.artist.artists.map(artist => artist.name).join(", ") ?? "",
                album: albumInfo?.primaryRelease?.title ?? "",
                stars: rating,
                review: comment as string,
            },
        ]);
    if (error) {
        console.error('Error submitting comment:', error);
    } else {
        console.log('Comment submitted successfully:', data);
        document.getElementById("submit-button")!.innerHTML = "Submitted!";
        document.getElementById("submit-button")?.setAttribute("disabled", "true");
    }
}

export async function getAverageRating(mbid: string) {
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

export async function getReviews() {
    const {data, error} = await supabase
        .from("Reviews")
        .select()
        .order("created_at", {ascending: false, nullsFirst: false})
        .limit(10);
    if (error) {
        console.error('Error fetching reviews:', error);
        return null;
    }
    if (data) {
        return data
    }
    return null;
}

export async function getReviewsForRG(mbid: string) {
    const {data, error} = await supabase
        .from("Reviews")
        .select()
        .eq("mbid", mbid)
        .order("created_at", {ascending: false, nullsFirst: false})
        .limit(100);
    if (error) {
        console.error('Error fetching reviews:', error);
        return null;
    }
    if (data) {
        return data
    }
    return null;
}