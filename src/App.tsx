import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Auth } from './pages';
import classes from './App.module.css';

const URL = 'http://test-alpha.reestrdoma.ru/api';

const App: React.FC = () => {
	const [data, setData] = useState({});
	const [isAuth, setIsAuth] = useState(false);

	const fetchData: () => void = useCallback(async () => {
		const accessToken = Cookies.get('token');
		if (accessToken) {
			try {
				const res = await axios.get(`${URL}/reestrdoma/companies/`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setData(res);
				setIsAuth(true);
				// console.log(data);
			} catch (e) {
				console.log(e);
			}
		}
	}, []);

	useEffect(() => fetchData(), [fetchData]);

	return <div className={classes.wrapper}>{isAuth ? <div>Hello World!</div> : <Auth />}</div>;
};

export default App;
