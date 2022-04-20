import { debounce } from "@/utils/utils";
import { useState,useRef,useEffect } from "react";

export const useGetElementWH = () =>{
  const [elementWH,setElementWH] = useState({w:0,h:0});
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const fn = debounce(() => {
      if(!(elementRef.current?.clientHeight && elementRef.current?.clientWidth)) return setElementWH({w: 0,h: 0});
      setElementWH({w: elementRef.current?.clientWidth,h: elementRef.current?.clientHeight});
    },300);
    fn();
    window.addEventListener('resize',fn);
    return () =>{
      window.removeEventListener('resize',fn);
    }
  },[]);
  return {elementWH,elementRef};
};