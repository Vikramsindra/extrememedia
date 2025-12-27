import { useState, useRef, useEffect } from "react";

export default function useAutoClearMessage(defaultTime = 5000) {
  const [msg, setMsg] = useState("");
  const timerRef = useRef(null);

  const showMsg = (message, time = defaultTime) => {
    setMsg(message);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setMsg("");
    }, time);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { msg, showMsg };
}
