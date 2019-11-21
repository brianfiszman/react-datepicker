import React, { useState, ReactNode } from 'react';
import { getDate } from 'date-fns';
import DatePickerHelper from '../../helpers/datepicker';
import {
	WeekDayRow,
	WeekDaySlot,
	MonthGridContainer
} from './MonthGrid.styles';

type Props = {
	date?: Date;
} & typeof defaultProps;

const defaultProps = {
	date: new Date()
};

const MonthGrid = ({ date }: Props) => {
	const [day, setDay] = useState(date);
	const { WeekDays } = DatePickerHelper;

	const helper = new DatePickerHelper();

	const selectedMonth = helper.getCalendarMonth(day);

	return (
		<MonthGridContainer>
			<WeekDayRow>
				{WeekDays.map((day: string) => (
					<WeekDaySlot>{day.charAt(0)}</WeekDaySlot>
				))}
			</WeekDayRow>
			{selectedMonth.map(
				(week: Array<Date>): ReactNode => (
					<WeekDayRow>
						{week.map((day: Date) => (
							<WeekDaySlot>{getDate(day)}</WeekDaySlot>
						))}
					</WeekDayRow>
				)
			)}
		</MonthGridContainer>
	);
};

MonthGrid.defaultProps = defaultProps;

export { MonthGrid, MonthGrid as default };
