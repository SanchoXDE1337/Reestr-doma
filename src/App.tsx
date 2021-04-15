import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { selectToken } from './store';
import { Auth, CompanyList } from './pages';
import { URL } from './constants';
import classes from './App.module.css';

const App: React.FC = () => {
	const [companies, setCompanies] = useState<any[] | undefined>(undefined);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const token = useSelector(selectToken);

	const fetchCompanies: () => void = useCallback(async () => {
		if (token) {
			setIsLoaded(false);
			try {
				const res = await axios.get(`${URL}/reestrdoma/companies/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setCompanies(res.data?.data);
			} catch (e) {
				console.log(e);
			}
		}
		setIsLoaded(true);
	}, [token]);

	useEffect(() => fetchCompanies(), [fetchCompanies]);

	let content;

	if (!isLoaded && token) {
		content = <Spin size="large" className={classes.spinner} />;
	} else {
		content = companies ? <CompanyList companies={companies} /> : <Auth />;
	}

	return <div className={classes.wrapper}>{content}</div>;
};

export default App;
