import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { BASE_URL } from "../../constants"
import { useUser } from "../../hooks/useUser"

export const Addlinks = () => {


    const {user,getUser,loading} = useUser()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const email = searchParams.get("email")

    const [formData, setFormData] = useState({
        email: email,
        facebook: '',
        linkedin: ''
    })

    useEffect(()=>{
        getUser()
    },[])

    const handleSubmit = async(e) => {

        e.preventDefault()

        try {

            const response = await fetch(`${BASE_URL}/auth/link`, {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            console.log(data)

            if (!data.success) {
                toast.success(data?.message)
                return
            }
            toast.success('Added successfully')

            setTimeout(() => {
                navigate(-1)
            }, 500);

        } catch (error) {
            toast.error(error?.message)
        }
    }

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }



    return user && <>
        <div className='pt-5 px-2'>
            <Link to={`/user?id=${user?.IEEEID}`} className="bg-blue-600 text-white p-3 rounded">
                &larr; Go to Profile
            </Link>
        </div>

        <section className="bg-gray-100 min-h-screen flex justify-center p-6 -z-10">
            <ToastContainer />

            <div className="max-w-lg w-full ">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold mb-2">Add social links</h1>

                </div>
                <div className="bg-white p-6 text-center  rounded-lg shadow-lg overflow-hidden">

                    <div className="bg-white p-6 rounded-lg">

                        <form onSubmit={handleSubmit} className="space-y-1">

                            <div className="text-left">
                                <label htmlFor="facebook" className="block mb-2 text-gray-700">Facebook link</label>
                                <input
                                    type="url"
                                    id="facebook"
                                    name="facebook"
                                    placeholder="Facebook"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.facebook}
                                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                />
                            </div>

                            <div className="text-left">
                                <label htmlFor="linkedin" className="block mb-2 text-gray-700">Linkedin link</label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="Linkedin"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#045C99] hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}