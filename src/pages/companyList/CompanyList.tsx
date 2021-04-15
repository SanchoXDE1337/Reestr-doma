import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { Select, Table, Tag, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import classes from './CompanyList.module.css';
import { selectToken } from '../../store/reducers';

interface IProps {
	companies: any[];
}

const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
	},
	{
		title: 'Количество квартир',
		dataIndex: 'reestrFlatCount',
	},
	{
		title: 'Дата добавления',
		dataIndex: 'createdAt',
	},
];

const URL = 'http://test-alpha.reestrdoma.ru/api';

export const CompanyList: React.FC<IProps> = ({ companies }) => {
	const [houseList, setHouseList] = useState<{ data: any[]; pageLimit: number }>({
		data: [],
		pageLimit: 1,
	});
	const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
	const [pageNum, setPageNum] = useState(1);

	const token = useSelector(selectToken)!;

	const { Option } = Select;

	const fetchData: () => void = useCallback(async () => {
		try {
			console.log('fetch id', selectedId);
			const res = await axios.get(
				`${URL}/reestrdoma/company/houses/${selectedId!}/?page=${pageNum}&perPage=${8}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			console.log(res.data.data);
			setHouseList({ data: res.data.data, pageLimit: res.data.links.lastPage });
		} catch (e) {
			console.log(e);
		}
	}, [selectedId, pageNum]);

	useEffect(() => {
		if (selectedId) {
			fetchData();
			console.log(houseList);
		}
	}, [fetchData]);

	const handleIncrease = () => pageNum < houseList.pageLimit && setPageNum((num) => num + 1);

	const handleDecrease = () => pageNum > 1 && setPageNum((num) => num - 1);

	const handleSelectChange = (id: number) => {
		setPageNum(1);
		setSelectedId(id);
	};

	return (
		<div className={classes.wrapper}>
			<Select
				placeholder="Выберите компанию"
				className={classes.select}
				onChange={handleSelectChange}
			>
				{companies.map((company) => (
					<Option key={company.id} value={company.id}>
						{company.name}
					</Option>
				))}
			</Select>
			<div className={classes.tableContainer}>
				<Table
					rowKey="uid"
					columns={columns}
					dataSource={houseList.data}
					size="middle"
					pagination={false}
				/>
				{houseList.data.length ? (
					<div>
						<Button
							type="text"
							icon={<LeftOutlined />}
							onClick={handleDecrease}
							disabled={pageNum === 1}
						/>
						<Tag color="geekblue" className={classes.counter}>
							{pageNum}
						</Tag>
						<Button
							type="text"
							icon={<RightOutlined />}
							onClick={handleIncrease}
							disabled={pageNum === houseList.pageLimit}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
};
