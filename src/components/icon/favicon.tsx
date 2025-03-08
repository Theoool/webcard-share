import { Favicon } from 'favicon-stealer';

export default function FaviconMode({url}:{url:string}){

  return <Favicon url={url} size={30} />
}
