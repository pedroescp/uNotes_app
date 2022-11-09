import { useFormik } from "formik";
import { Component, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ForgotPassword from "../pages/forgotPassword";

export function PasswordComponent() {
  

  const formik = useFormik({
    initialValues: {
      usuario: "",
    },
    validationSchema: Yup.object({
      usuario: Yup.string()
        .min(5, "O usuário deve ter no mínimo 5 caracteres.")
        .max(50, "O usuário deve ter no máximo 50 caracteres.")
        .required("Usuário não informado."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="form-control w-full max-w-xl"
    >
      <label htmlFor="usuario" className="label">
        <span className="label-text">Usuário / E-mail</span>
      </label>
      <input
        id="usuario"
        name="usuario"
        type="text"
        className="input input-bordered w-full max-w-xl"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.usuario}
      />
      {formik.touched.usuario && formik.errors.usuario ? (
        <label className="label py-0 pr-0 my-2">
          <span className="label-text-alt text-error">
            {formik.errors.usuario}
          </span>
        </label>
      ) : null}

      <div className="flex flex-col items-center mt-4">
        <button type="submit" className="btn btn-primary btn-wide">
          Enviar OTP
        </button>
      </div>
    </form>
  );
}
