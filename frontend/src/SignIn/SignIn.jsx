import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { toast, ToastContainer } from 'react-toastify';

const SignIn = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    memberType: 'local',
    password: '',
    IEEEID: '',

  });
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? e.target.id : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      if (!data.success || !response.ok) {
        toast.error(data.message, { toastId: "login-error" })
        setLoading(false);
        return;
      }
      toast.success('Login successful!', { toastId: "login-success" })
      setLoading(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      toast.error('Login failed!', { toastId: "login-error" })
      setLoading(false);
    }

  };




  return (
<>
    <div className='pt-5 px-2'>
    <Link to={'/'} className="bg-blue-600 text-white p-3 rounded">
                            &larr; Go to Home
                        </Link>
    </div>
    <section className="bg-gray-100 h-[90vh] flex mt-[30px] justify-center p-6">
      <ToastContainer />
      <div className="max-w-lg w-full text-start">
        

        <div className="text-center mb-6">

          <h1 className="text-3xl font-semibold mb-2">Welcome</h1>
          <p className="text-gray-600 mb-6">
            Join us and be part of a vibrant community. Sign up now to unlock exclusive content and features!
          </p>
        </div>
        <div className="bg-white p-6  rounded-lg shadow-lg overflow-hidden">


          <div className="bg-white p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">


              <div className="text-left">
                <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded p-2"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="IEEEID" className="block mb-2 text-gray-700">IEEE ID</label>
                <input
                  type="text"
                  id="IEEEID"
                  name="IEEEID"
                  placeholder="IEEE ID"
                  className="w-full border border-gray-300 rounded p-2"
                  value={formData.IEEEID}
                  onChange={(e) => setFormData({ ...formData, IEEEID: e.target.value })}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>


              {!loading ? <button
                type="submit"
                className="w-full bg-[#045C99] hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Log In
              </button>:<button
                disabled={loading}
                className="w-full bg-[#045C99] hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                loading
              </button>}

              <p className="text-center text-sm text-gray-600">
                Create an account{' '}
                <Link to='/signup' className='text-blue-600'>
                  Sign Up
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
                </>
  );
};

export default SignIn;