import {useEffect} from "react";
import {FormState} from "../assets/types/formState";

export default function useUpdateLogger(value: FormState) {
    useEffect(() => {
        console.log(value)
    }, [value])
}
