import { api, type RouterOutputs } from "@/utils/api"
import Image from "next/image"
import { useEffect, useState } from "react"
import defaultSquad from '../assets/default_squad.png'
import { SkeletonLoading } from "./Loading"

import {
  CardContent
} from "@/components/ui/card"
import { Button } from "./ui/button"


type Squad = RouterOutputs["player"]["buildSquad"][number]

export const Squad = () => {
  const [data, setData] = useState<Squad[]>()
  const [page, setPage] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const { refetch, isLoading } = api.player.buildSquad.useQuery({ page }, {
    refetchOnWindowFocus: false,
    enabled: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const newData = await refetch()
      setData(newData.data)
      console.log(newData.data)
      setLoading(false)
    }

    void fetchData()
  }, [page, refetch])

  const handleClick = (fetch: boolean) => {
    setPage(fetch)
  }

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="grid grid-cols-1 gap-5">
        {loading && !isLoading ? <SkeletonLoading /> : (
          <CardContent className="flex items-center justify-center">
            <Image width="0" height="0" className="w-full h-full shadow-gray-600"
              src={defaultSquad} alt={`squad}`} />
            {/* {buildFormation({ data: data })} */}
          </CardContent>
        )}
        <div className="flex justify-center items-center">
          <Button className="bg-teal-600 text-teal-950" onClick={() => handleClick(true)} >Criar elenco</Button>
        </div>
      </div>
    </div >
  )
}

/* const buildFormation = (props: { data: Array<players> }) => {
  return (
    <div className="grid grid-rows-4 gap-4 absolute">
      <div className="flex justify-center gap-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
      </div>

      <div className="flex justify-center gap-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
      </div>

      <div className="flex justify-center gap-4">
        <div className="w-20 h-20 rounded-full">
          {makePositionImage({ avatar: props.data?.[1]?.avatarUrl ?? '' })}
        </div>
        <div className="w-20 h-20 rounded-full">
          {makePositionImage({ avatar: props.data?.[2]?.avatarUrl ?? '' })}
        </div>
        <div className="w-20 h-20 rounded-full">
          {makePositionImage({ avatar: props.data?.[3]?.avatarUrl ?? '' })}

        </div>
        <div className="w-20 h-20 rounded-full">
          {makePositionImage({ avatar: props.data?.[4]?.avatarUrl ?? '' })}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <div className="w-20 h-20 rounded-full">
          {makePositionImage({ avatar: props.data?.[0]?.avatarUrl ?? '' })}
        </div>
      </div>
    </div>

  )
}

const makePositionImage = (props: { avatar: string }) => {
  return (
    <Image width="0" height="0" className="w-14  h-14  shadow-gray-600"
      src={props.avatar} alt={`squad}`} />
  )
}

 */