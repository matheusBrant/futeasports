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
    <Accordion type="single" collapsible className="w-fit">
      <AccordionItem value="item-1">
        <AccordionTrigger>Pages</AccordionTrigger>
        <AccordionContent>
          <Link href={path}>{children}</Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
