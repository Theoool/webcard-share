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
    if (bookmark.url) {
      return `<DT><A HREF="${bookmark.url}">${bookmark.title}</A>`;
    } else {
      const childrenHTML = bookmark.children
        ? bookmark.children.map(createBookmarkHTML).join('')
        : '';
      return `<DT><H3>${bookmark.title}</H3><DL><p>${childrenHTML}</DL><p>`;
    }
  };

  const bookmarksHTML = bookmarks.map(createBookmarkHTML).join('');
  return `
    <!DOCTYPE NETSCAPE-Bookmark-file-1>
    <!-- This is an automatically generated file.
         It will be read and overwritten.
         DO NOT EDIT! -->
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <TITLE>Bookmarks</TITLE>
    <H1>Bookmarks</H1>
    <DL><p>${bookmarksHTML}</DL><p>
  `;
}

export function downloadBookmarks(bookmarks: Bookmark[], fileName: string): void {
  const htmlContent = generateBookmarksHTML(bookmarks);
  const blob = new Blob([htmlContent], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
}
