import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

interface DynamicLinkProps {
  path: string;
  menuTitle: string;
  children: React.ReactNode[];
  accLength?: number;
  multiPath?: string[];
  icon?: JSX.Element[]
}

export const SideMenu = ({ path, children, menuTitle, accLength, multiPath, icon }: DynamicLinkProps) => {
  if (!path ?? !children) {
    return
  }
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-white">{menuTitle}</AccordionTrigger>
        {accLength && multiPath ?
          multiPath?.map((path: string, index) => (
            <div key={index}>
              <AccContent icon={icon?.[index] ?? null} path={path} textLink={children[index]} />
            </div>
          )) :
          <div>
            <AccContent icon={icon?.[0] ?? null} path={path} textLink={children[0]} />
          </div>
        }
      </AccordionItem>
    </Accordion>
  )
}

const AccContent = (props: { path: string, textLink: React.ReactNode, icon?: JSX.Element | null }) => {
  return (
    <AccordionContent >
      <div className="flex items-center">
        {props.icon ? props.icon : null}
        <Link className="text-white ml-2" href={props.path}>{props.textLink}</Link>
      </div>
    </AccordionContent >
  )
}
