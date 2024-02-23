import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { api, type RouterOutputs } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

type Player = RouterOutputs["player"]["getPlayers"][number]

export const CardPlayerHome = () => {
  const [data, setData] = useState<Player[]>()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  const { refetch, isLoading } = api.player.getPlayers.useQuery({ page }, {
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
        <div className="grid grid-cols-6 gap-5">
          {loading && !isLoading ? <Loading /> : (
            data?.map((player: Player, index) => (
              <div key={index}>
                <Image width="0"
                  height="0"
                  className="w-36 h-auto" src={player.shieldUrl} alt={`Imagem ${index + 1}`} />
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => { if (page > 1) handleClick(page - 1) }} />
            </PaginationItem>
            <PaginationItem >
              <PaginationLink onClick={() => handleClick(1)} isActive={page === 1}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handleClick(2)} isActive={page === 2}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handleClick(3)} isActive={page === 3}>3</PaginationLink>
            </PaginationItem >
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationNext onClick={() => handleClick(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};