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
import { api } from "@/utils/api";
import { useState } from 'react';

export const CardPlayer = () => {
  const { data } = api.player.getByName.useQuery({ name: 'Vinícius José de Oliveira Júnior' });
  const [showImage, setShowImage] = useState(false);

  if (!data) {
    return
  }

  const handleSearch = () => {
    setShowImage(!showImage);
  };

  const player = data[0]
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Click to show the best player</CardTitle>
          <CardDescription>Find out a player card</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="grid w-full items-center" onClick={handleSearch}>Search</Button>
        </CardFooter>
        <div className={`p-3 flex justify-center items-center ${showImage ? '' : 'hidden'}`}>
          <img src={player?.shieldUrl} alt="Imagem" width={200} height={100} />
        </div>
      </Card>
    </div>
  );
}

export default CardPlayer;
