import { CardPlayer } from "@/components/Card";

export const CardComparison = () => {
  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="sm:p-10 md:p-10 flex items-center justify-center">
          <CardPlayer />
        </div>
        <div className="md:p-5 flex items-center justify-center">
          <h1 className="font-mono text-5xl text-lime-100">VS</h1>
        </div>
        <div className="sm:p-10 md:p-10 flex items-center justify-center">
          <CardPlayer />
        </div>
      </div>
    </div>
  );
};

export default CardComparison;