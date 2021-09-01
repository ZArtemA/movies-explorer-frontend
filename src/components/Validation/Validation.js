import { useState, useCallback } from 'react';

export function FormValidation() {
  const [data, setData] = useState({});//Значения полей
  const [errors, setErrors] = useState({});//Сообщения ошибок и подсветка инпутов
  const [isValid, setIsValid] = useState(false);//Валидность формы

  function handleChange (e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setData({...data, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setData(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setData, setErrors, setIsValid]
  );


  return { data, handleChange, errors, isValid, resetForm };
}