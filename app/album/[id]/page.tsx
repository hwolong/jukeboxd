"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ApiInfo, getInfo } from "@/app/api_access";
import AlbumDetails from "@/app/components/AlbumDetails";
import Header from "@/app/components/Header";

interface AlbumDetailsRouteRootProps {
    params: Promise<{
        id: string
    }>
    apiInfo?: ApiInfo
}

export default function AlbumDetailsRouteRoot({params, apiInfo}: AlbumDetailsRouteRootProps) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [body, setBody] = useState<React.ReactNode>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!resolvedParams?.id) return;

        const fetchData = async () => {
            setIsLoading(true);
            if (apiInfo) {
                setBody(<AlbumDetails apiInfo={apiInfo}></AlbumDetails>);
            } else {
                const info = await getInfo({mbid: resolvedParams.id});
                setBody(info ? <AlbumDetails apiInfo={info}></AlbumDetails> : <h4>Failed to find {resolvedParams.id}</h4>);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [resolvedParams.id, apiInfo]);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        <main id="top" className="h-full w-full font font-['Ubuntu',sans-serif]">
            <Header></Header>
            {body}
        </main>
    );
}