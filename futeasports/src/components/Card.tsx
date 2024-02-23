import { Loading } from "@/components/Loading"
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
import { useEffect, useState } from "react"
import { FaLightbulb } from "react-icons/fa"
import { LuEqual } from "react-icons/lu"
import { RiArrowUpDoubleLine, RiArrowUpSLine } from "react-icons/ri"
import defaultCard from '../assets/default_card.png'
import ReRadarChart from "./RadarChart"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Player = RouterOutputs["player"]["getByName"][number]

let dataComparison: Player[] = []

export const CardPlayer = () => {

  const [value, setValue] = useState('')
  const [data, setData] = useState<Player[]>()
  const [selectedPlayerImageUrl, setSelectedPlayerImageUrl] = useState<string | null>(null)
  const [selectedPlayerRank, setSelectedPlayerRank] = useState<number | null>(null)
  const [selectedPlayerSkillMoves, setSelectedPlayerSkillMoves] = useState<number | null>(null)
  const [selectedPlayerWeakFoot, setSelectedPlayerWeakFoot] = useState<number | null>(null)
  const [idPlayer, setIdPlayer] = useState<string | null>(null)

  const [popoverVisible, setPopoverVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cardLoading, setCardLoading] = useState(false)

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
      <Card className="text-gray-200 md:w-[350px] sm:w-[220px] bg-gradient-to-br from-teal-800 to-teal-400 shadow-md shadow-neutral-900 border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            Digite o nome abaixo
          </CardTitle>
          <CardDescription className="flex items-center justify-center text-gray-900">Revele a carta</CardDescription>
        </CardHeader>
        <CardContent>
          <Input className="w-full flex text-gray-900" type="text" value={value}
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
                  <div className="w-full flex items-center justify-center">
                    <ul>
                      {loading ? <Loading size={8} color={"teal"} /> : (
                        data?.map((item: Player) => (
                          <li style={{ cursor: 'pointer' }} className="border-b-2 flex" key={item.id} onClick={() => {
                            setIdPlayer(item.id)
                            setSelectedPlayerImageUrl(item.shieldUrl)
                            setSelectedPlayerRank(item.rank)
                            setSelectedPlayerSkillMoves(item.skillMoves)
                            setSelectedPlayerWeakFoot(item.weakFootAbility)
                            setPopoverVisible(false)
                            setCardLoading(true)

                            dataComparison = dataComparison?.filter((item: Player) => item.id !== idPlayer)
                            dataComparison?.push(item)
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
          {selectedPlayerImageUrl ? (
            <div className="relative">
              {cardLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loading size={8} color={"teal"} />
                </div>
              )}
              <Image
                src={selectedPlayerImageUrl}
                alt="Imagem"
                width={200}
                height={100}
                onLoadingComplete={() => setCardLoading(false)}
                onError={() => setCardLoading(false)}
              />
            </div>
          ) : (
            <Image src={defaultCard} alt="Imagem" width={200} height={100} />
          )}

        </div>
      </Card>

      <Card className="pt-4 mt-3 w-[350px] bg-gradient-to-br from-teal-800 to-teal-400 border-transparent shadow-md shadow-neutral-900">
        <CardContent className="grid grid-cols-2 gap-1 w-full">
          <CardTitle className="italic text-sm flex items-center justify-center text-gray-200">Habilidade</CardTitle>
          <div className="flex justify-center items-center p-2 shadow-slate-600 shadow-md rounded-lg border border-transparent">
            {selectedPlayerSkillMoves ? <StarRating max={5} rating={selectedPlayerSkillMoves} /> :
              <h1 className="ml-1 text-amber-500">?</h1>
            }
          </div>
          <CardTitle className="italic text-sm flex items-center justify-center text-gray-200">Perna ruim</CardTitle>
          <div className="flex justify-center items-center p-2 shadow-slate-600 shadow-md rounded-lg border border-transparent">
            {selectedPlayerWeakFoot ? <StarRating max={5} rating={selectedPlayerWeakFoot} /> :
              <h1 className="ml-1 text-amber-500">?</h1>
            }
          </div>
        </CardContent>
      </Card>
      <div className="m-5 flex justify-center items-center">
        {dataComparison?.[0] && dataComparison?.[1] ? <Compare /> : <Compare />}
      </div>
    </div>

  )
}


const StarRating = (props: { max: number, rating: number }) => {
  const renderStars = (maxStars: number, numStars: number) => {
    const stars = []
    for (let i = 0; i < maxStars; i++) {
      if (i < numStars) {
        stars.push(<span key={i} className="text-yellow-500 text-2xl hover:shadow-slate-600 hover:shadow-inner
        rounded-full border border-transparent">&#9733;</span>)
      } else {
        stars.push(<span key={i} className="text-gray-300 hover:shadow-slate-600 hover:shadow-inner
        rounded-full border border-transparent text-2xl">&#9733;</span>)
      }
    }
    return stars
  }

  return (
    <div>
      {renderStars(props.max, props.rating)}
    </div>
  )
}

export const Compare = () => {
  const [aspect, setAspect] = useState<number>(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setAspect(30);
      } else {
        setAspect(20);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dataComparison?.length !== 2) {
    return null;
  }

  const [player1, player2] = dataComparison;

  if (!player1 || !player2) {
    return null
  }


  const realName1 = player1.commonName ?? player1.name
  const realName2 = player2.commonName ?? player2.name

  let gkSpeedSkill = <h1></h1>
  let gkHandSkill = <h1></h1>
  if (player1.isGk === true && player2.isGk === true) {
    const player1GkSpeed = calculatePlayerGkSpeed(player1);
    const player2GkSpeed = calculatePlayerGkSpeed(player2);
    const player1GkHand = calculatePlayerGkHand(player1);
    const player2GkHand = calculatePlayerGkHand(player2);

    gkSpeedSkill = textComparison(realName1, realName2, player1GkSpeed, player2GkSpeed, 'como líbero', aspect)
    gkHandSkill = textComparison(realName1, realName2, player1GkHand, player2GkHand, 'como fixo', aspect)
  }


  const player1Atk = calculatePlayerAtk(player1);
  const player2Atk = calculatePlayerAtk(player2);

  const atkSkill = textComparison(realName1, realName2, player1Atk, player2Atk, 'na parte ofensiva', aspect)

  const player1Mid = calculatePlayerMidOfe(player1);
  const player2Mid = calculatePlayerMidOfe(player2);

  const midSkill = textComparison(realName1, realName2, player1Mid, player2Mid, 'na criação', aspect)

  const player1MidDef = calculatePlayerMidDef(player1);
  const player2MidDef = calculatePlayerMidDef(player2);

  const midDefSkill = textComparison(realName1, realName2, player1MidDef, player2MidDef, 'no meio defensivo', aspect)

  const player1Def = calculatePlayerDef(player1);
  const player2Def = calculatePlayerDef(player2);

  const defSkill = textComparison(realName1, realName2, player1Def, player2Def, 'na defesa', aspect)

  return (
    <Popover >
      <PopoverTrigger asChild>
        {player1.isGk === true && player2.isGk === false || player1.isGk === false && player2.isGk === true ? null :
          <Button className="bg-emerald-100 shadow-xl"
            variant="outline"><FaLightbulb size={18} className="text-yellow-500 mr-2" />
            {realName1} vs {realName2}</Button>
        }
      </PopoverTrigger>
      <PopoverContent className="md:w-[550px] sm:w-56">
        <ReRadarChart player1={player1} player2={player2} />

        <div className="flex flex-col">
          {player1.isGk === true && player1.isGk === true ?
            <div>
              <div className="border-b flex items-center">{gkSpeedSkill}</div>
              <div className="border-b flex items-center">{gkHandSkill}</div>
            </div>
            :
            <div>
              <div className="border-b flex items-center">{atkSkill}</div>
              <div className="border-b flex items-center">{midSkill}</div>
              <div className="border-b flex items-center">{midDefSkill}</div>
              <div className="border-b flex items-center">{defSkill}</div>
            </div>
          }

        </div>
      </PopoverContent>
    </Popover>
  )
}

const normalizeValue = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};

const textComparison = (realName1: string, realName2: string, player1combo: number, player2combo: number, type: string, aspect: number) => {
  const normalizedPlayer1Combo = normalizeValue(player1combo, 20, 100)
  const normalizedPlayer2Combo = normalizeValue(player2combo, 20, 100)

  let comboSkill = <h1></h1>;
  if (Math.abs(normalizedPlayer1Combo - normalizedPlayer2Combo) < 0.1) {
    comboSkill =
      <div className="border-b flex items-center">
        <LuEqual size={aspect} className="text-green-700 mr-1" />
        <h1><strong>{realName1}</strong> e <strong>{realName2}</strong> são semelhantes <strong>{type}</strong></h1>
      </div>

  } else if (normalizedPlayer1Combo > normalizedPlayer2Combo + 0.4) {
    comboSkill =
      <div className="border-b flex items-center">
        <RiArrowUpDoubleLine size={aspect} className="text-green-700 mr-1" />
        <h1><strong>{realName1}</strong> é muito melhor <strong>{type}</strong></h1>
      </div>
  } else if (normalizedPlayer2Combo > normalizedPlayer1Combo + 0.4) {
    comboSkill =
      <div className="border-b flex items-center">
        <RiArrowUpDoubleLine size={aspect} className="text-green-700 mr-1" />
        <h1><strong>{realName2}</strong> é muito melhor <strong>{type}</strong></h1>
      </div>
  } else if (normalizedPlayer1Combo > normalizedPlayer2Combo) {
    comboSkill =
      <div className="border-b flex items-center">
        <RiArrowUpSLine size={aspect} className="text-green-700 mr-1" />
        <h1><strong>{realName1}</strong> é melhor <strong>{type}</strong></h1>
      </div>
  } else if (normalizedPlayer2Combo > normalizedPlayer1Combo) {
    comboSkill =
      <div className="border-b flex items-center">
        <RiArrowUpSLine size={aspect} className="text-green-700 mr-1" />
        <h1><strong>{realName2}</strong> é melhor <strong>{type}</strong></h1>
      </div>
  }
  return comboSkill;
}

const calculatePlayerAtk = (player: Player): number => {
  const weights = {
    shooting: 2.5,
    pace: 1.75,
    dribbling: 1.5,
    physicality: 1
  }

  return (
    player.shooting * weights.shooting +
    player.pace * weights.pace +
    player.dribbling * weights.dribbling +
    player.physicality * weights.physicality
  );
}

const calculatePlayerMidOfe = (player: Player): number => {
  const weights = {
    passing: 3,
    dribbling: 2,
    pace: 1,
    shooting: 1,
  }

  return (
    player.passing * weights.passing +
    player.dribbling * weights.dribbling +
    player.pace * weights.pace +
    player.shooting * weights.shooting
  );
}

const calculatePlayerMidDef = (player: Player): number => {
  const weights = {
    passing: 1.5,
    dribbling: 1.25,
    pace: 1,
    defending: 2,
    physicality: 1.75
  }

  return (
    player.passing * weights.passing +
    player.dribbling * weights.dribbling +
    player.pace * weights.pace +
    player.defending * weights.defending +
    player.physicality * weights.physicality
  );
}

const calculatePlayerDef = (player: Player): number => {
  const weights = {
    defending: 2.5,
    physicality: 1.75
  }

  return (
    player.defending * weights.defending +
    player.physicality * weights.physicality
  );
}

const calculatePlayerGkSpeed = (player: Player): number => {
  const weights = {
    gkDiving: 1.5,
    gkHandling: 1,
    gkKicking: 2.5,
    gkReflexes: 1,
    gkSpeed: 2,
    gkPositioning: 1,
  }

  return (
    player.pace * weights.gkDiving +
    player.shooting * weights.gkHandling +
    player.passing * weights.gkKicking +
    player.dribbling * weights.gkReflexes +
    player.defending * weights.gkSpeed +
    player.physicality * weights.gkPositioning
  );
}

const calculatePlayerGkHand = (player: Player): number => {
  const weights = {
    gkDiving: 1,
    gkHandling: 2.5,
    gkKicking: 1,
    gkReflexes: 2,
    gkSpeed: 1,
    gkPositioning: 1.5,
  }

  return (
    player.pace * weights.gkDiving +
    player.shooting * weights.gkHandling +
    player.passing * weights.gkKicking +
    player.dribbling * weights.gkReflexes +
    player.defending * weights.gkSpeed +
    player.physicality * weights.gkPositioning
  );
}
