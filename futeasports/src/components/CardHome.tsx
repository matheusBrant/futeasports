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
import { useState } from "react";

type Player = RouterOutputs["player"]["getPlayers"][number]

export const CardPlayerHome = () => {
  const [data, setData] = useState<Player[]>()
  const [page, setPage] = useState<number>(1)

  const handleClick = async (pageNumber: number) => {
    setPage(pageNumber);
    console.log(page, pageNumber);

    const newData = await refetch({ queryKey: ["player", "getPlayers", { page: pageNumber }] });
    setData(newData.data);
  }
  const { refetch } = api.player.getPlayers.useQuery({ page }, {
    refetchOnWindowFocus: false,
    enabled: false,
  })

  return (
    <div>
      <div className="md:p-20 sm:p-8 flex justify-center items-center">
        <div className="grid grid-cols-6 gap-5">
          {data?.map((player: Player, index) => (
            <div key={index}>
              <Image src={player.shieldUrl} alt={`Imagem ${index + 1}`} width={140} height={95} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={async () => { await handleClick(page - 1) }} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={async () => { await handleClick(1) }} isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={async () => { await handleClick(2) }}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={async () => { await handleClick(3) }}>3</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationNext onClick={async () => { await handleClick(page + 1) }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div >
  );
};