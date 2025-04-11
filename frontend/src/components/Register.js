import React from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'; // Set the base URL for axios requests
function Register() {
    const {register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/auth/register', data);
            if (res.status === 200) {
                alert(res.data.message);
                navigate('/login');
            }
        } catch (err) {
            console.error('Full error:', err); // More detailed error logging
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert('Something went wrong during registration');
            }
        }
    };   
    return (
        <div className="container mt-4">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Register As:</label><br />
                    <input type="radio" value="user" {...register("userType",{required:true})}/> User &nbsp;
                    <input type="radio" value="author" {...register("userType",{required:true})}/> Author
                    {errors.userType && <p className="text-danger">Please select a user type</p>}
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Username" {...register("username",{required:true})} className="form-control"/>
                    {errors.username && <p className="text-danger">Username is required</p>}
                </div>
                <div className="mb-3">
                    <input type="password" placeholder="Password" {...register("password",{required:true})} className="form-control"/>
                    {errors.password && <p className="text-danger">Password is required</p>}
                </div>
                <div className="mb-3">
                    <input type="email" placeholder="Email" {...register("email",{required:true})} className="form-control"/>
                    {errors.email && <p className="text-danger">Email is required</p>}
                </div>
                <button type="submit" className='btn btn-primary'>Register</button>
            </form>
            <div className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Register
