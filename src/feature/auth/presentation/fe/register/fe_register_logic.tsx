import { useRouter } from "next/router";

export const useRegisterLogic = () => {
  const router = useRouter();

  const toLogin = async (): Promise<void> => {
    await router.push("/auth/login");
  };

  return { toLogin };
};
