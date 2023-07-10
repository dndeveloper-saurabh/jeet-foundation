import React, {useState} from 'react';
import PhoneInput from "react-phone-input-2";

export default function AppPhoneInput({disabled}) {
  const [phoneNumber, setPhoneNumber] = useState("91 9319825600");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <PhoneInput
      country="in"
      value={phoneNumber}
      isValid={(_, country) => {
        setCountryCode(country?.dialCode);
        return true;
      }}
      onChange={(phone) => {
        setPhoneNumber("+" + phone);
        setPhoneNumberError("");
      }}
      preferredCountries={["us", "ae", "sg", "my", "in"]}
      inputProps={{ autoFocus: true, disabled }}
      inputStyle={{
        cursor: disabled ? 'inherit' : 'default',
        backgroundColor: 'transparent',
      }}
      inputClass={'text-zinc-900 dark:text-white'}
      buttonStyle={{
        cursor: disabled ? 'inherit' : 'default',
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    />
  )
}
