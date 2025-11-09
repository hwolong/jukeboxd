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

async function getReleases({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching releases for release group MBID: ${mbid}`);
        const releases = await mbApi.browse('release', { 'release-group': mbid });
        return releases;
    } catch (error) {
        console.error(error);
    }
}

async function getArtist({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching artists for release group MBID: ${mbid}`);
        const artist = await mbApi.browse('artist', { 'release-group': mbid });
        return artist;
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
        const releaseGroup = await mbApi.lookup('release-group', mbid);
        const releases = await mbApi.browse('release', { 'release-group': mbid });
        const artist = await mbApi.browse('artist', { 'release-group': mbid });
        const primaryRelease = releases.releases.find(r => (r.date == releaseGroup["first-release-date"]) && r["cover-art-archive"].front) || releases.releases[0];
        const coverArt = await caaApi.getReleaseCovers(primaryRelease.id);
        return { releaseGroup, releases, primaryRelease, artist, coverArt } as ApiInfo;
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