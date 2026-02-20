import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type VerifyState = "idle" | "loading" | "success" | "error";

const Verify = () => {
  const [state, setState] = useState<VerifyState>("idle");
  const [message, setMessage] = useState("Checking your verification link...");

  const token = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token") || "";
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setState("error");
        setMessage("Missing verification token.");
        return;
      }

      setState("loading");

      try {
        const response = await fetch(`${API_URL}/verify-email?token=${encodeURIComponent(token)}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setState("success");
          setMessage("Email verified! Your message has been sent.");
        } else {
          setState("error");
          setMessage(data.message || "Verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setState("error");
        setMessage("Verification failed. Please try again later.");
      }
    };

    run();
  }, [token]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
          {state === "success" ? "Success" : state === "error" ? "Verification Failed" : "Verifying"}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">{message}</p>
      </div>
    </main>
  );
};

export default Verify;
