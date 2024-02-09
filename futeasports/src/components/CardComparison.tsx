import { CardPlayer } from "@/components/Card";

export const CardComparison = () => {
  /*  const { data: data1 } = api.player.getByName.useQuery({ name: 'Vinícius José de Oliveira Júnior' });
   if (!data1) {
     return null
   }
   const player = data1[0]

   console.log(player) */

  /*const { data: data2 } = api.player.getByName.useQuery({ name: 'Haaland' });
 
  if (!data1) {
    return null
  }
 
  if (!data2) {
    return null
  }
 
  const player = data1[0]
  const player2 = data2[0]
 */
  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:p-10 flex items-center justify-center">
          <CardPlayer imgLink={''} name={''} rank={2} />
        </div>
        <div className="md:p-10 flex items-center justify-center">
          <CardPlayer imgLink={''} name={''} rank={1} />
        </div>
      </div>
    </div>
  );
};

export default CardComparison;