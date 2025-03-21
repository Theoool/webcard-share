import { ScrollArea } from "./ui/scroll-area";

interface HtmlPreviewPopupProps {
  htmlContent: string; // 传入的HTML内容
  isOpen: boolean;    // 控制弹窗显示状态
  onClose: () => void; // 关闭弹窗的回调函数
}

export default function HtmlPreviewPopup({ htmlContent, isOpen, onClose }: HtmlPreviewPopupProps) {
  if (!isOpen) return null;

  return (
    <ScrollArea className="h-96">
      <div
      className="fixed inset-0  bg-black bg-opacity-50 z-50 
      flex items-center justify-center transition-opacity
       duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 sm:mx-0 transform transition-all duration-300 ease-in-out scale-95 sm:scale-100"
        onClick={(e) => e.stopPropagation()} // 阻止点击内容关闭弹窗
      >
        {/* 关闭按钮 */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
       
        {/* HTML预览区域 */}
        <iframe
          className="w-full h-[30rem] rounded-md border-none rounded-b-lg"
          srcDoc={htmlContent}
          title="HTML Preview"
        />
         
      </div>
    </div>
    </ScrollArea>
  );
}
