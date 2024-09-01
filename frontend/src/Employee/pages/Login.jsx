import SpinnerMini from "../../Common/Ui/SpinnerMini";
import FormError from "../../Common/Ui/FormError";

import Toggle from "react-toggle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import "react-toastify/dist/ReactToastify.css";

import { useLogin } from "../component/auth/useLogin";
import { useAdminLogin } from "../component/auth/useAdminLogin";
import TypingEffect from "../Ui/TypingEffect";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isEmployee, setIsEmployee] = useState(true);
  const { login, isLoading: UserLoginLoading } = useLogin();
  const { adminLogin, isLoading } = useAdminLogin();
  const navigate = useNavigate();

  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, []);

  const getItemStyle = (delay, scale, axis, valve) => ({
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? `translate${axis}(0) scale(1)`
      : `translate${axis}(${valve}) scale(${scale})`,
    transition: "opacity .5s ease-out,transform .5s ease-out",
    transitionDelay: isRendered ? `${delay}s` : "0s", // Different delay for each item
  });

  const leftStyle = {
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? `translateX(0) scale(1)`
      : `translateX(-400px) scale(1)`,
    transition: "opacity 1s ease-out,transform 1s ease-out",
    transitionDelay: isRendered ? ".7s" : ".7s", // Different delay for each item
  };

  const rightStyle = {
    opacity: isRendered ? 1 : 0,
    transform: isRendered
      ? `translateX(0) scale(1)`
      : `translateX(400px) scale(1)`,
    transition: "opacity 1s ease-out,transform 1s ease-out",
    transitionDelay: isRendered ? ".7s" : ".7s", // Different delay for each item
  };

  const handleToggle = () => {
    setIsEmployee((prevState) => {
      reset(); // Reset the form when toggling
      return !prevState;
    });
  };

  function onSubmit(data) {
    if (isEmployee) {
      login(
        { empId: data.empId, password: data.password },
        {
          onSuccess: () => {
            navigate("/employee");
          },
        }
      );
    } else {
      adminLogin(
        { adminEmail: data.email, password: data.password },
        {
          onSuccess: () => {
            navigate("/admin");
          },
        }
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-xl md:text-4xl text-center font-bold mb-6">
        <span className="block md:hidden">Mediversal Gurukul</span>
        <TypingEffect />
      </h1>

      <div
        className="bg-gray-100 md:p-8 h-auto  rounded-lg shadow-md  shadow-gray-400 flex w-3/4 md:w-3/4 max-w-4xl"
        style={getItemStyle(0, 0.1, "X", "0px")}
      >
        <div
          className="w-full md:w-1/2 h-auto md:p-6 p-3 bg-white rounded-lg shadow-md shadow-gray-500 flex flex-col justify-center"
          style={getItemStyle(0.5, 2, "X", "-1000px")}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <div className="hidden md:flex justify-center items-center md:mb-4">
            <span
              className={`mr-4 ${isEmployee ? "text-black" : "text-gray-500"}`}
            >
              Employee
            </span>
            <Toggle
              defaultChecked={!isEmployee}
              icons={false}
              onChange={handleToggle}
            />
            <span
              className={`ml-4 ${!isEmployee ? "text-black" : "text-gray-500"}`}
            >
              Admin
            </span>
          </div>
          <hr className="mb-1 md:mb-4" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-1 md:p-4 flex flex-col justify-between h-full"
          >
            <label style={leftStyle} className="font-semibold py-1 md:py-2">
              {!isEmployee ? "Email" : "Employee ID"}
            </label>
            <input
              style={rightStyle}
              name={`${!isEmployee ? "email" : "empId"}`}
              id={`${!isEmployee ? "email" : "empId"}`}
              type="text"
              placeholder={!isEmployee ? "Email" : "Employee Id"}
              className="w-full p-2 mb-1 border border-gray-300 rounded"
              disabled={isLoading || UserLoginLoading}
              {...register(`${!isEmployee ? "email" : "empId"}`, {
                required: "This field is required",
                pattern: !isEmployee
                  ? {
                      value: /\S+@\S+\.\S+/,
                      message: "Email not valid",
                    }
                  : undefined,
              })}
            />
            {errors.email && <FormError error={errors.email.message} />}
            {errors.empId && <FormError error={errors.empId.message} />}
            <label className="font-semibold py-1 md:py-2" style={leftStyle}>
              Password
            </label>
            <input
              style={rightStyle}
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-1 border-gray-300 border rounded"
              disabled={isLoading || UserLoginLoading}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "min 8 characters",
                },
              })}
            />
            {errors.password && <FormError error={errors.password.message} />}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 my-4 rounded w-full"
              disabled={isLoading || UserLoginLoading}
            >
              {isLoading || UserLoginLoading ? <SpinnerMini /> : "Login"}
            </button>
          </form>
        </div>
        <div
          className="hidden md:flex md:w-1/2 p-6 items-center"
          style={{ height: "340px", ...getItemStyle(0.5, 2, "X", "1000px") }}
        >
          <img
            src="/loginImage.webp"
            alt="Reception"
            className="rounded-lg shadow-md mx-auto mt-14 shadow-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
