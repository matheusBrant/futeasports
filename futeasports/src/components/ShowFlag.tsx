import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext
} from "@/components/ui/pagination";
import { api, type RouterOutputs } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { SkeletonLoading } from "./Loading";


import {
    Card,
    CardContent
} from "@/components/ui/card";


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
                        data?.map((flag: Flag, index) => (
                            <div key={index}>
                                <div className="mt-4 flex flex-col items-center">
                                    <div className="flex items-center">
                                        <div><FaLightbulb size={18} className="text-yellow-500 mr-2 animate-bounce" /></div>
                                        <div className="bg-teal-900 hover:bg-transparent text-xl font-semibold border border-transparent rounded-sm w-60 mx-auto p-2">
                                            <div style={{ cursor: 'pointer' }} className="flex justify-center text-teal-900 items-center shadow-inner shadow-teal-900">{flag.name}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <Card className="w-[350px] bg-transparent mt-4 shadow-xl shadow-teal-800">
                                            <CardContent className="flex items-center justify-center">
                                                <Image width="0" height="0" className="hover:animate-spin w-96 h-fit lg:w-56 lg:md:h-56 shadow-gray-600"
                                                    src={flag.imageUrl} alt={`Imagem ${index + 1}`} />
                                            </CardContent>
                                        </Card>
                                    </div>

                                </div>
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
