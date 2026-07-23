import { useState , useEffect } from "react";


export function useDebounce(value , delay=500){
    const [debounceValue , setDebounceValue]=useState(value)

    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebounceValue(value)
        },delay)
        return ()=>{
            clearInterval(handler)
        }
    },[value , delay])

    return debounceValue;

}