import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { FeLoginRequest } from "@/feature/auth/domain/fe/request/fe_login_request";
import { useLoading } from "@/shared/component/elements/loading_context";
import { useAuthLogic } from "@/shared/logic/auth_logic";

export const useLoginLogic = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoading();
  const authLogic = useAuthLogic();

  const handlerLogin = async (): Promise<void> => {
    if (!username || !password) {
      toast.error("Username dan password tidak boleh kosong");
      return;
    }

    setLoading(true);
    try {
      const result = await authLogic.login(
        new FeLoginRequest(username, password),
      );
      result.fold(
        () => {},
        async () => {
          await router.push("/welcome");
        },
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return { username, setUsername, password, setPassword, handlerLogin };
};
