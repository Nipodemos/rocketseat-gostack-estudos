import type { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(errors: ValidationError): Errors {
  const formattedErrors: Errors = {};

  errors.inner.forEach((error) => {
    if (error.path) {
      formattedErrors[error.path] = error.message;
    }
  });

  return formattedErrors;
}
