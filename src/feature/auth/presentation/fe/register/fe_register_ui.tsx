import { useRegisterLogic } from "./fe_register_logic";

const FeRegisterUI = () => {
  const { toLogin } = useRegisterLogic();

  return (
    <div>
      <h1>Register Page</h1>
      <p>
        Sudah punya akun?{" "}
        <button className="text-blue-600" onClick={toLogin}>
          login disini
        </button>
      </p>
    </div>
  );
};

export default FeRegisterUI;
