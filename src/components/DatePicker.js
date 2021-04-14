import React from 'react'
import Datepicker from 'react-date-picker'

function DatePicker(props) {
	const handleDateChange = (e) => {
		const month = e.toLocaleString('default', { month: 'long' })
		const year = e.getFullYear()
		const monthYear = (month.toLowerCase() + year)
		console.log(monthYear, props.monthList)
		if (monthYear in props.monthList===true) {
			props.setDate(e)
		}
		
	}
	return (
		<div>
			<h3>Select Month</h3>
			<Datepicker value={props.date} onChange={ handleDateChange }/>
		</div>
	)
}

export default DatePicker

