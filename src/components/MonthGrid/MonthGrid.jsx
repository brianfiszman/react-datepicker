// @flow
import React, { useState } from "react";
import type { Node } from "react";
import { getDate } from "date-fns";
import DatePickerHelper from "../../helpers/datepicker";
import {
  WeekDayRow,
  WeekDaySlot,
  MonthGridContainer
} from "./MonthGrid.styles";

const defaultProps = {
  date: new Date()
};

type Props = {
  date: Date
} & typeof defaultProps;

/**
 *
 *
 * @param  { Date } date Selected date in the component
 * @returns
 */
const MonthGrid = ({ date }: Props) => {
  const [day] = useState(date);
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
      {selectedMonth.map((week: Array<Date>): Node => (
        <WeekDayRow>
          {week.map((day: Date) => (
            <WeekDaySlot>{getDate(day)}</WeekDaySlot>
          ))}
        </WeekDayRow>
      ))}
    </MonthGridContainer>
  );
};

MonthGrid.defaultProps = defaultProps;

export { MonthGrid, MonthGrid as default };
