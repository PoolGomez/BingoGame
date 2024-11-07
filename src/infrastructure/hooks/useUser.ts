
import { User } from "@/src/domain/entities/User";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { GetUserInfoUseCase } from "@/src/application/usecases/GetUserInfoUseCase";


export const useUser = ():User | null => {
    const [ user , setUser] = useState<User | null>(null);

    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, async (firebaseUser) =>{
            if(firebaseUser){
                const getUserInfoUseCase = new GetUserInfoUseCase();
                const userInfo = await getUserInfoUseCase.execute();
                setUser(userInfo)
            }else{
                setUser(null)
            }
        })
        //limpieza del observador cuando el componente se desmonta
        return ()=>unsubcribe();
    },[])


    return user;
}