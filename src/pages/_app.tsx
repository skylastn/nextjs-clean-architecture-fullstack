import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import FeDefaultComponent from "@/feature/component/fe_default_component";
import {
  LoadingProvider,
  useLoading,
} from "@/shared/component/elements/loading_context";
import LoadingComponent from "@/shared/component/ui/loading/loading_component";
import { GlobalContainerProvider } from "@/shared/dependency_injection/global_container";
import { AuthProvider } from "@/shared/logic/auth_logic";
import "@/shared/styles/globals.css";

function GlobalLoader() {
  const { loading } = useLoading();
  return loading ? (
    <div className="floating-loader">
      <LoadingComponent />
    </div>
  ) : null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContainerProvider>
      <LoadingProvider>
        <Toaster position="top-right" />
        <GlobalLoader />
        <AuthProvider>
          <FeDefaultComponent>
            <Component {...pageProps} />
          </FeDefaultComponent>
        </AuthProvider>
      </LoadingProvider>
    </GlobalContainerProvider>
  );
}
