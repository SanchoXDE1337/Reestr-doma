import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';

const URL = 'http://test-alpha.reestrdoma.ru/api';

interface ISliceState {
	token?: string;
	status: string;
	error?: string;
}

const initialState: ISliceState = {
	token: Cookies.get('token'),
	status: 'idle', //enum
	error: '',
};

export const fetchToken = createAsyncThunk<
	string,
	{ username: string; password: string },
	{ rejectValue: string }
>('token/fetchToken', async (credentials, thunkAPI) => {
	try {
		const response = await axios.post(`${URL}/login/`, credentials);
		return response.data.data.token.access;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data?.errors?.error[0]);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchToken.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(fetchToken.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.token = payload;
			state.error = '';
			Cookies.set('token', payload);
		});
		builder.addCase(fetchToken.rejected, (state, { payload }) => {
			state.status = 'failed';
			state.error = payload;
		});
	},
});

export const selectToken = (state: RootState) => state.auth.token;

export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
