import React from 'react';
import { Button, Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classes from './CompanyList.module.css';

interface IProps {
	increaseHandler: () => void;
	decreaseHandler: () => void;
	currentPage: number;
	pageLimit: number;
}

export const Paginator: React.FC<IProps> = ({
	increaseHandler,
	decreaseHandler,
	currentPage,
	pageLimit = 1,
}) => {
	return (
		<div>
			<Button
				type="text"
				icon={<LeftOutlined />}
				onClick={decreaseHandler}
				disabled={currentPage === 1}
			/>
			<Tag color="geekblue" className={classes.counter}>
				{currentPage}
			</Tag>
			<Button
				type="text"
				icon={<RightOutlined />}
				onClick={increaseHandler}
				disabled={currentPage === pageLimit}
			/>
		</div>
	);
};
