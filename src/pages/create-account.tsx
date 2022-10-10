import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import nuberLogo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/common/button";
import { FormError } from "../components/common/form-error";
import { UserRole } from "../types";
import { CreateAccountMutation, CreateAccountMutationVariables } from "./create-account.generated";
import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      error
      ok
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CreateAccount = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const navigate = useNavigate();

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      navigate("/");
    }
  };

  const [
    createAccountMutation,
    { loading: createAccountMutationLoading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!createAccountMutationLoading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          input: { email, password, role },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="nuber_logo" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">Let's get started</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
          <input
            {...register("email", { required: "Email is required" })}
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          {errors.email?.type === "pattern" && <FormError errorMessage={"Please enter a valid email"} />}
          <input
            {...register("password", { required: "Password is required" })}
            required
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <select {...register("role", { required: true })} className="input">
            {Object.values(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={createAccountMutationLoading} actionText={"Create Account"} />
        </form>
        {createAccountMutationResult?.createAccount.error && (
          <FormError errorMessage={createAccountMutationResult.createAccount.error} />
        )}
        <div>
          Already have an account?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
