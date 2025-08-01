import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const useUser = () => {


    const [user, setUser] = useState()
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(false);
    const [profileloading, setProfileLoading] = useState(true);
    const navigate = useNavigate();


    const getUser = async () => {

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth`, {
                credentials: 'include'
            })

            const data = await response.json();

            if(!data?.success){
                setLoading(false)
                return
            }
            setLoading(false);
            setUser(data?.user)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getUserProfile = async (id) => {
        setProfileLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/${id}`, {
                credentials: 'include'
            })

            const data = await response.json();
            if (!data?.success) {
                setProfileLoading(false);
                return
            }

            setProfileLoading(false);
            setUserProfile(data?.user)

        } catch (error) {
            console.log(error);
            setProfileLoading(false);
        }
    }


    useEffect(() => {
        getUser();
    }, [])

    return { user, getUser,userProfile,getUserProfile,loading,profileloading }


}
