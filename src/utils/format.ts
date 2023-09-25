const regNumber = /^[0-9]+$/;
const regPhoneNumber = /^[0-9-]+$/;
const regPhone =
  /^(070|02|031|032|033|041|042|043|051|052|053|054|055|061|062|063|064|010|011|016|017|018|019)(\d{3,4})(\d{4})$/;
const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
// 대소문자 필수 X, 숫자, 특수문자 1개 이상 (필수)
// https://beagle-dev.tistory.com/114
const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

export { regNumber, regPhoneNumber, regPhone, regPassword, regEmail };
