import styled from "styled-components";

const WeekDayRow = styled.div`
  display: flex;
`;

const WeekDaySlot = styled.div`
  border: 1px black solid;
  min-width: 2rem;
  background-color: ${props => (props.isSelected ? "grey" : "inherit")};
`;

const MonthGridContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const CalendarContainer = styled.div`
  display: flex;
`;

export { WeekDayRow, WeekDaySlot, MonthGridContainer, CalendarContainer };
