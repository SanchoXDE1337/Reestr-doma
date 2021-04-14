import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers';
/*import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';*/

const store = configureStore({
	reducer: {
		auth: authReducer,
		/*posts: postsReducer,
		users: usersReducer,*/
		// token: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
