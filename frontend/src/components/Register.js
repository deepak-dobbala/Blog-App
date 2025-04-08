import React from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
function Register() {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const onSubmit=(data)=>{
        console.log(data)
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Register As:</label><br />
                    <input type="radio" value="user" {...register("userTyper",{required:true})}/> User &nbsp;
                    <input type="radio" value="author" {...register("userTyper",{required:true})}/> Author
                    {errors.userTyper && <p className="text-danger">Please select a user type</p>}
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
