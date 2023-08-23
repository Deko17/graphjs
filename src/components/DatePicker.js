import React, { useState } from 'react';

const DatePicker = ({ onDateRangeChange }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const handleStartDateChange = (event) => {
		setStartDate(new Date(event.target.value));
	};

	const handleEndDateChange = (event) => {
		setEndDate(new Date(event.target.value));
	};

	const handleApplyButtonClick = () => {
		if (onDateRangeChange) {
			const range = {
				startDate,
				endDate,
			};
			onDateRangeChange(range);
		}
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ marginRight: '10px', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '5px' }}>
				<input
					type="date"
					value={startDate.toISOString().split('T')[0]}
					onChange={handleStartDateChange}
					style={{
						backgroundColor: 'transparent',
						border: 'none',
						color: 'white',
						width: '150px',
						padding: '10px',
					}}
				/>
			</div>
			<div style={{ marginRight: '10px', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '5px' }}>
				<input
					type="date"
					value={endDate.toISOString().split('T')[0]}
					onChange={handleEndDateChange}
					style={{
						backgroundColor: 'transparent',
						border: 'none',
						color: 'white',
						width: '150px',
						padding: '10px',
					}}
				/>
			</div>
			<button onClick={handleApplyButtonClick} style={{ padding: '10px 10px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '5px', color: 'white', width: '150px', fontSize: '16px' }}>Применить</button>
		</div>
	);
};

export default DatePicker;
