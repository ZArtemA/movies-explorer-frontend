import { useState, useCallback } from 'react';

function errorInputText (name, value){

  let errors = {};

  if ((name === 'password' ||  name === 'name' || name === 'email') && !value) {
      errors = 'Вы пропустили это поле.';
    }
  else if ((name === 'password' || name === 'email') && value.length < 6) {
      errors = 'Длина должна быть более 5 символов';
    }
    else if (name === 'name' && value.length < 2) {
      errors = 'Длина должна быть более 2 символов';
    }
    else if (name === 'name' && !/[A-Za-zА-Яа-яЁё0-9\s-]{2,20}$/.test(value)) {
      errors = 'Недопустимые символы';
    }
    else if (name === 'email' && !/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
      errors = 'Введите email';
    } else {errors = '';}
  return errors;
}

export default function FormValidation() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [inputValid, setInputValid] = useState(true);

  function handleChange (e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setData({...data, [name]: value});
    setErrors({...errors, [name]: errorInputText(name, value)});
    if (errorInputText(name, value) !== 0){setInputValid(false)}
    setIsValid(target.closest('form').checkValidity());
    console.log(inputValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newInputValid = true) => {
      setData(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setInputValid(newInputValid);
    },
    [setData, setErrors, setIsValid, setInputValid]
  );


  return { data, handleChange, errors, isValid, resetForm, inputValid };
}