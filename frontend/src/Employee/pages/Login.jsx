import SpinnerMini from "../../Common/Ui/SpinnerMini";
import Toggle from "react-toggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../component/auth/useLogin";
import { useAdminLogin } from "../component/auth/useAdminLogin";
import "./style.css";
import toast from "react-hot-toast";

const Login = () => {
  const [isEmployee, setIsEmployee] = useState(true);
  const { login, isLoading: UserLoginLoading } = useLogin();
  const { adminLogin, isLoading } = useAdminLogin();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  // State for controlled inputs
  const [employeeID, setEmployeeID] = useState("cyril");
  const [password, setPassword] = useState("12345678");
  const [email, setEmail] = useState("cyril123654789cyril@gmail.com");

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleToggle = () => {
    setIsEmployee((prevState) => {
      return !prevState;
    });
  };

  function handelAdminLogin(e) {
    e.preventDefault();
    console.log(email, password);
    if (!employeeID && !password) toast.error("Provide All The Fields");
    adminLogin(
      { adminEmail: email, password },
      {
        onSuccess: () => {
          navigate("/admin");
        },
      }
    );
  }

  function handelEmplyeeLogin(e) {
    e.preventDefault();
    if (!email && !password) toast.error("Provide All The Fields");
    login(
      { empId: employeeID, password: password },
      {
        onSuccess: () => {
          navigate("/employee");
        },
      }
    );
  }

  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div>
        <h1 className="text-4xl md:text-4xl text-center font-bold mb-6">
          {/* Mediversal  */}
          Gurukul
        </h1>
        <div className="w-full justify-center items-center hidden md:flex">
          <div className={`wrapper ${isActive ? "active" : ""}`}>
            <span className="rotate-bg"></span>
            <span className="rotate-bg2"></span>

            {/* Login Form */}
            <div className="form-box login">
              <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
                Login
              </h2>

              {/* {isEmployee && ( */}
              <div
                className="hidden md:flex justify-center items-center pt-5 pb-3 pl-12 title animation"
                style={{ "--i": 0, "--j": 21 }}
              >
                <span
                  className={`mr-4 ${
                    isEmployee ? "text-black" : "text-gray-500"
                  }`}
                >
                  Employee
                </span>
                <Toggle
                  // defaultChecked={false}
                  checked={false}
                  icons={false}
                  onChange={() => {
                    // handleToggle();
                    handleRegisterClick();
                  }}
                />
                <span
                  className={`ml-4 mr-20 ${
                    !isEmployee ? "text-black" : "text-gray-500"
                  }`}
                >
                  Admin
                </span>
              </div>
              {/* )} */}

              <form>
                <div
                  className="input-box animation"
                  style={{ "--i": 1, "--j": 22 }}
                >
                  <input
                    type="text"
                    value={employeeID} // Controlled value
                    disabled={UserLoginLoading}
                    onChange={(e) => setEmployeeID(e.target.value)} // Update state on change
                  />
                  <label>Employee ID</label>
                  <i className="bx bxs-user"></i>
                </div>

                <div
                  className="input-box animation"
                  style={{ "--i": 2, "--j": 23 }}
                >
                  <input
                    type="password"
                    disabled={UserLoginLoading}
                    value={password} // Controlled value
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                  />
                  <label>Password</label>
                  <i className="bx bxs-lock-alt"></i>
                </div>

                <button
                  type="submit"
                  className="btn animation"
                  disabled={UserLoginLoading}
                  style={{ "--i": 3, "--j": 24 }}
                  onClick={handelEmplyeeLogin}
                >
                  {UserLoginLoading ? <SpinnerMini /> : "Login"}
                </button>
              </form>
            </div>

            <div className="info-text login">
              <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
                Welcome Back!
              </h2>

              <p className="animation mt-3 " style={{ "--i": 1, "--j": 21 }}>
                Empowering Hospital Employees with Continuous <br /> Learning .
              </p>
            </div>

            {/* Register Form */}
            <div className="form-box register">
              <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
                Login
              </h2>

              {/* {!isEmployee && ( */}
              <div
                className="hidden md:flex justify-center items-center pt-5 pb-3 title animation"
                style={{ "--i": 17, "--j": 0 }}
              >
                <span
                  className={`mr-4 ${
                    isEmployee ? "text-black" : "text-gray-500"
                  }`}
                >
                  Employee
                </span>
                <Toggle
                  // defaultChecked={true}
                  checked={true}
                  icons={false}
                  onChange={() => {
                    // handleToggle();
                    handleLoginClick();
                  }}
                />
                <span
                  className={`ml-4 ${
                    !isEmployee ? "text-black" : "text-gray-500"
                  }`}
                >
                  Admin
                </span>
              </div>
              {/* )} */}

              <form>
                <div
                  className="input-box animation"
                  style={{ "--i": 19, "--j": 2 }}
                >
                  <input
                    type="email"
                    value={email} // Controlled value
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                  />
                  <label>Email</label>
                  <i className="bx bxs-envelope"></i>
                </div>

                <div
                  className="input-box animation"
                  style={{ "--i": 20, "--j": 3 }}
                >
                  <input
                    type="password"
                    value={password} // Reusing the password state
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                  />
                  <label>Password</label>
                  <i className="bx bxs-lock-alt"></i>
                </div>

                <button
                  type="submit"
                  className="btn animation"
                  disabled={isLoading}
                  style={{ "--i": 21, "--j": 4 }}
                  onClick={handelAdminLogin}
                >
                  {isLoading ? <SpinnerMini /> : "Login"}
                </button>
              </form>
            </div>

            <div className="info-text register">
              <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
                Welcome Back!
              </h2>
              <p className="animation mt-3" style={{ "--i": 18, "--j": 1 }}>
                Empowering Hospital Employees with Continuous <br /> Learning .
              </p>
            </div>
          </div>
        </div>
        <div className="rounded justify-center items-center flex md:hidden">
          <form className="border p-4 m-4 w-full rounded shadow-xl bg-gray-100">
            <h2 className="text-center text-2xl py-3">Login</h2>
            <div className="input-box ">
              <p className="pb-2">Employee Id</p>
              <input
                type="text"
                value={employeeID} // Controlled value
                disabled={UserLoginLoading}
                onChange={(e) => setEmployeeID(e.target.value)} // Update state on change
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box ">
              <p className="pt-4 pb-2">Password</p>
              <input
                type="password"
                value={password} // Reusing the password state
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button
              type="submit"
              className="btn mt-8 mb-4"
              disabled={isLoading}
              onClick={handelEmplyeeLogin}
            >
              {isLoading ? <SpinnerMini /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// const [isRendered, setIsRendered] = useState(false);
// useEffect(() => {
//   setIsRendered(true);
// }, []);

// const getItemStyle = (delay, scale, axis, valve) => ({
//   opacity: isRendered ? 1 : 0,
//   transform: isRendered
//     ? `translate${axis}(0) scale(1)`
//     : `translate${axis}(${valve}) scale(${scale})`,
//   transition: "opacity .5s ease-out,transform .5s ease-out",
//   transitionDelay: isRendered ? `${delay}s` : "0s", // Different delay for each item
// });

// const leftStyle = {
//   opacity: isRendered ? 1 : 0,
//   transform: isRendered
//     ? `translateX(0) scale(1)`
//     : `translateX(-400px) scale(1)`,
//   transition: "opacity 1s ease-out,transform 1s ease-out",
//   transitionDelay: isRendered ? ".7s" : ".7s", // Different delay for each item
// };

// const rightStyle = {
//   opacity: isRendered ? 1 : 0,
//   transform: isRendered
//     ? `translateX(0) scale(1)`
//     : `translateX(400px) scale(1)`,
//   transition: "opacity 1s ease-out,transform 1s ease-out",
//   transitionDelay: isRendered ? ".7s" : ".7s", // Different delay for each item
// };

{
  /* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
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
        <span className={`mr-4 ${isEmployee ? "text-black" : "text-gray-500"}`}>
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
</div>; */
}
