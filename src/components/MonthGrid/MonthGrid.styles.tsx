import styled from 'styled-components';

const WeekDayRow = styled.div`
	display: flex;
`;

const WeekDaySlot = styled.div`
	border: 1px black solid;
	min-width: 2rem;
`;

const MonthGridContainer = styled.div`
	display: flex;
	flex-flow: column;
`;

export { WeekDayRow, WeekDaySlot, MonthGridContainer };
