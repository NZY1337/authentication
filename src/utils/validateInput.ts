import { useState } from "react";

// Define types for better type safety
interface FormValues {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}

interface Errors {
  [key: string]: string; // Key-value mapping for field names and their error messages
}

interface UseValidateInputsProps {
  errors: Errors;
  formValues: FormValues;
}

export function useValidateInputs({ errors, formValues }: UseValidateInputsProps) {
  const [formErrors, setFormErrors] = useState<Errors>(errors);

  const validateInputs = (): boolean => {
    const newErrors: Errors = {}; 
    let isValid = true;

    if (formValues.name !== undefined && formValues.name.trim() === "") {
      console.log('name?')
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (formValues.email !== undefined && !/\S+@\S+\.\S+/.test(formValues?.email)) {
        console.log('email?')
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formValues.password !== undefined && formValues?.password?.length < 6) {
      console.log('password')
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (formValues.repeatPassword !== undefined && formValues.password !== formValues.repeatPassword) {
      console.log('repeatPassword')
      newErrors.repeatPassword = "Passwords do not match.";
      isValid = false;
    }

    setFormErrors(newErrors);

    return isValid;
  };

  return { validateInputs, formErrors, setFormErrors };
}

export default useValidateInputs;
