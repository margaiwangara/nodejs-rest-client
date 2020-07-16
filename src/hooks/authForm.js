import { useState } from 'react';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
};

function useAuthForm(page) {
  const [value, setValue] = useState(INITIAL_STATE);
  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return {
    handleChange,
    handleSubmit,
    value,
  };
}

export default useAuthForm;
