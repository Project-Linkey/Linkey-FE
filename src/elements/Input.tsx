import styled from "@emotion/styled/macro";

interface Props {
  type?: string;
  requied?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  value: string | number;
  max?: number;
  name: string;
  onChange: any;
  onKeyUp?: any;
  onFocus?: any;
  onBlur?: any;
}

const Input = ({
  type = "string",
  requied = true,
  placeholder = "텍스트를 입력해주세요",
  readOnly = false,
  value,
  max = 1000,
  name,
  onChange,
  onKeyUp,
  onFocus,
  onBlur,
}: Props) => {
  return (
    <InputWrap
      type={type}
      required={requied}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      maxLength={max}
      name={name}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const InputWrap = styled.input`
  width: 100%;
  height: 49px;
  text-align: left;
  color: #212529;
  outline: none;
  border: 1px solid #eee;
  background: #fbfbfb;
  border-radius: 6px;
  padding: 0 15px;
  margin-bottom: 10px;

  &:focus,
  &:focus-visible {
    border: 2px solid var(--base-color);
    background: white;
  }
`;

export default Input;
