import React from 'react'
import { useForm } from 'react-hook-form'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {userloginThunk} from'../redux/slices/userlogin'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  let {isPending,userinfo,isError,error,loggedin} = useSelector(state => state.userauthorlogin)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(userloginThunk(data));
  }

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Radio for user type */}
        <div className="mb-3">
          <label className="form-label">Login As:</label><br />
          <input
            type="radio"
            value="user"
            {...register("userType", { required: true })}
          /> User &nbsp;
          <input
            type="radio"
            value="author"
            {...register("userType", { required: true })}
          /> Author
          {errors.userType && <p className="text-danger">Please select a user type</p>}
        </div>

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
            className="form-control"
          />
          {errors.username && <p className="text-danger">Username is required</p>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="form-control"
          />
          {errors.password && <p className="text-danger">Password is required</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
      Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  )
}

export default Login
