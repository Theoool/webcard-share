
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Dialoglist {
  children: React.ReactNode;
  name: React.ReactNode;
  Description: string;
  title: string;
  ClickSubmit: () => void | Promise<void>; // 更明确的类型定义
}

export default function DialogBox({ children, title, name, Description }: Dialoglist) {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <h1>{name}</h1>
    </DialogTrigger>
    <DialogContent className="max-w-sm sm:max-w-md ">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
     {Description}
        </DialogDescription>
      </DialogHeader>
      <div>
       {children}
      </div>
     
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
