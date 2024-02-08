
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useState, type ChangeEvent, type FormEvent } from 'react';

export const Test = () => {
  const [form, setForm] = useState({
    name: ''
  });

  const updateForm = (key: string) => {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data, isLoading } = api.player.getByName.useQuery({ name: form.name });
      console.log(data, isLoading);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className='ml-[300px] mr-[300px] flex flex-col gap-4 mt-8' onSubmit={handleFormSubmit} >
      <Input
        required
        value={form.name}
        type="text"
        onChange={updateForm('name')}
      />
      <Button
        className='flex-grow text-xl font-bold'
      >
        Submit
      </Button>
    </form>
  );
}


export default Test;