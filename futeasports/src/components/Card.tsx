import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api, type RouterOutputs } from "@/utils/api"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Loading } from "@/components/Loading"


type Player = RouterOutputs["player"]["getByName"]

let dataComparison: Player[] = []

export const CardPlayer = () => {

  const [value, setValue] = useState('')
  const [data, setData] = useState<Player>()
  const [selectedPlayerImageUrl, setSelectedPlayerImageUrl] = useState<string | null>(null)
  const [selectedPlayerRank, setSelectedPlayerRank] = useState<number | null>(null)
  const [selectedPlayerSkillMoves, setSelectedPlayerSkillMoves] = useState<number | null>(null)
  const [selectedPlayerWeakFoot, setSelectedPlayerWeakFoot] = useState<number | null>(null)
  const [idPlayer, setIdPlayer] = useState<string | null>(null)

  const [popoverVisible, setPopoverVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true);
    setPopoverVisible(true)
    const newData = await refetch()
    
    setData(newData.data)
    setLoading(false)
  }

  if (value === '') {
    setValue('  ')
  }

  const { refetch } = api.player.getByName.useQuery({ name: value }, {
    refetchOnWindowFocus: false,
    enabled: false,
  })

  if (!refetch) {
    return (<div>..Loading</div>)
  }

  return (
    <div>
      <Card className="w-[350px] bg-emerald-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            Digite o nome abaixo
          </CardTitle>
          <CardDescription className="flex items-center justify-center">Revele a carta</CardDescription>
        </CardHeader>
        <CardContent>
          <Input className="w-full flex" type="text" value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value.trimStart())
            }}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={value.trim() === ''} onClick={handleClick}
                className='mt-2 flex-grow w-full text-xl font-bold'>Buscar
              </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-80 ${!popoverVisible ? 'hidden' : ''}`}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Jogadores encontrados</h4>
                  <p className="text-sm text-muted-foreground">
                    Selecione
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="w-full">
                    <ul>
                      {loading ? <Loading /> : (
                        data?.map(item => (
                          <li style={{ cursor: 'pointer' }} className="border-b-2 flex" key={item.id} onClick={() => {
                            console.log(selectedPlayerSkillMoves)

                            setIdPlayer(item.id);
                            setSelectedPlayerImageUrl(item.shieldUrl);
                            setSelectedPlayerRank(item.rank);
                            setSelectedPlayerSkillMoves(item.skillMoves);
                            setSelectedPlayerWeakFoot(item.weakFootAbility);
                            setPopoverVisible(false);

                            /* eslint-disable */
                            // @ts-ignore
                            dataComparison = dataComparison.filter((item: Player) => item.id !== idPlayer)
                            // @ts-ignore
                            dataComparison.push(item);
                            console.log(dataComparison);
                            /* eslint-enable */

                            
                          }}>
                            <p><Image src={item.avatarUrl} alt="Imagem" width={50} height={25} /></p>
                            <p className="ml-2 border-b-2 italic p-3 text-center">{item.position.shortName}</p>
                            <p className="italic p-3 text-center">{item.commonName ?? item.name}</p>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
        {selectedPlayerRank ?
          <CardTitle className="flex items-center justify-center">
            <span>Rank:</span><span className="ml-1 text-amber-500">{selectedPlayerRank}</span>
          </CardTitle> :
          <CardTitle className="flex items-center justify-center">
            <span>Rank:</span><span className="ml-1 text-amber-500">?</span>
          </CardTitle>
        }
        <div className={`p-3 flex justify-center items-center`}>
          {selectedPlayerImageUrl ?
            <Image src={selectedPlayerImageUrl} alt="Imagem" width={200} height={100} /> :
            <Image src={'https://i.ibb.co/Kx76Cp4/image.png'} alt="Imagem" width={200} height={100} />
          }
        </div>
      </Card>

      <Card className="pt-4 mt-3 w-[350px] bg-emerald-100 shadow-2xl">
        <CardContent className="grid grid-cols-2 gap-4 w-full">
          <CardTitle className="italic text-sm flex items-center justify-center ">Habilidade</CardTitle>
          <div className="flex justify-center items-center rounded border-dashed border border-green-400 p-2">
            {selectedPlayerSkillMoves ? <StarRating rating={selectedPlayerSkillMoves} /> :
              <h1 className="ml-1 text-amber-500">?</h1>
            }
          </div>
          <CardTitle className="italic text-sm flex items-center justify-center">
            Perna ruim
          </CardTitle>
          <div className="flex justify-center items-center rounded border-dashed border border-green-400 p-2">
            {selectedPlayerWeakFoot ? <StarRating rating={selectedPlayerWeakFoot} /> :
              <h1 className="ml-1 text-amber-500">?</h1>
            }
          </div>
        </CardContent>
      </Card>
      <Compare compare={dataComparison}/>
    </div>
  )
}


const StarRating = (props: { rating: number }) => {
  const maxStars = 5

  const renderStars = (numStars: number) => {
    const stars = []
    for (let i = 0; i < maxStars; i++) {
      if (i < numStars) {
        stars.push(<span key={i} className="text-yellow-500 text-xl">&#9733;</span>)
      } else {
        stars.push(<span key={i} className="text-gray-300 text-xl">&#9733;</span>)
      }
    }
    return stars
  }

  return (
    <div>
      {renderStars(props.rating)}
    </div>
  )
}

const Compare = (props: { compare: Player[] }) => {
  /* eslint-disable */
  // @ts-ignore
  const data: Player = props.compare[0] 
  // @ts-ignore
  const data2: Player = props.compare[1]

  return (                      
    <div>
      {/* @ts-ignore */}
      <h1>{data?.name ?? 'a'}</h1> 
      {/* @ts-ignore */}
      <h1>{data2?.name ?? 'a'}</h1>  
    </div>
  )
  /* eslint-enable */
}