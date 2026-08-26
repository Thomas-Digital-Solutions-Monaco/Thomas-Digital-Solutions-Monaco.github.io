import { useEffect, useState } from "react";
/** True on small / touch-first screens. Drives the mobile "pan, no zoom-out" mode. */
export function useIsMobile(query = "(max-width: 820px)") {
  const [is, setIs] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setIs(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return is;
}
