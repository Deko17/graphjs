import React from 'react'

import BarChart from './components/BarChart'
import './App.css'

const App = () => {
	return (
		<div>
			<h1 style={{ color: 'white', textAlign: 'center' }}>Выручка Shelter за год</h1>
			<BarChart />
		</div >
	)
}

export default App
