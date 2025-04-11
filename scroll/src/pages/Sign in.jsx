import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/images/scroll.png";
import axios from "axios";
import { toast } from "react-toastify";
const SignIn = () => {
  const [formvalue, setformvalue] = useState({
    email: "",
    password: ""
  });
  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    try {
      console.log("Sign in with:", formvalue);
      const errors = validate(formvalue);
      if (Object.keys(errors).length === 0) {
        console.log(formvalue);
        seterror({});
      } else {
        seterror(errors);
        alert("email or password is invalid");
      }

      // Redirect to home page after successful sign-in
      axios
        // .post("http://localhost:5000/signin", formvalue, {
        .post("https://scroll-80y0.onrender.com/signin", formvalue, {
          withCredentials: true
        })
        .then((res) => {
          console.log(res);
          toast.success("Sign in success");
          sessionStorage.setItem("userid", res.data.data._id);
          sessionStorage.setItem("role", res.data.data.role);
          const role = sessionStorage.getItem("role");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  const validate = (value) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.email) {
      errors.email = "this feild canot be empty";
    } else if (!emailRegex.test(value.email)) {
      errors.email = "enter a valied email";
    }
    if (!value.password) {
      errors.password = "this feild canot be empty";
    } else if (value.password.length < 8) {
      errors.password = "password must contain 8 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformvalue({ ...formvalue, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-gray-800 border border-blue-300 p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign In
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="pb-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-blue-300 placeholder-gray-500 text-blue-300 rounded-t-md rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formvalue.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 rounded-t-md border border-blue-300 placeholder-gray-500 text-blue-300 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formvalue.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-blue-300 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-primary text-blue-300 hover:text-primary-light"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
