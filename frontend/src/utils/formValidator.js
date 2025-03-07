import { useCallback, useEffect, useState } from "react";

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export function useFormWithValidation(validationRules) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [targetValue, setTargetValue] = useState(null);

  const validate = (name, value) => {
    if (validationRules[name]) {
      const errorMessage = validationRules[name](value);
      return errorMessage || "";
    }
    return "";
  };

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    const error = validate(name, value);
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
    setTargetValue(target);
  };

  useEffect(() => {
    if (targetValue) {
      setIsValid(
        Boolean(Object.values(errors).every((err) => !err)) &&
          targetValue.closest("form").checkValidity(),
      );
    }
  }, [errors, targetValue]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [],
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
