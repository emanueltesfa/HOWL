import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <button type="submit" disabled={submitting} className="butn">
              {submitText}
            </button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 0.5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .butn {
              background: transparent;
              border: none;
              color: #fff7d6;
              font-size: medium;
              transition: 0.3s ease;
              width: 7rem;
            }
            .butn:hover {
              cursor: pointer;
              color: rgba(0, 0, 0, 0.5);
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default Form
