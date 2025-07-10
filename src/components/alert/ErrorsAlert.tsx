import { Alert, AlertTitle } from "@/components/ui/alert"
import { $ZodIssue } from "zod/v4/core";

export default function ErrorsAlert({errors} : {errors : $ZodIssue[]}) {
    return (
        [...errors].reverse().map((err, index)=>{
            return(
                <Alert key={index} 
                    variant="destructive" 
                    className={`absolute right-5 w-fit animate-in fade-in duration-1000`} 
                    style={{ bottom: `${index*8 + 5}vh` }}>
                        <AlertTitle>{err.message}</AlertTitle>
                </Alert>
            )
        })
    );
}