import { useCallback, useEffect, useState } from "react";

// Типизация значений формы
interface FormValues {
  [key: string]: string;
}

// Типизация ошибок формы
interface FormErrors {
  [key: string]: string;
}

// Типизация для хука useForm
export function useForm() {
  const [values, setValues] = useState<FormValues>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

// Типизация для функции валидации
type ValidationFunction = (value: string) => string;

// Типизация для хука useFormWithValidation
export function useFormWithValidation(validationRules: {
  [key: string]: ValidationFunction;
}) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [targetValue, setTargetValue] = useState<HTMLInputElement | null>(null);

  // Функция для валидации
  const validate = (name: string, value: string): string => {
    if (validationRules[name]) {
      const errorMessage = validationRules[name](value);
      return errorMessage || "";
    }
    return "";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          targetValue.closest("form")!.checkValidity(),
      );
    }
  }, [errors, targetValue]);

  const resetForm = useCallback(
    (
      newValues: FormValues = {},
      newErrors: FormErrors = {},
      newIsValid: boolean = false,
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [],
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
