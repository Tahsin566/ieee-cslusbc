import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { BASE_URL } from "../../constants"
import { useUser } from "../../hooks/useUser"

export const PasswordReset = () => {

    const { user, getUser,loading } = useUser()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const email = searchParams.get("email")

    const [formData, setFormData] = useState({
        email: email,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        getUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        try {

            const response = await fetch(`${BASE_URL}/auth/reset`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            console.log(data)

            if (!data.success) {
                toast.error(data?.message)
                return
            }
            toast.success('Updated successfully')

            setTimeout(() => {
                if (user?.role === "admin") {
                    navigate('/dashboard')
                }
                else {
                    navigate(-1)
                }
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
        <div className='pt-10 px-2'>
            <Link to={`/user?id=${user?.IEEEID}`} className="bg-blue-600 text-white p-3 rounded">
                &larr; Go to Profile
            </Link>
        </div >

        <section className="bg-gray-100 min-h-screen flex justify-center p-6 -z-10">

            <ToastContainer />

            <div className="max-w-lg w-full ">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold mb-2">Reset Password</h1>

                </div>
                <div className="bg-white p-6 text-center  rounded-lg shadow-lg overflow-hidden">

                    <div className="bg-white p-6 rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-2">


                            <div className="text-left">
                                <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter old password"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.oldPassword}
                                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="text-left">
                                <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="text-left">
                                <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#045C99] hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}