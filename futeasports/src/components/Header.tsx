import { UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <>
      <header>
        <div className="shadow-xl flex justify-end items-center pr-6 p-3 bg-teal-950">
          <div className="bg-teal-800	w-48 h-14 p-4 text-center absolute left-0 top-0">
            <h1 className="text-white">Fut Easports</h1>
          </div>
          <h1 className="mr-4 text-white">{user?.firstName} {user?.lastName}</h1><UserButton afterSignOutUrl="/" />
        </div>
      </header>
    </>
  );
};