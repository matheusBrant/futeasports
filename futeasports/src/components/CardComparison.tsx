import { CardPlayer } from "@/components/Card";
import { api } from "@/utils/api";

export const CardComparison = () => {
  const { data: data1 } = api.player.getByName.useQuery({ name: 'Vinícius José de Oliveira Júnior' });
  const { data: data2 } = api.player.getByName.useQuery({ name: 'Haaland' });

  if (!data1) {
    return null
  }

  if (!data2) {
    return null
  }

  const player = data1[0]
  const player2 = data2[0]

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:p-10 flex items-center justify-center">
          <CardPlayer imgLink={player!.shieldUrl} name={player!.commonName ?? player!.name} rank={player!.rank}/>
        </div>
        <div className="md:p-10 flex items-center justify-center">
          <CardPlayer imgLink={player2!.shieldUrl} name={player2!.commonName ?? player2!.name} rank={player2!.rank}/>
        </div>
      </div>
    </div>
  );
};

export default CardComparison;