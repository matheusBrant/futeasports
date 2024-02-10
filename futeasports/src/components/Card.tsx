import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api, type RouterOutputs } from "@/utils/api";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const CardPlayer = () => {
  type Player = RouterOutputs["player"]["getByName"]

  const [value, setValue] = useState('');
  const [data, setData] = useState<Player>();
  const [selectedPlayerImageUrl, setSelectedPlayerImageUrl] = useState<string | null>(null);
  const [selectedPlayerRank, setSelectedPlayerRank] = useState<number | null>(null);
  const [selectedPlayerSkillMoves, setSelectedPlayerSkillMoves] = useState<number | null>(null);
  const [selectedPlayerWeakFoot, setSelectedPlayerWeakFoot] = useState<number | null>(null);

  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleClick = async () => {
    setPopoverVisible(true)
    const newData = await refetch()
    setData(newData.data);
  };

  if (value === '') {
    setValue('  ')
  }

  const { refetch } = api.player.getByName.useQuery({ name: value }, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  console.log(data);

  if (!refetch) {
    return (<div>..Loading</div>)
  }

  return (
    <div>
      <Card className="w-[350px] bg-emerald-100 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            Digite o nome completo
          </CardTitle>
          <CardDescription className="flex items-center justify-center">Revele a carta</CardDescription>
        </CardHeader>
        <CardContent>
          <Input className="w-full flex"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value.trimLeft())
            }}
          />
          <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={value.trim() === ''}
          onClick={handleClick}
          className='mt-2 flex-grow w-full text-xl font-bold'>Buscar
        </Button>
        </PopoverTrigger>
          <PopoverContent className={`"w-80" ${!popoverVisible ? 'hidden' : ''}`}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Lista</h4>
                <p className="text-sm text-muted-foreground">
                  Selecione o jogador
                </p>
              </div>
              <div className="grid gap-2">
                <div className="">
                <ul>
                  {data?.map(item => (
                    <li style={{ cursor: 'pointer' }} className="border-b-2 flex" key={item.id} onClick={() => {
                      setSelectedPlayerImageUrl(item.shieldUrl);
                      setSelectedPlayerRank(item.rank);
                      setSelectedPlayerSkillMoves(item.skillMoves);
                      setSelectedPlayerWeakFoot(item.weakFootAbility);
                      setPopoverVisible(false); 
                    }}>
                      <p><Image src={item.avatarUrl} alt="Imagem" width={50} height={25} /></p>
                      <p className="italic p-3 text-center">{item.commonName ?? item.name}</p>
                    </li>
                  ))}
                </ul>
                </div>

              </div>
            </div>
          </PopoverContent>
        </Popover>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
          {selectedPlayerRank ? 
             <CardTitle className="flex items-center justify-center">
              <span>Rank:</span><span className="ml-1 text-amber-500">{selectedPlayerRank}</span>
            </CardTitle>
            :
            <CardTitle className="flex items-center justify-center">
              <span>Rank:</span><span className="ml-1 text-amber-500">?</span>
            </CardTitle>
          }
          <div className={`p-3 flex justify-center items-center`}>
            {selectedPlayerImageUrl ? 
              <Image src={selectedPlayerImageUrl} alt="Imagem" width={200} height={100} /> 
              :
              <Image src={'https://i.ibb.co/Kx76Cp4/image.png'} alt="Imagem" width={200} height={100} /> 
            }
          </div>
      </Card>
      <Card className="pt-4 mt-3 w-[350px] bg-emerald-100 shadow-2xl">
        
        <CardContent className="grid grid-cols-2 gap-4 w-full">
          <CardTitle className="italic text-sm flex items-center justify-center ">
            Habilidade
          </CardTitle>
          <div className="flex justify-center items-center rounded border-dashed border border-green-400 p-2">
            {selectedPlayerSkillMoves ? 
              <StarRating rating={selectedPlayerSkillMoves} />
              :
              <h1>?</h1> 
            }
          </div>
          <CardTitle className="italic text-sm flex items-center justify-center">
            Perna ruim
          </CardTitle>
          <div className="flex justify-center items-center rounded border-dashed border border-green-400 p-2">
            {selectedPlayerWeakFoot ? 
              <StarRating rating={selectedPlayerWeakFoot} />
              :
              <h1>?</h1> 
            }
          </div>
         
        </CardContent>
      </Card>

    </div>
  )
}

export default CardPlayer

const StarRating = (props: { rating: number }) => {
  const renderStars = (numStars: number) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
    }
    return stars;
  };

  return (
    <div>
      {renderStars(props.rating)}
    </div>
  );
};
