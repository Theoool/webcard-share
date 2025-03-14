import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface Bookmark {
  title: string;
  url?: string;
  children?: Bookmark[];
}

function generateBookmarksHTML(bookmarks: Bookmark[]): string {
  const createBookmarkHTML = (bookmark: Bookmark): string => {
    const currentDate = Math.floor(Date.now() / 1000);  // 当前时间戳（秒）
    
    if (bookmark.url) {
      return `<DT><A HREF="${bookmark.url}" ADD_DATE="${currentDate}">${bookmark.title}</A>\n`;
    } else {
      const childrenHTML = bookmark.children
        ? bookmark.children.map(createBookmarkHTML).join('')
        : '';
      return `<DT><H3 ADD_DATE="${currentDate}" LAST_MODIFIED="${currentDate}">${bookmark.title}</H3>
        <DL><p>
            ${childrenHTML}
        </p></DL>\n`;
    }
  };

  const bookmarksHTML = bookmarks.map(createBookmarkHTML).join('');
  return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DL><p>
        ${bookmarksHTML}
    </p></DL>
</p></DL>`;
}
export function downloadBookmarks(bookmarks: Bookmark[], fileName: string, format: 'html' | 'json' = 'html'): void {
  let content: string;
  let mimeType: string;

  // 根据指定格式生成内容
  if (format === 'html') {
    content = generateBookmarksHTML(bookmarks);
    mimeType = 'text/html';
  } else {
    content = JSON.stringify(bookmarks, null, 2);
    mimeType = 'application/json';
  }

  // 创建并下载文件
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName.endsWith(`.${format}`) ? fileName : `${fileName}.${format}`;
  link.click();
  window.URL.revokeObjectURL(url);
}

// 防抖函数
export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  const debounced = (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(undefined, args), wait);
  };
  debounced.cancel = () => timeout && clearTimeout(timeout);
  return debounced;
}
