import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

export const useMagazine = () => {


    const [singleMagazine, setSingleMagazine] = useState();
    const [magazineData,setMagazineData] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getSingleMegazine = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/magazine/${id}`, {
                credentials: "include",
            });
            const data = await response.json();
            setLoading(false);
            setSingleMagazine(data?.magazine);
        } catch (error) {
            console.error("Error fetching single magazine:", error);
            setLoading(false);
        }
    };

    const getMagazine = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/magazine/get-magazine`, {
                method: "GET"
            });
            const data = await response.json();
            setLoading(false);
            if(!response.ok){
                setLoading(false);
                navigate('/magazine');
                return
            }
            setMagazineData(data)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return {
        magazineData,
        getMagazine,
        setMagazineData,
        singleMagazine,
        getSingleMegazine,
        loading
    }


}