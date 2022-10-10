import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import nuberLogo from "../images/logo.svg";
import { FormError } from "../components/common/form-error";
import { LoginMutation, LoginMutationVariables } from "./login.generated";
import { Button } from "../components/common/button";
import { Helmet } from "react-helmet";
import { LOCALSTORAGE_TOKEN } from "../lib/constants";
import { authTokenVar, isLoggedInVar } from "../apollo";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    if (data.login.ok) {
      const {
        login: { ok, token },
      } = data;
      if (ok && token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        authTokenVar(token);
        isLoggedInVar(true);
      }
    }
  };

  const [loginMutation, { data: loginMutationResult, loading: loginMutationLoading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loginMutationLoading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="nuber_logo" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">Welcome back</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
          <input
            {...register("email", { required: "Email is required" })}
            required
            placeholder="Email"
            type="email"
            className="input"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <input
            {...register("password", { required: "Password is required" })}
            required
            placeholder="Password"
            type="password"
            className="input"
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          <Button canClick={isValid} loading={loginMutationLoading} actionText={"Log in"} />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
