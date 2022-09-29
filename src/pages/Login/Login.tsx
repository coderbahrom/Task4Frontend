import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { api } from "../../utils/api";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormData = {
  remember: boolean;
  email: string;
  password: string;
};
function Login() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: any) => {
    console.log(data);
    let bodyData = {
      email: data.email,
      password: data.password,
    };

    api
      .post("login", bodyData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        console.log("resss", res);
        if (res.data.user.status) {
          navigate("/login");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLogged(true);
      });
    // reset();
  };
  return (
    <div
      className="flex justify-center "
      style={{ height: "90vh", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "400px" }}>
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
            <h1 className="text-2xl"> Login In</h1>
          </div>
          {isLogged && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">Email or password not found!</Alert>
            </Stack>
          )}
          <div className="flex flex-col gap-y-4">
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
              id="outlined-basic"
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col">
            <FormControlLabel
              control={<Checkbox {...register("remember")} color="primary" />}
              label="Remember me"
            />
            <div className="flex ">
              <p className="text-neutral-500	">Don't have an account?</p>{" "}
              <h2 className="underline text-indigo-700 px-2 cursor-pointer">
                <Link to="/signup">Sign up</Link>
              </h2>
            </div>
          </div>
          <Button type="submit" variant="contained">
            Login In
          </Button>
        </div>
      </form>
      {/* </Card> */}
    </div>
  );
}

export default Login;
