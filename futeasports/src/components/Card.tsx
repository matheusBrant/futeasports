/* eslint-disable @next/next/no-img-element */
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

export const CardPlayer = () => {
  type Player = RouterOutputs["player"]["getByName"]

  const [value, setValue] = useState('');
  const [data, setData] = useState<Player>();

  const handleClick = async () => {
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
          <Button
            disabled={value.trim() === ''}
            onClick={handleClick}
            className='mt-2 flex-grow w-full text-xl font-bold'>Buscar
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
        <CardTitle className="flex items-center justify-center">
          <span>Rank:</span><span className="ml-1 text-amber-500">{data?.[0]?.rank ?? '?'}</span>
        </CardTitle>
        <div className={`p-3 flex justify-center items-center`}>
          <Image src={data?.[0]?.shieldUrl ?? 'https://i.ibb.co/Kx76Cp4/image.png'} alt="Imagem" width={200} height={100} />
        </div>
      </Card>
    </div>
  )
}

export default CardPlayer
