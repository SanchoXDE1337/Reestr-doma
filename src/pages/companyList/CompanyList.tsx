import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Table } from 'antd';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store';
import { Paginator } from './Paginator';
import { URL } from '../../constants';
import classes from './CompanyList.module.css';

interface IProps {
	companies: any[];
}

interface IHouseList {
	data: any[];
	pageLimit: number;
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

export const CompanyList: React.FC<IProps> = ({ companies }) => {
	const [houseList, setHouseList] = useState<IHouseList>({
		data: [],
		pageLimit: 1,
	});
	const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
	const [pageNum, setPageNum] = useState(1);

	const token = useSelector(selectToken);

	const fetchData: () => void = useCallback(async () => {
		try {
			const res = await axios.get(
				`${URL}/reestrdoma/company/houses/${selectedId!}/?page=${pageNum}&perPage=${10}`,
				{
					headers: {
						Authorization: `Bearer ${token!}`,
					},
				},
			);
			const rawData = res.data.data;
			const data = rawData.map((item: any) => ({
				...item,
				createdAt: new Date(item.createdAt).toLocaleDateString('ru-RU'),
			}));
			setHouseList({ data, pageLimit: res.data.links.lastPage });
		} catch (e) {
			console.log(e);
		}
	}, [selectedId, pageNum]);

	useEffect(() => {
		if (selectedId) {
			fetchData();
		}
	}, [fetchData]);

	const handleIncrease = () => pageNum < houseList.pageLimit && setPageNum((num) => num + 1);

	const handleDecrease = () => pageNum > 1 && setPageNum((num) => num - 1);

	const handleSelectChange = (id: number) => {
		setPageNum(1);
		setSelectedId(id);
	};

	const { Option } = Select;

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
				<Table rowKey="uid" columns={columns} dataSource={houseList.data} pagination={false} />
				{houseList.data.length ? (
					<Paginator
						currentPage={pageNum}
						pageLimit={houseList.pageLimit}
						decreaseHandler={handleDecrease}
						increaseHandler={handleIncrease}
					/>
				) : null}
			</div>
		</div>
	);
};
