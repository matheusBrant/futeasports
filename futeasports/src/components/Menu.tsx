import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

interface DynamicLinkProps {
  path: string;
  children: React.ReactNode;
}

export const Menu = ({ path, children }: DynamicLinkProps) => {
  if (!path ?? !children) {
    return
  }
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-white">Páginas</AccordionTrigger>
        <AccordionContent>
          <Link className="text-white" href={path}>{children}</Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
