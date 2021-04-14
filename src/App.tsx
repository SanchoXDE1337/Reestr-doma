import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Auth, CompanyList } from './pages';
import classes from './App.module.css';
import { selectToken } from './store/reducers';

const URL = 'http://test-alpha.reestrdoma.ru/api';

const App: React.FC = () => {
	const [data, setData] = useState<any | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const token = useSelector(selectToken);

	const fetchData: () => void = useCallback(async () => {
		if (token) {
			setIsLoaded(false);
			try {
				const res = await axios.get(`${URL}/reestrdoma/companies/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setData(res);
				console.log(data);
			} catch (e) {
				console.log(e);
			}
		}
		setIsLoaded(true);
	}, [token]);

	useEffect(() => fetchData(), [fetchData]);

	let content;

	if (!isLoaded && token) {
		content = <Spin size="large" />;
	} else {
		content = data ? <CompanyList data={data} /> : <Auth />;
	}

	return <div className={classes.wrapper}>{content}</div>;
};

export default App;
