import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleChange = <T>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: Dispatch<SetStateAction<T>>,
) => {
  const { name, value } = e.target;

  setState(prevstate => ({ ...prevstate, [name]: value }));
};
