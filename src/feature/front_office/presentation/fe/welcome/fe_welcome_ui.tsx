import Image from "next/image";
import { useWelcomeLogic } from "./fe_welcome_logic";

export default function FeWelcomeUI() {
  const { content } = useWelcomeLogic();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Image src={content.illustration} alt="auth illustration" width={300} height={300} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          marginTop: 100,
        }}
      >
        <Image
          src={content.logo}
          style={{ width: 50, height: 50 }}
          width={50}
          height={50}
          alt="logo"
        />
        <h3>{content.greeting}</h3>
      </div>
    </div>
  );
}
