const isEmpty = (input: any) => {
  return input == null || (input && Object.keys(input).length === 0);
};

const getErrorMessage = (name: string, errors: any) => {
  let errorMessage = '';
  let hasError = false;
  if (!isEmpty(errors) && Object.keys(errors).length > 0) {
    const errorKey = Object.keys(errors);
    hasError = errorKey.indexOf(name) > -1;
    errorMessage = hasError ? errors[name]?.message ?? '' : '';
  }
  return {hasError, errorMessage};
};

const getErrorMessages = (fields: string[], errors: any) => {
  const errorArray = fields.reduce<string[]>((acc, f) => {
    const { hasError, errorMessage } = getErrorMessage(f, errors);
    if (hasError) {
      acc.push(errorMessage);
    }
    return acc;
  }, []);
  const formHasError = errorArray.length > 0;
  const formErrorMessages = errorArray.length === 0 ? '' : errorArray[0];
  return {formHasError, formErrorMessages};
};

export {isEmpty, getErrorMessage, getErrorMessages};
  