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
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (formValues.email !== undefined && !/\S+@\S+\.\S+/.test(formValues?.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formValues.password !== undefined && formValues?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    // how to check if value has one letter uppercase 
    if (formValues.password !== undefined && !/[A-Z]/.test(formValues.password)) {
        // newErrors.password = "Password must contain at least one uppercase letter.";
        // isValid = false;
        console.log('password should have one uppercase')
    }    
    
    

    if (formValues.password ) {
        alert('uppercase')
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
