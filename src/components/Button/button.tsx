
import { Button } from "../ui/button"


const ButtonD=({
  children, 

  className
}:{
  children: React.ReactNode;
  className? :string
})=>{
  return <Button className={`bg-black  border-[1px] dark:border-primary 
   dark:hover:text-black
  text-white ${className}`}>{children}</Button>
}
export {ButtonD}
