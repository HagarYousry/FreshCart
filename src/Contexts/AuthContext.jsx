import { createContext, useState } from "react";


export const AuthContext= createContext(0)

export default function AuthContextProvider({children}){
     const [userToken,setUserToken]=useState(localStorage.getItem("token")??"")
    return <AuthContext.Provider value={{userToken,setUserToken}}>
{children}    
    </AuthContext.Provider>
}






