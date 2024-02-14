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
import { useState } from "react"
import { FaLightbulb } from "react-icons/fa"
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
  if (dataComparison.length !== 2) {
    return null;
  }

  const [player1, player2] = dataComparison;

  if (!player1 || !player2) {
    return null
  }

  const realName1 = player1.commonName ?? player1.name
  const realName2 = player2.commonName ?? player2.name

  const atkCombo: number[] = []
  const workRate = player1.attackingWorkRate > player2.attackingWorkRate ? 1 : player1.attackingWorkRate < player2.attackingWorkRate ? 2 : 0;
  const weakFoot = player1.weakFootAbility > player2.weakFootAbility ? 1 : player1.weakFootAbility < player2.weakFootAbility ? 2 : 0;
  const shootingRate = player1.shooting > player2.shooting ? 1 : player1.shooting < player2.shooting ? 2 : 0;
  const paceRate = player1.pace > player2.pace ? 1 : player1.pace < player2.pace ? 2 : 0;
  const skillRate = player1.skillMoves > player2.skillMoves ? 1 : player1.skillMoves < player2.skillMoves ? 2 : 0;

  atkCombo.push(workRate, weakFoot, shootingRate, paceRate, skillRate);

  const player1Atk = countValues(atkCombo, 1);
  const player2Atk = countValues(atkCombo, 2);
  const equalsAtk = countValues(atkCombo, 0);

  const atkSkill = textComparison(realName1, realName2, player1Atk, player2Atk, equalsAtk, 'ofensivas')

  const midCombo: number[] = []
  const passRate = player1.passing > player2.passing ? 1 : player1.passing < player2.passing ? 2 : 0;
  const dribblingRate = player1.dribbling > player2.dribbling ? 1 : player1.dribbling < player2.dribbling ? 2 : 0;
  const defWorkRate = player1.defensiveWorkRate > player2.defensiveWorkRate ? 1 : player1.defensiveWorkRate < player2.defensiveWorkRate ? 2 : 0;
  const defRate = player1.defending > player2.defending ? 1 : player1.defending < player2.defending ? 2 : 0;

  midCombo.push(passRate, defRate, dribblingRate, defWorkRate, skillRate);

  const player1mid = countValues(midCombo, 1);
  const player2mid = countValues(midCombo, 2);
  const equalsMid = countValues(midCombo, 0);

  console.log(player1mid, player2mid, equalsMid);


  const midSkill = textComparison(realName1, realName2, player1mid, player2mid, equalsMid, 'meio campistas')

  const defCombo: number[] = []
  const phyRate = player1.physicality > player2.physicality ? 1 : player1.physicality < player2.physicality ? 2 : 0;
  const heightRate = player1.height > player2.height ? 1 : player1.height < player2.height ? 2 : 0;
  const weightRate = player1.weight > player2.weight ? 1 : player1.weight < player2.weight ? 2 : 0;

  defCombo.push(phyRate, defRate, defWorkRate, heightRate, weightRate);

  const player1def = countValues(defCombo, 1);
  const player2def = countValues(defCombo, 2);
  const equalsDef = countValues(defCombo, 0);

  const defSkill = textComparison(realName1, realName2, player1def, player2def, equalsDef, 'defensivas')

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button className="bg-emerald-100 shadow-xl"
          variant="outline"><FaLightbulb size={14} className="text-yellow-500 mr-2" />
          {realName1} vs {realName2}</Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-full sm:w-52">
        <div className="flex flex-col">
          <div className="border-b">{atkSkill}</div>
          <div className="border-b">{midSkill}</div>
          <div className="border-b">{defSkill}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const countValues = (array: number[], value: number) => {
  return array.filter(item => item === value).length
}

const textComparison = (realName1: string, realName2: string, player1combo: number, player2combo: number, equalscombo: number, type: string) => {
  let comboSkill = <h1><strong>{realName1}</strong> tem características ofensivas melhores que <strong>{realName2}</strong></h1>;
  if (player1combo === player2combo || equalscombo === 5) {
    comboSkill = <h1><strong>{realName1}</strong> e <strong>{realName2}</strong> têm características <strong>{type}</strong> equilibradas</h1>;
  } else if (player1combo > player2combo + 3) {
    comboSkill = <h1><strong>{realName1}</strong> tem características <strong>{type}</strong> muito melhores que <strong>{realName2}</strong></h1>;
  } else if (player2combo > player1combo + 3) {
    comboSkill = <h1><strong>{realName2}</strong> tem características <strong>{type}</strong> muito melhores que <strong>{realName1}</strong></h1>;
  } else if (player1combo > player2combo) {
    comboSkill = <h1><strong>{realName1}</strong> tem características <strong>{type}</strong> melhores que <strong>{realName2}</strong></h1>;
  } else if (player2combo > player1combo) {
    comboSkill = <h1><strong>{realName2}</strong> tem características <strong>{type}</strong> melhores que <strong>{realName1}</strong></h1>;
  }
  return comboSkill
}