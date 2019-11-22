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
  isSameDay,
  format
} from "date-fns";
import { WeekDays } from "./withCalendar.constants";

export type WrappedComponentProps = {
  calendar: {
    getCalendarMonth: Function,
    getCurrentMonthName: Function,
    addMonth: Function,
    subMonth: Function,
    isCurrentDate: Function,
    setDate: Function,
    currentDate: Date,
    WeekDays: Array<string>
  }
};

function withCalendar(
  WrappedComponent: ComponentType<WrappedComponentProps & any>
) {
  return function(props: WrappedComponentProps) {
    const _initialDate: Date = new Date();
    const [currentDate, setCalendar] = useState(_initialDate);

    const _weeksInMonth: number = getWeeksInMonth(currentDate);

    /**
     * Advances the calendar a month
     */
    const addMonth: Function = (): void => {
      const nextMonth: Date = addMonths(currentDate, 1);

      setCalendar(nextMonth);
    };

    /**
     * Goes back the calendar a month
     */
    const subMonth: Function = (): void => {
      const prevMonth: Date = subMonths(currentDate, 1);

      setCalendar(prevMonth);
    };

    /**
     * Check if the date is in the same
     * day that the calendar's current date
     *
     * @param {Date} date
     * @returns {boolean}
     */
    const isCurrentDate: Function = (date: Date): boolean =>
      isSameDay(date, currentDate);

    /**
     * Set the calendar's date
     *
     * @param {Date} date
     */
    const setDate: Function = (date: Date): void => setCalendar(date);

    /**
     * Get the current month name. i.e. December
     *
     * @returns {string}
     */
    const getCurrentMonthName: Function = (): string =>
      format(currentDate, "MMMM");

    /**
     * Get the calendar's entire month with all the weeks
     * within, including the previous and next months days
     * that are included in those weeks
     *
     * @param {Date} date
     * @returns {Array<Date[]>}
     */
    const getCalendarMonth: Function = (date: Date): Array<Date[]> => {
      const _startOfMonth: Date = startOfMonth(date);
      const _firstWeek: Date = startOfWeek(_startOfMonth);
      const weeksInMonth: Array<Date[]> = [...Array(_weeksInMonth)].map<Date[]>(
        (_, weekIndex: number) =>
          [...Array(WeekDays.length)].map((_, dayIndex: number) =>
            addWeeks(addDays(_firstWeek, dayIndex), weekIndex)
          )
      );

      return weeksInMonth;
    };

    return (
      <WrappedComponent
        calendar={{
          getCalendarMonth,
          getCurrentMonthName,
          addMonth,
          subMonth,
          isCurrentDate,
          currentDate,
          setDate,
          WeekDays
        }}
        {...props}
      />
    );
  };
}

export { withCalendar, withCalendar as default };
