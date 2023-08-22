import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarChart = () => {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: 'Выручка',
				data: [],
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	});

	useEffect(() => {
		axios.get('http://shelter.bmsys.net:58600/api/dashboard/cash/?format=api&start=2023-08-10&stop=2023-08-21')
			.then(response => {
				const data = response.data;
				console.log(data);

				const resultArray = data.result;
				const labels = resultArray.map(item => item.date);
				const values = resultArray.map(item => item.sum);

				setChartData(prevChartData => ({
					...prevChartData,
					labels,
					datasets: [
						{
							...prevChartData.datasets[0],
							data: values,
						},
					],
				}));
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}, []);


	return (
		<div>
			<Bar
				data={chartData}
				height={400}
				width={600}
				options={{
					maintainAspectRatio: false,
					scales: {
						x: {
							type: 'time',
							time: {
								unit: 'day',
							},
						},
						y: {
							beginAtZero: true,
						},
					},
					legend: {
						labels: {
							fontSize: 25,
						},
					},
				}}
			/>
		</div>
	);
};

export default BarChart;
