import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { BASE_URL } from "../../constants"
import { useUser } from "../../hooks/useUser"
import { toast, ToastContainer } from "react-toastify"

export default function ReplayEmail() {

    const { user, getUser } = useUser()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()


    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const email = searchParams.get('email')

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(contact)

        try {
            const response = await fetch(`${BASE_URL}/contact/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            })
            const data = await response.json()

            if (!data.success) {
                toast.error(data.message, { toastId: "contact-error" })
                return;
            }
            toast.success(data.message, { toastId: "contact-success" })
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        setContact({ ...contact, email: email?.trim(), subject: 'Replying to the message' })
    }, [])

    return user?.role === "admin" ? <div className="p-5">
        <Link to={'/dashboard'} className="bg-blue-600 text-white p-3 rounded">
            &larr; Go to Dashboard
        </Link>
            <ToastContainer />
        <div className="text-center font-bold text-2xl mt-3">Email Reply</div>
        <div className="flex flex-col lg:flex-row gap-10 mt-10 max-w-2xl mx-auto">

            {/* Contact Form */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                <form className="text-left space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block font-semibold text-sm">Name</label>
                        <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-semibold text-sm">Email</label>
                        <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block font-semibold text-sm">Subject</label>
                        <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded" value={contact.subject} onChange={(e) => setContact({ ...contact, subject: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="message" className="block font-semibold text-sm">Message</label>
                        <textarea id="message" rows="4" className="w-full p-2 border border-gray-300 rounded resize-none" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} />
                    </div>

                    <button type="submit" className="w-full bg-[#045C99] hover:bg-blue-300 text-white font-medium py-2 px-4 rounded transition">Send Message</button>
                </form>
            </div>
        </div>

    </div> : <div className="min-h-screen"></div>

}