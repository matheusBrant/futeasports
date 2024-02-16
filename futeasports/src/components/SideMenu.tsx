import { Menu } from "@/components/Menu";

export const SideMenu = (props: { path: string, children: React.ReactNode }) => {
  return (
    <div className="absolute left-0 top-47 w-48 z-50 shadow-md bg-teal-950">
      <div className="p-4">
        <Menu path={props.path}>{props.children}</Menu>
      </div>

    </div>
  );
};

export default SideMenu;