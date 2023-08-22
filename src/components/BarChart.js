import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from './DatePicker';

const BarChart = () => {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: 'Выручка',
				data: [],
				backgroundColor: 'rgb(141,28,212)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	});
	const handleDateRangeChange = async (selectedRange) => {
		const start = selectedRange.startDate.toISOString().split('T')[0];
		const stop = selectedRange.endDate.toISOString().split('T')[0];

		try {
			const response = await axios.get(
				`http://shelter.bmsys.net:58600/api/dashboard/cash/?format=json&start=${start}&stop=${stop}`,
				{
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
					},
				}
			);

			const data = response.data;
			const resultArray = data.result;
			const labels = resultArray.map((item) => new Date(item.date).toLocaleDateString());
			const values = resultArray.map((item) => item.sum);

			setChartData((prevChartData) => ({
				...prevChartData,
				labels,
				datasets: [
					{
						...prevChartData.datasets[0],
						data: values,
					},
				],
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<div>
			<DatePicker onDateRangeChange={handleDateRangeChange} />
			<div style={{ backgroundColor: '#0d0402', padding: '40px', borderRadius: '20px', color: 'white', marginTop: '20px' }}>
				<Bar
					data={chartData}
					height={450}
					width={600}
					options={{
						maintainAspectRatio: false,
						scales: {
							x: {
								type: 'time',
								time: {
									unit: 'day',
								}, ticks: {
									color: 'white',
									fontSize: '20px',
									font: {
										weight: 'bold',
									},
								},
							},
							y: {
								beginAtZero: true,
								color: 'white',
								font: {
									weight: 'bold'
								}
							},
						},
						legend: {
							labels: {
								fontSize: 30,
							},
						},
					}}
				/>
			</div>
		</div>
	);

};

export default BarChart;
