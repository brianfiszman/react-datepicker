// @flow
import React from "react";
import type { Node } from "react";
import { getDate } from "date-fns";
import withCalendar from "../withCalendar";
import type { WrappedComponentProps } from "../withCalendar/withCalendar";
import {
  WeekDayRow,
  WeekDaySlot,
  MonthGridContainer,
  CalendarContainer
} from "./MonthGrid.styles";

type Props = WrappedComponentProps;

/**
 *
 *
 * @param  { Props } calendar withCalendar props
 * @returns React.FunctionalComponent
 */
const MonthGrid = withCalendar(({ calendar }: Props) => {
  const {
    getCalendarMonth,
    getCurrentMonthName,
    addMonth,
    subMonth,
    isCurrentDate,
    setDate
  } = calendar;

  const selectedMonth = getCalendarMonth(calendar.currentDate);

  return (
    <CalendarContainer>
      <button onClick={subMonth}>{"<"}</button>
      <MonthGridContainer>
        {getCurrentMonthName()}
        <WeekDayRow>
          {calendar.WeekDays.map((day: string, index: number): Node => (
            <WeekDaySlot key={index}>{day.charAt(0)}</WeekDaySlot>
          ))}
        </WeekDayRow>
        {selectedMonth.map((week: Array<Date>, index: number): Node => (
          <WeekDayRow key={index}>
            {week.map((_day: Date, index: number): Node => (
              <WeekDaySlot
                onClick={() => setDate(_day)}
                isSelected={isCurrentDate(_day)}
                key={index}
              >
                {getDate(_day)}
              </WeekDaySlot>
            ))}
          </WeekDayRow>
        ))}
      </MonthGridContainer>
      <button onClick={addMonth}>{">"}</button>
    </CalendarContainer>
  );
});

export { MonthGrid, MonthGrid as default };
