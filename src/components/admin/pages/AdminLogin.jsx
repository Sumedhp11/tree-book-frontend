import { useContext, useState } from "react";
import { AdminLoginAPI } from "../../../apis/treesAPI";
import { useMutation } from "@tanstack/react-query";
import { AdminAuthContext } from "../../layout/AdminAuthProvide";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";



const AdminLogin = () => {
    const { setToken, token } = useContext(AdminAuthContext)
    console.log('token', token)
    const { mutate } = useMutation({
        mutationFn: AdminLoginAPI,
        onSuccess: (data) => {
            setToken(data.token)
            toast.success('Successfully toasted!')
        },
        onError:(error)=>{
            toast.error('Error toasted! '+ error)
        }
    });

    const [formData, setFormData] = useState({ email: '', password: '' })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {

        e.preventDefault();

        mutate({ email: formData.email, password: formData.password })
    };
    const isFormValid = (formData.email || formData.password)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Admin  Login
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                onChange={handleInputChange}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 p-2 block w-full"
                                placeholder="Enter your email "
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                onChange={handleInputChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 p-2  block w-full"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>



                    <div>
                        <Button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
