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
    /**
     * Get the calendar's entire month with all the weeks
     * within, including the previous and next months days
     * that are included in those weeks
     *
     * @param {Date} date
     * @returns {Array<Date[]>}
     */
    getCalendarMonth: (date: Date) => Array<Date[]>,
    /**
     * Get the current month name. i.e. December
     *
     * @returns {string}
     */
    getCurrentMonthName: () => string,
    /**
     * @description Advances the calendar a month
     */
    addMonth: () => void,
    /**
     * @description Goes back the calendar a month
     */
    subMonth: () => void,
    /**
     * Check if the date is in the same
     * day that the calendar's current date
     *
     * @param {Date} date
     * @returns {boolean}
     */
    isCurrentDate: (date: Date) => boolean,
    /**
     * Set the calendar's date
     *
     * @param {Date} date
     */
    setDate: (date: Date) => void,
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

    const addMonth = (): void => {
      const nextMonth: Date = addMonths(currentDate, 1);

      setCalendar(nextMonth);
    };

    const subMonth = (): void => {
      const prevMonth: Date = subMonths(currentDate, 1);

      setCalendar(prevMonth);
    };

    const isCurrentDate = (date: Date): boolean => isSameDay(date, currentDate);

    const setDate = (date: Date): void => setCalendar(date);

    const getCurrentMonthName = (): string => format(currentDate, "MMMM");

    const getCalendarMonth = (date: Date): Array<Date[]> => {
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
