import React from "react";
import OTP from "../components/OTP";
import { PasswordComponent } from "../components/passwordComponent";

export default function ForgotPassword() {
  const [checkedOne, setCheckedOne] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="flex flex-row gap-8">
            <label className="swap swap-flip text-xl">
              <input
                type="checkbox"
                onChange={handleChangeOne}
                defaultChecked
              />
              <h2 className="swap-on">Enviar OTP</h2>
              <h2
                className="swap-off tooltip tooltip-open tooltip-secondary tooltip-top mt-3"
                data-tip="Clique aqui para trocar o email!"
              >
                Digitar o OTP
              </h2>
            </label>
          </div>
          <div className="divider m-0"></div>
          <label className="swap swap-flip">
            <input
              type="checkbox"
              onChange={() => console.log()}
              checked={checkedOne}
            />
            <div className="swap-off cursor-auto flex justify-center items-center disabled">
              <PasswordComponent />
            </div>

            <div className="swap-on cursor-auto flex">
              <OTP />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
