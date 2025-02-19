
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

export default function DialogBox({ children, title, ClickSubmit, name, Description }: Dialoglist) {


  return (
    <Dialog>
    <DialogTrigger asChild>
     <Share2></Share2>
    </DialogTrigger>
    <DialogContent className="max-w-sm sm:max-w-md ">
      <DialogHeader>
        <DialogTitle>分享合集</DialogTitle>
        <DialogDescription>
       选择你喜欢的分享方式
        </DialogDescription>
      </DialogHeader>
      <div>
        默哀判断奇偶拉萨就可怕了  
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
