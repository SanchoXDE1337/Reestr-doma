import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './logo.png';
import classes from './Auth.module.css';
import 'antd/dist/antd.css';

interface IValues {
	username: string;
	password: string;
}

const URL = 'http://test-alpha.reestrdoma.ru/api';

export const Auth: React.FC = () => {
	const onSubmit = async ({ username, password }: IValues) => {
		try {
			const accessToken: string = (
				await axios.post(`${URL}/login/`, {
					username,
					password,
				})
			).data.data.token.access;
			Cookies.set('token', accessToken);
			console.log(Cookies.get('token'));
		} catch (e) {
			const error = e.response?.data?.errors?.error[0];
			if (error) {
				alert(error);
			} else {
				alert('Внутренняя ошибка сервера!');
			}
		}
	};

	return (
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
	);
};
