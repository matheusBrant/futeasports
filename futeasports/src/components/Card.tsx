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
import { GiBrickWall, GiSoccerField } from "react-icons/gi"
import { HiMiniCpuChip } from "react-icons/hi2"
import { TbTargetArrow } from "react-icons/tb"
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
                        data?.map((item: Player) => (
                          <li style={{ cursor: 'pointer' }} className="border-b-2 flex" key={item.id} onClick={() => {
                            setIdPlayer(item.id);
                            setSelectedPlayerImageUrl(item.shieldUrl);
                            setSelectedPlayerRank(item.rank);
                            setSelectedPlayerSkillMoves(item.skillMoves);
                            setSelectedPlayerWeakFoot(item.weakFootAbility);
                            setPopoverVisible(false);

                            dataComparison = dataComparison.filter((item: Player) => item.id !== idPlayer)
                            dataComparison.push(item);
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
            {selectedPlayerSkillMoves ? <StarRating max={5} rating={selectedPlayerSkillMoves} /> :
              <h1 className="ml-1 text-amber-500">?</h1>
            }
          </div>
          <CardTitle className="italic text-sm flex items-center justify-center">
            Perna ruim
          </CardTitle>
          <div className="flex justify-center items-center rounded border-dashed border border-green-400 p-2">
            {selectedPlayerWeakFoot ? <StarRating max={5} rating={selectedPlayerWeakFoot} /> :
              <h1 className="ml-1 text-amber-500">?</h1>
            }
          </div>
        </CardContent>
      </Card>
      <div className="m-5 flex justify-center items-center">
        {dataComparison[0] && dataComparison[1] ? <Compare /> : <Compare />}
      </div>
    </div>

  )
}


const StarRating = (props: { max: number, rating: number }) => {
  const renderStars = (maxStars: number, numStars: number) => {
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
      {renderStars(props.max, props.rating)}
    </div>
  )
}

export const Compare = () => {
  const [aspect, setAspect] = useState<number>(18);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setAspect(30);
      } else {
        setAspect(14);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dataComparison.length !== 2) {
    return null;
  }

  const [player1, player2] = dataComparison;

  if (!player1 || !player2) {
    return null
  }

  const realName1 = player1.commonName ?? player1.name
  const realName2 = player2.commonName ?? player2.name

  const player1Atk = calculatePlayerAtk(player1);
  const player2Atk = calculatePlayerAtk(player2);

  const atkSkill = textComparison(realName1, realName2, player1Atk, player2Atk, 'ofensivas')

  const player1Mid = calculatePlayerMidOfe(player1);
  const player2Mid = calculatePlayerMidOfe(player2);

  const midSkill = textComparison(realName1, realName2, player1Mid, player2Mid, 'meio campistas ofensivas')

  const player1MidDef = calculatePlayerMidDef(player1);
  const player2MidDef = calculatePlayerMidDef(player2);

  const midDefSkill = textComparison(realName1, realName2, player1MidDef, player2MidDef, 'meio campistas defensivas')

  const player1Def = calculatePlayerDef(player1);
  const player2Def = calculatePlayerDef(player2);

  const defSkill = textComparison(realName1, realName2, player1Def, player2Def, 'defensivas')

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button className="bg-emerald-100 shadow-xl"
          variant="outline"><FaLightbulb size={aspect} className="text-yellow-500 mr-2" />
          {realName1} vs {realName2}</Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-full sm:w-52">
        <ReRadarChart player1={player1} player2={player2} />

        <div className="flex flex-col">
          <div className="border-b flex items-center"><TbTargetArrow size={aspect} className="text-green-700 mr-1" />{atkSkill}</div>
          <div className="border-b flex items-center"><HiMiniCpuChip size={aspect} className="text-green-700 mr-1" />{midSkill}</div>
          <div className="border-b flex items-center"><GiSoccerField size={aspect} className="text-green-700 mr-1" />{midDefSkill}</div>
          <div className="border-b flex items-center"><GiBrickWall size={aspect} className="text-green-700 mr-1" />{defSkill}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const normalizeValue = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};

const textComparison = (realName1: string, realName2: string, player1combo: number, player2combo: number, type: string) => {
  const normalizedPlayer1Combo = normalizeValue(player1combo, 20, 100)
  const normalizedPlayer2Combo = normalizeValue(player2combo, 20, 100)

  let comboSkill = <h1></h1>;
  if (Math.abs(normalizedPlayer1Combo - normalizedPlayer2Combo) < 0.1) {
    comboSkill = <h1><strong>{realName1}</strong> e <strong>{realName2}</strong> têm características <strong>{type}</strong> equilibradas</h1>
  } else if (normalizedPlayer1Combo > normalizedPlayer2Combo + 0.3) {
    comboSkill = <h1><strong>{realName1}</strong> tem características <strong>{type}</strong> muito melhores</h1>
  } else if (normalizedPlayer2Combo > normalizedPlayer1Combo + 0.3) {
    comboSkill = <h1><strong>{realName2}</strong> tem características <strong>{type}</strong> muito melhores</h1>
  } else if (normalizedPlayer1Combo > normalizedPlayer2Combo) {
    comboSkill = <h1><strong>{realName1}</strong> tem características <strong>{type}</strong> melhores</h1>
  } else if (normalizedPlayer2Combo > normalizedPlayer1Combo) {
    comboSkill = <h1><strong>{realName2}</strong> tem características <strong>{type}</strong> melhores</h1>
  }
  return comboSkill;
}

const calculatePlayerAtk = (player: Player): number => {
  const weights = {
    shooting: 2,
    pace: 1.7,
    dribbling: 1.5,
    physicality: 1.2
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
    passing: 2.5,
    dribbling: 1.7,
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
    dribbling: 1.2,
    pace: 1,
    defending: 1.8,
    physicality: 1.5
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
    defending: 2,
    physicality: 1.7
  }

  return (
    player.defending * weights.defending +
    player.physicality * weights.physicality
  );
}
