import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const userloginThunk = createAsyncThunk(
    'userlogin',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post('/auth/login', userData);
            sessionStorage.setItem('token', response.data.token);
            return response.data.payload;
        } catch (error) {
            alert(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const userloginSlice = createSlice({
    name:'user-login-slice',
    initialState:{isPending:false,userinfo:{},isError:false,error:'',loggedin:false},
    reducers:{
        resetstate:(state,action) => {
            state.isPending = false;
            state.isError = false;
            state.error = '';
            state.loggedin = false;
            state.userinfo = {};
        }
    },
    extraReducers:builder=>builder
    .addCase(userloginThunk.pending,(state,action)=>{
        state.isPending = true;
    })
    .addCase(userloginThunk.fulfilled,(state,action)=>{
        state.isPending = false;
        state.isError = false;
        state.error = '';
        state.loggedin = true;
        state.userinfo = action.payload;
    })
    .addCase(userloginThunk.rejected,(state,action)=>{
        state.isPending = false;
        state.isError = true;
        state.error = action.payload;
        state.loggedin = false;
        state.userinfo = {};
    })

});

export default userloginSlice.reducer;
export const {resetstate} = userloginSlice.actions;


