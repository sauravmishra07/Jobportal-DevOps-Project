import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // Added optional chaining here to prevent crashes if the server is fully down
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
        // Added user and navigate to dependency array to prevent React warnings
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className='flex-grow flex items-center justify-center p-4 sm:p-8'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-6'
                >
                    {/* Header Section */}
                    <div className="text-center space-y-2 mb-6">
                        <h1 className='font-bold text-3xl text-gray-900'>Welcome Back</h1>
                        <p className="text-sm text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    {/* Inputs Section */}
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 font-semibold">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className="w-full transition-all focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label className="text-gray-700 font-semibold">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="w-full transition-all focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Radio Group Section */}
                        <div className='pt-2'>
                            <Label className="text-gray-700 font-semibold mb-3 block">Account Type</Label>
                            <RadioGroup className="flex items-center gap-4 my-5">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Submit Button Section */}
                    <div className="pt-4">
                        {loading ? (
                            <Button className="w-full py-6 text-md font-semibold" disabled>
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Logging in...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full py-6 text-md font-semibold transition-transform active:scale-[0.98]"
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Footer Section */}
                    <div className='text-center mt-6'>
                        <span className='text-sm text-gray-600'>
                            Don't have an account?{' '}
                            <Link to="/signup" className='text-blue-600 font-semibold hover:underline transition-all'>
                                Sign up
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login