import { createSlice,createAsyncThunk, isPending} from "@reduxjs/toolkit";
import axios from "axios";

export const userlogin = createAsyncThunk('userlogin',async (userData,thunkAPI) => {
    let res;
    res = await axios.post('http://localhost:4000/auth/login',userData)
    if(res.status==200){
        return res.data;
    }
    else{
        return thunkAPI.rejectWithValue(res.data);
    }
});

export const userloginSlice = createSlice({
    name:'user-login-slice',
    initialState:{isPending:false,},
    reducers:{},
    extraReducers:{}
});

export default userloginSlice.reducer;
export const {} = userloginSlice.actions;


