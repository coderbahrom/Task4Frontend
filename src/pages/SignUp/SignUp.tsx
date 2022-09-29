import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { api } from "../../utils/api";
import { useForm } from "react-hook-form";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
function SignUp() {
  const navigate = useNavigate();
  const { reset, register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: any) => {
    let bodyData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    api
      .post("add-user", bodyData)
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
    reset();
  };

  return (
    <div
      className="flex justify-center "
      style={{ height: "90vh", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-y-3 ">
          <div
            className="flex flex-col"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h1 className="text-2xl">Sign up</h1>
          </div>
          <div className="flex flex-row gap-x-3 ">
            <TextField
              {...register("firstName")}
              required
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
            <TextField
              {...register("lastName")}
              required
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <TextField
              {...register("email")}
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              {...register("password")}
              required
              label="Password"
              variant="outlined"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </div>
        <div className="flex mt-3 items-center">
          <p className="text-neutral-500	">Already have an account?</p>{" "}
          <h2 className="underline text-indigo-700 px-2 cursor-pointer">
            <Link to="/login">Log in</Link>
          </h2>
        </div>
      </form>
      {/* </Card> */}
    </div>
  );
}

export default SignUp;
