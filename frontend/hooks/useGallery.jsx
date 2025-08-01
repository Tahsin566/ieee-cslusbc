import { useState } from "react"
import { BASE_URL } from "../constants"

export const useGallery = () => {

    const [gallery,setGallery] = useState([])
    
    
      const getAllGalleryPhoto = async()=>{
        try {
          const response = await fetch(`${BASE_URL}/gallery/get-gallery`, {
            method: 'GET',
            credentials: 'include'
          })
          const data = await response.json()
          if (!response.ok) {
            return
          }
          setGallery(data.gallery)
        } catch (error) {
          console.log(error)
        }
      }

      const deleteGallery = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/gallery/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!response.ok) {
                navigate('/');
                return
            }
            const filteredGallery = gallery.filter((g)=>g._id !== id)
            setGallery(filteredGallery)
        } catch (error) {
            console.log(error);
        }
    }

      return {
        getAllGalleryPhoto,
        gallery,
        deleteGallery
      }
    
}
