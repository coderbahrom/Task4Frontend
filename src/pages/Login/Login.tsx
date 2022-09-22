import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
type FormData = {
  remember: boolean;
  email: string;
  password: string;
};
function Login() {
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
          <FormControlLabel
            control={<Checkbox {...register("remember")} color="primary" />}
            label="Remember me"
          />
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
