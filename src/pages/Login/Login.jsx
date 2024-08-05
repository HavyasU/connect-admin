import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSocial } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { Loading, TextInput } from "../../components/elementComponents";
import CustomButton from "../../components/elementComponents/CustomButton";
import { serverCon, ToastMessage } from "../../App";

const Login = ({ admin, setAdmin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    serverCon
      .post("/admin/login", data)
      .then((res) => {
        ToastMessage(res?.data?.message);
        {
          if (res?.data?.success) {
            let data = res?.data;
            setAdmin(data?.token);
            localStorage.setItem("connectadmin", data?.token);
            navigate("/");
          }
          setSubmitting(false);
        }
      })
      .catch((err) => {
        ToastMessage(err?.response?.data?.message);
        setSubmitting(false);
      });
  };
  useEffect(() => {
    let adminToken = localStorage.getItem("connectadmin");
    if (adminToken) {
      window.location.pathname = "/";
    }
  }, []);

  return (
    <>
      <div className=" bg-transparent w-full h-full flex items-center justify-center ">
        <div className="w-full  md:w-2/3 h-fit lg:h-full 2xl:h-5/6 max-xl:h-full py-4 lg:py-0 flex bg-[#1A1919] rounded-xl shadow-xl overflow-hidden ">
          <div className="w-full  lg:w-1/2 m-auto h-full p-10 2xl:px-20 flex flex-col justify-center  gap-1">
            <Link to={"/"} className="flex flex-col gap-0 items-center">
              <div className="w-full flex  gap-2 items-center mb-5">
                <div className="logo p-2 bg-[#065ad8] rounded text-white">
                  <TbSocial />
                </div>
                <span className="text-2xl text-[white] font-bold">Connect</span>
              </div>
            </Link>

            <p className="text-xl  font-semibold">Admin Panel</p>
            <p className="text-ascent-1 text-base font-semibold">Log in...</p>
            <form
              className="py-8 flex flex-col gap-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                name="name"
                placeholder="username"
                label={"username"}
                type="username"
                register={register("username", {
                  required: "username Address is required",
                })}
                styles="w-full rounded-full"
                labelStyle="ml-2"
                error={errors.username ? errors.username.message : ""}
              />
              <TextInput
                name="password"
                placeholder="password"
                label={"Password "}
                type="password"
                register={register("password", {
                  required: "password Address is required",
                })}
                styles="w-full rounded-full"
                labelStyle="ml-2"
                error={errors.password ? errors.password.message : ""}
              />
              <Link
                to={"/reset-password"}
                className="text-sm text-right text-blue font-semibold"
              >
                Forgot Password..?
              </Link>

              {submitting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles={`inline-flex justify-center rounded-md bg-blue-900 px-8 py-3 text-sm font-medium text-white outline-none`}
                  title="Login"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
