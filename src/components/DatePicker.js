import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DatePicker.css';

const DatePicker = ({ onDateRangeChange }) => {
	const [selectedDates, setSelectedDates] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const handleDateRangeChange = (ranges) => {
		setSelectedDates([ranges.selection]);
		if (onDateRangeChange) {
			onDateRangeChange(ranges.selection);
		}
	};

	return (
		<div>
			<DateRangePicker
				ranges={selectedDates}
				onChange={handleDateRangeChange}
			/>
		</div>
	);
};

export default DatePicker;
