import { BadRequestException, ValidationError } from '@nestjs/common';

export const validationFactory = (validationErrors: ValidationError[] = []) => {
  const errorObj: any = {};
  validationErrors.forEach((error) => {
    getErrorsObject(errorObj, error);
  });

  return new BadRequestException({ message: errorObj });
};

const getErrorsObject = (errorObj, error) => {
  try {
    errorObj[error.property] = {};

    if (error.children.length == 0 || !errorObj) {
      if (error.constraints) {
        errorObj[error.property].constraints = error.constraints;
      }
    }

    const pass = errorObj[error.property];

    for (const child of error.children) {
      getErrorsObject(pass, child);
    }
  } catch (_error) {
    console.log(_error);
  }
};
