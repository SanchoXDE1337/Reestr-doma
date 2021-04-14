import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './logo.png';
import classes from './Auth.module.css';
import 'antd/dist/antd.css';
import { RootState } from '../../store/store';
import { fetchToken, selectError } from '../../store/reducers/auth/authSlice';

interface IValues {
	username: string;
	password: string;
}

const URL = 'http://test-alpha.reestrdoma.ru/api';

export const Auth: React.FC = () => {
	const dispatch = useDispatch();

	const authError = useSelector(selectError);

	const onSubmit = async (credentials: IValues) => {
		await dispatch(fetchToken(credentials));
	};

	return (
		<>
			{authError && <Alert message={authError} banner closable className={classes.alert} />}
			<div className={classes.wrapper}>
				<img src={logo} alt="logo" className={classes.logo} />
				<Form name="login" className={classes.loginForm} onFinish={onSubmit}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Пожалуйста, введите e-mail!' }]}
					>
						<Input prefix={<UserOutlined />} placeholder="E-mail" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
					>
						<Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className={classes.submitButton}>
							Войти
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};
