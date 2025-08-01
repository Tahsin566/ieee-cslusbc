import { useState } from "react";
import { BASE_URL } from "../constants";

export const useResearch = () => {


    const [research, setResearch] = useState();

    const [totalPaper,setTotalPaper] = useState()
    const [totalAuthor,setTotalAuthor] = useState()
    const [topcategories,setTopCategories] = useState([])
    const [topAuthor,setTopAuthor] = useState([])
    const [singlepaper, setSinglePaper] = useState();
    const [loading, setLoading] = useState(true);
    const [similarResearch,setSimilarResearch] = useState();



    const getsinglePaper = async(id)=>{
      setLoading(true)
        try{
            const response = await fetch(`${BASE_URL}/research/${id}`,{
                credentials:"include"
            })
            const data = await response.json();
            setSinglePaper(data.research)
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    
    const getSimilarPapers = async () => {
        try {
          const response = await fetch(`${BASE_URL}/research`, {
        
          })
          const data = await response.json()
          if (response.ok) {
            setSimilarResearch(data.research)
          }
        } catch (error) {
          console.log(error)
        }
      }




    const getAllResearches = async () => {
      setLoading(true)
        try {
          const response = await fetch(`${BASE_URL}/research/get-approved-paper`)
          const data = await response.json()
          if (!response.ok) {
            setLoading(false)
            return
          }
          
          setResearch(data.research)
          setTopCategories(data.topcategory)
          setTopAuthor(data.topAuthor)
          setTotalPaper(data?.length)
          setTotalAuthor(data?.totalAuthor)
          setLoading(false)
        
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }

      return {
        research,
        getAllResearches,
        getSimilarPapers,
        getsinglePaper,
        singlepaper,
        similarResearch,
        totalPaper,
        loading,
        totalAuthor,
        topcategories,
        topAuthor,
        setResearch
      }
}