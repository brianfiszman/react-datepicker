// @flow
import React from "react";
import type { Node } from "react";
import { getDate, format } from "date-fns";
import withCalendar from "../withCalendar/withCalendar";
import type { WrappedComponentProps } from "../withCalendar/withCalendar";
import {
  WeekDayRow,
  WeekDaySlot,
  MonthGridContainer,
  CalendarContainer
} from "./MonthGrid.styles";

type Props = {
  date: Date
} & WrappedComponentProps;

/**
 *
 *
 * @param  { Date } date Selected date in the component
 * @returns
 */
const MonthGrid = withCalendar(
  ({
    date = new Date(),
    _weekDays,
    getCalendarMonth,
    addMonth,
    subMonth,
    isCurrentDay,
    setDay,
    calendar: { day, month }
  }: Props) => {
    const selectedMonth = getCalendarMonth(month);

    return (
      <CalendarContainer>
        <button onClick={subMonth}>{"<"}</button>
        <MonthGridContainer>
          {format(month, "MMMM")}
          <WeekDayRow>
            {_weekDays.map((day: string, index: number): Node => (
              <WeekDaySlot key={index}>{day.charAt(0)}</WeekDaySlot>
            ))}
          </WeekDayRow>
          {selectedMonth.map((week: Array<Date>, index: number): Node => (
            <WeekDayRow key={index}>
              {week.map((_day: Date, index: number): Node => (
                <WeekDaySlot
                  onClick={() => setDay(_day)}
                  isSelected={isCurrentDay(_day)}
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
  }
);

export { MonthGrid, MonthGrid as default };
