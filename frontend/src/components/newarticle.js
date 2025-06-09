import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from'react-router-dom';
import { useSelector } from 'react-redux';
import { axioswithtoken } from '../axioswithtoken';
import axios from 'axios';

function Newarticle() {
  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm();

  const navigate = useNavigate();
  const {userinfo} = useSelector(state => state.userauthorlogin);
  const onSubmit = (data) => {
    data.articleID=Date.now();
    data.dateofcreation=new Date();
    data.dateoflastupdate=new Date();
    data.username=`${userinfo.username}`;
    data.comments=[];
    data.status=true;
    try{
      let token = sessionStorage.getItem('token')
      const axioswithtoken = axios.create({
          headers: {
            "Authorization": `Bearer ${token}`
          }
      });
      let res = axioswithtoken.post('/authors-api/new-article',data);
      console.log(res);
    }
    catch(err){
      alert(`status`); 
    }
    navigate(`/authorprofile/articlesbyauthor/${userinfo.username}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Add New Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <div className="mb-3">
          <label className="form-label">Article Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && <span className="text-danger">This field is required</span>}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Article Category</label>
          <select
            className="form-select"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Health">Health</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          {errors.category && <span className="text-danger">This field is required</span>}
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label">Article Description</label>
          <textarea
            className="form-control"
            rows="5"
            {...register("content", { required: true })}
          />
          {errors.content && <span className="text-danger">This field is required</span>}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Newarticle;
