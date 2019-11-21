// @flow
import React, { useState } from "react";
import type { ComponentType } from "react";
import {
  getWeeksInMonth,
  startOfMonth,
  addDays,
  startOfWeek,
  addWeeks,
  addMonths,
  subMonths,
  isSameDay
} from "date-fns";
import { WeekDays } from "./withCalendar.constants";

export type WrappedComponentProps = {
  getCalendarMonth: Function,
  addMonth: Function,
  subMonth: Function,
  isCurrentDay: Function,
  setDay: Function,
  calendar: { day: Date, month: Date },
  _weekDays: Array<string>
};

export default function withCalendar(
  WrappedComponent: ComponentType<WrappedComponentProps & any>
) {
  return function(props: WrappedComponentProps) {
    const _initialDate: Date = new Date();
    const [calendar, setCalendar] = useState({
      day: _initialDate,
      month: _initialDate
    });

    const _weeksInMonth: number = getWeeksInMonth(calendar.month);
    const _weekDays: Array<string> = WeekDays;

    const addMonth = () => {
      const nextMonth = addMonths(calendar.month, 1);

      setCalendar({ day: nextMonth, month: nextMonth });
    };

    const subMonth = () => {
      const prevMonth = subMonths(calendar.month, 1);

      setCalendar({ day: prevMonth, month: prevMonth });
    };

    const isCurrentDay = _day => isSameDay(_day, calendar.day);

    const setDay = day => setCalendar({ day, month: day });

    const getCalendarMonth = (date: Date) => {
      const _startOfMonth = startOfMonth(date);
      const _firstWeek = startOfWeek(_startOfMonth);
      const weeksInMonth = [...Array(_weeksInMonth)].map<Date[]>(
        (_, weekIndex: number) =>
          [...Array(_weekDays.length)].map((_, dayIndex: number) =>
            addWeeks(addDays(_firstWeek, dayIndex), weekIndex)
          )
      );

      return weeksInMonth;
    };

    return (
      <WrappedComponent
        {...{
          getCalendarMonth,
          _weekDays,
          addMonth,
          subMonth,
          isCurrentDay,
          calendar,
          setDay,
          ...props
        }}
      />
    );
  };
}
