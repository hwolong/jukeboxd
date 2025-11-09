"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { MusicBrainzApi } from "musicbrainz-api";
import Header from "@/app/components/Header";

const mbapi = new MusicBrainzApi({
    appName: 'Jukeboxd',
    appVersion: '0.1.0',
    appContactInfo: 'hunter@hunterlong.com',
});

interface SearchResultsRouteRootProps {
    params: Promise<{
        query: string
    }>}

export default function SearchResultsRouteRoot({ params }: SearchResultsRouteRootProps) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [body, setBody] = useState<React.ReactNode>(null);
    const [isLoading, setIsLoading] = useState(true);

    const decodedQuery = decodeURIComponent(resolvedParams.query);

    useEffect(() => {
        if (!resolvedParams?.query) return;

        const fetchData = async () => {
            setIsLoading(true);
            const data = await mbapi.search('release-group', {query: decodedQuery});
            if (!data) {
                console.error('Error fetching search results');
                setBody(<h4>Error fetching search results.</h4>);
            } else if (data && data['release-groups'] && data['release-groups'].length > 0) {
                setBody(
                    <ul>
                        {data['release-groups'].map((item) => (
                            <li key={item.id} className="mb-2">
                                <a href={`/album/${item.id}`} className="text-blue-500 hover:underline">
                                    {item.title} by {item['artist-credit'].map(artist => artist.name).join(', ')}
                                </a>
                            </li>
                        ))}
                    </ul>
                );
            } else {
                setBody(<h4>No results found for {resolvedParams.query}.</h4>);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [resolvedParams.query]);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        <main id="top" className="h-full w-full font font-['Ubuntu',sans-serif]">
            <Header></Header>
            <div className="p-4">
                <h2 className="text-2xl mb-4">Search Results for {decodedQuery}</h2>
                {body}
            </div>
        </main>
    );
}