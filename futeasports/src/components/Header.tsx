import { UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <>
      <header>
        <div className="flex justify-end items-center pr-6 p-3 bg-green-100">
          <h1 className="mr-4">{user?.firstName} {user?.lastName}</h1><UserButton afterSignOutUrl="/" />
        </div>
      </header>
    </>
  );
};