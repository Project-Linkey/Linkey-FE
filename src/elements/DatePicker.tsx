import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";

interface BackgroundProps {
  startDate: Date;
}

interface Props extends BackgroundProps {
  setStartDate: Function;
}

const years = range(1960, getYear(new Date()), 1);
const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const ReactDatePicker = ({ startDate, setStartDate }: Props) => {
  const background = (props: BackgroundProps) => css`
    background: ${props.startDate ? "#fff" : "#fbfbfb"};
  `;

  return (
    <Wrap>
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        css={background({ startDate: startDate })}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {"<"}
            </button>
            <div>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
              >
                {years.map((option: number) => (
                  <option key={option} value={option}>
                    {option}년
                  </option>
                ))}
              </select>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {">"}
            </button>
          </div>
        )}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  .react-datepicker-wrapper {
    width: 100%;

    input {
      width: 100%;
      height: 49px;
      margin-bottom: 10px;
      border: 1px solid #eee;
      border-radius: 6px;
      padding: 0 15px;
    }
  }
`;

export default ReactDatePicker;
