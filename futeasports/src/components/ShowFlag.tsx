import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext
} from "@/components/ui/pagination";
import { api, type RouterOutputs } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "./Loading";

type Flag = RouterOutputs["player"]["getFlags"][number]

export const ShowFlags = () => {
    const [data, setData] = useState<Flag[]>()
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState(false)

    const { refetch, isLoading } = api.player.getFlags.useQuery({ page }, {
        refetchOnWindowFocus: false,
        enabled: false,
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const newData = await refetch();
            setData(newData.data);
            setLoading(false);
        };

        void fetchData();
    }, [page, refetch]);

    const handleClick = (pageNumber: number) => {
        setPage(pageNumber);
    }

    return (
        <div>
            <div className="md:pt-15 sm:pt-8 flex justify-center items-center">
                <div className="grid grid-cols-1 gap-5">
                    {loading && !isLoading ? <SkeletonLoading /> : (
                        data?.map((player: Flag, index) => (
                            <div key={index}>
                                <Image width="0" height="0" className="w-56 h-56 shadow-md shadow-gray-600" src={player.imageUrl} alt={`Imagem ${index + 1}`} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationNext onClick={() => handleClick(page + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};