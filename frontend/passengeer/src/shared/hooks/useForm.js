import { useState } from 'react';

export const useForm = (initialValues) => {
  const [inputValues, setInputValues] = useState(initialValues);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    })
  };

  return { inputValues, setInputValues, inputHandler }
}