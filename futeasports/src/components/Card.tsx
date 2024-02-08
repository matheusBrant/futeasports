/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

interface DynamicLinkProps {
  imgLink: string;
  name: string;
  rank: number
}

export const CardPlayer = ({ imgLink, name, rank }: DynamicLinkProps) => {
  const [showImage, setShowImage] = useState(false);

  const handleSearch = () => {
    setShowImage(!showImage);
  };

  return (
    <div>
      <Card className="w-[350px] bg-emerald-100 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <span>Rank:</span><span className="ml-1 text-amber-500">{rank}</span>
          </CardTitle>
          <CardDescription className="flex items-center justify-center">Revele a carta</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex items-center justify-center">
                <Label htmlFor="name">{name}</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="grid w-full items-center" onClick={handleSearch}>Revelar</Button>
        </CardFooter>
        <div className={`p-3 flex justify-center items-center ${showImage ? '' : 'hidden'}`}>
          <img src={imgLink} alt="Imagem" width={200} height={100} />
        </div>
        <div className={`p-3 flex justify-center items-center ${!showImage ? '' : 'hidden'}`}>
          <img src="https://i.ibb.co/Kx76Cp4/image.png" alt="Imagem" width={220} height={120} />
        </div>
      </Card>
    </div>
  );
}

export default CardPlayer;
