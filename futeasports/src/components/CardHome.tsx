import { api, type RouterOutputs } from "@/utils/api";
import Image from "next/image";
import { Loading } from "./Loading";

type Player = RouterOutputs["player"]["getPlayers"][number]

export const CardPlayerHome = () => {

  // const [selectedPlayerImageUrl, setSelectedPlayerImageUrl] = useState<string | null>(null)

  const { data } = api.player.getPlayers.useQuery()

  if (!data) {
    return (
      <div className="md:p-32 flex justify-center items-center">
        <div>
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="md:p-24 sm:p-8 flex justify-center items-center">
      <div className="grid grid-cols-6 gap-5">
        {data.map((player: Player, index) => (
          <div key={index}>
            <Image src={player.shieldUrl} alt={`Imagem ${index + 1}`} width={140} height={95} />
          </div>
        ))}
      </div>
    </div>
  );
};