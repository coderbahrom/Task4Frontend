import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
function SignUp() {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: any) => {
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
      </form>
      {/* </Card> */}
    </div>
  );
}

export default SignUp;
