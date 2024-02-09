/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DynamicLinkProps {
  imgLink: string
  name: string
  rank: number
}

export const CardPlayer = ({ imgLink, name, rank }: DynamicLinkProps) => {
  console.log(name, imgLink)

  /* const [form, setForm] = useState({
    name: ' '
  })
  const [player, setPlayer] = useState(null)

  const getInput = (key: string) => {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value
      }))
    }
  }

  const handleSearch = () => {
    api.player.getByName.useQuery({ name: form.name }, {
      refetchOnWindowFocus: false,
      enabled: true,
      onSuccess: (data) => {
        if (data) {
          console.log(data);
        }
      }
    })
  } */

  /* setPlayer(null)
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSearch();
  } */


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
          {/* <form onSubmit={handleSubmit}> 
            <Input
              required
              value={form.name}
              type="text"
              onChange={getInput('name')}
            />
            <Button
              type="submit"
              className='flex-grow text-xl font-bold'>Submit
            </Button>
            <div className="grid w-full items-center gap-4">
              <div className="flex items-center justify-center">
                {form.name === ' ' ?
                  <Label htmlFor="name">{player}</Label> :
                  <Label htmlFor="name"> </Label>
                }
              </div>
            </div>
          </form> */}
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
        <div className={`p-3 flex justify-center items-center`}>
          <img src="https://i.ibb.co/Kx76Cp4/image.png" alt="Imagem" width={220} height={120} />
        </div>
      </Card>
    </div>
  )
}

export default CardPlayer
