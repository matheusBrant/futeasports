import { Menu } from "@/components/Menu";

interface DynamicLinkProps {
  path: string;
  children: React.ReactNode;
}

export const SideMenu = ({ path, children }: DynamicLinkProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-48 z-50 shadow-md bg-neutral-800">
      <div className="bg-zinc-900	w-48 h-14 p-4 mx-auto text-center">
        <h1 className="text-white">Fut Easports</h1>
      </div>
      <div className="p-4">
        <Menu path={path}>{children}</Menu>
      </div>
      
    </div>
  );
};

export default SideMenu;