"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "~/trpc/server";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export const useCreateUser = () => {
  const createUserRequest = async (
    user: CreateUserRequest,
  ): Promise<string> => {
    const response = await api.auth.signup(user);
    console.log(response);
    return response;
  };

  const {
    mutate: createUser,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createUserRequest);

  return { createUser, isLoading };
};
