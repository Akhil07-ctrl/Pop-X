import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        company: "",
        isAgency: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = () => {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const existingUser = existingUsers.find(user => user.email === form.email);

        if (existingUser) {
            toast.warning('User already registered with this email! Please login.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            return;
        } else {

            toast.success('Registration successful! Please login.')
            // Save user data to localStorage
            const userData = {
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                name: form.fullName,
                email: form.email,
                phoneNumber: form.phone,
                company: form.company,
                isAgency: form.isAgency,
                password: form.password,
                status: "active",
                role: form.isAgency === "yes" ? "agency" : "individual",
                bio: `Hello! I'm ${form.fullName}. Welcome to my PopX profile!`,
                profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
            };

            // Save to registered users list
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            existingUsers.push(userData);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            // Set as current user
            localStorage.setItem('currentUser', JSON.stringify(userData));

            setTimeout(() => {
                navigate('/login');
            }, 3000)
        }
    };

    const isFormValid =
        form.fullName.trim() !== "" &&
        form.phone.trim() !== "" &&
        form.email.trim() !== "" &&
        form.password.trim() !== "";

    const handleBackToWelcome = () => {
        navigate("/");
    };

    return (
        <>
            <ToastContainer className='absolute top-2.5 right-2.5' />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
                <div className="w-full max-w-sm">
                    <button
                        onClick={handleBackToWelcome}
                        className="text-left text-violet-600 hover:text-violet-700 mb-4"
                    >
                        ← Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 w-[60%]">Create your PopX account</h1>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-violet-600 relative bg-gray-50 px-2 top-3.5 left-2">Full Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-violet-600 relative bg-gray-50 px-2 top-3.5 left-2">Phone number<span className="text-red-500">*</span></label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-violet-600 relative bg-gray-50 px-2 top-3.5 left-2">Email address<span className="text-red-500">*</span></label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-violet-600 relative bg-gray-50 px-2 top-3.5 left-2">Password<span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                        />
                    </div>

                    {/* Company Name (Optional) */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-violet-600 relative bg-gray-50 px-2 top-3.5 left-2">Company name</label>
                        <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                        />
                    </div>

                    {/* Are you an agency? */}
                    <div className="mb-6">
                        <p className="text-sm font-medium  mb-2">Are you an Agency?<span className="text-red-500">*</span></p>
                        <div className="flex space-x-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="isAgency"
                                    value="yes"
                                    checked={form.isAgency === 'yes'}
                                    onChange={handleChange}
                                    className="accent-violet-600"
                                />
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="isAgency"
                                    value="no"
                                    checked={form.isAgency === 'no'}
                                    onChange={handleChange}
                                    className="accent-violet-600"
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`w-full py-3 font-semibold rounded-md transition ${isFormValid ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-gray-300 text-white cursor-not-allowed'
                            }`}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignUp;