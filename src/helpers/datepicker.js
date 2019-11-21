// @flow

import {
  getDaysInMonth,
  getWeeksInMonth,
  startOfMonth,
  addDays,
  startOfWeek,
  addWeeks
} from "date-fns";
import { WeekDays as _WeekDays } from "./datepicker.constants";

export default class DatePickerHelper {
  _currentMonth: number = new Date().getMonth();
  _daysInMonth: number = getDaysInMonth(this._currentMonth);
  _weeksInMonth: number = getWeeksInMonth(this._currentMonth);
  _firstWeekdayInMonth: number = startOfMonth(new Date()).getDay();
  static WeekDays: Array<string> = _WeekDays;

  get currentMonth(): number {
    return this._currentMonth;
  }

  get daysInMonth(): number {
    return this._daysInMonth;
  }

  get weeksInMonth(): number {
    return this._weeksInMonth;
  }

  get firstWeekdayInMonth(): number {
    return this._firstWeekdayInMonth;
  }

  getCalendarMonth(date: Date) {
    const _startOfMonth = startOfMonth(date);
    const _firstWeek = startOfWeek(_startOfMonth);
    const weeksInMonth = [...Array(this._weeksInMonth)].map<Date[]>(
      (_, weekIndex: number) =>
        [...Array(_WeekDays.length)].map((_, dayIndex: number) =>
          addWeeks(addDays(_firstWeek, dayIndex), weekIndex)
        )
    );

    return weeksInMonth;
  }
}
