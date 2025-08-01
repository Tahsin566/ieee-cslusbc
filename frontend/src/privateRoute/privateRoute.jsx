import { Navigate, useNavigate } from "react-router"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants"

export const PrivateRoute = ({children}) => {

    const[user,setUser] = useState();
    const[loading,setLoading] = useState(true);
    const navigate = useNavigate();
    

    const getUser = async()=>{
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth`, {
                credentials: 'include'
            })

            const data = await response.json();

            if(!data?.user){
                setLoading(false)
                navigate('/signin');
            }
            if(!data?.success){
                setLoading(false)
                return
            }
            setLoading(false);
            setUser(data?.user)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(()=>{
        getUser();
    },[])

    if(loading){
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        user ? <div>
            {children}
        </div> : <div className="min-h-screen"></div>
    )
}