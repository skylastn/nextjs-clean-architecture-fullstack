import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FeLoginRequest } from "@/feature/auth/domain/fe/request/fe_login_request";
import { useAuthService } from "@/shared/dependency_injection/global_container";
import {
  Either,
  EitherType,
  left,
  right,
} from "@/shared/utils/utility/either";

interface AuthContextProps {
  isLogin: boolean;
  login: (request: FeLoginRequest) => Promise<Either<string, string>>;
  logout: () => Promise<void>;
}

const AuthLogic = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const service = useAuthService();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(service.isLogin);
  }, [service]);

  const login = useCallback(
    async (request: FeLoginRequest): Promise<Either<string, string>> => {
      try {
        const res = await service.login(request);

        if (res.tag === EitherType.Left) {
          const message = res.left.message ?? "Login gagal";
          toast.error(message);
          return left(message);
        }

        setIsLogin(true);
        toast.success("Berhasil Login!");
        return right("Success");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        toast.error(message);
        return left(message);
      }
    },
    [service],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await service.logout();
      setIsLogin(false);
      toast.success("Berhasil Logout!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [service]);

  const value = useMemo(
    () => ({
      isLogin,
      login,
      logout,
    }),
    [isLogin, login, logout],
  );

  return <AuthLogic.Provider value={value}>{children}</AuthLogic.Provider>;
};

export const useAuthLogic = () => {
  const context = useContext(AuthLogic);
  if (!context) {
    throw new Error("useAuthLogic must be used within AuthProvider");
  }
  return context;
};
