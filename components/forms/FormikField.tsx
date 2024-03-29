import React from "react";
import { Formik } from "formik";

interface FormikFieldProps {
  onSubmit: (values: any, { setSubmitting, setErrors }: any) => void;
  initialValues: any;
  validationSchema?: any;
  children: React.ReactNode;
}

const FormikField: React.FC<FormikFieldProps> = ({
  onSubmit,
  initialValues,
  validationSchema,
  children,
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {() => <>{children}</>}
      </Formik>
    </>
  );
};

export default FormikField;
