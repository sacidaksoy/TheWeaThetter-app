import {
  Sheet as SheetContainer,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetProps {
  open: boolean;
  triggerElement?: React.ReactNode;
  title: string;
  description?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  onOpenChange: (state: boolean) => void;
}

export default function Sheet({
  open,
  triggerElement,
  title,
  description,
  content,
  actions,
  onOpenChange,
  ...rest
}: SheetProps) {
  return (
    <SheetContainer open={open} onOpenChange={onOpenChange} {...rest}>
      <SheetTrigger asChild>{triggerElement}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
        <SheetFooter>
          <SheetClose asChild>{actions}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </SheetContainer>
  );
}
