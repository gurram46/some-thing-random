import { useEffect, useState } from "react";
import { HealthResponseSchema, type HealthResponse } from "@reader/shared";

type ApiStatus =
  | { state: "checking" }
  | { state: "connected"; health: HealthResponse }
  | { state: "unavailable" };

function useApiHealth(): ApiStatus {
  const [status, setStatus] = useState<ApiStatus>({ state: "checking" });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/health")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return HealthResponseSchema.parse(await res.json());
      })
      .then((health) => {
        if (!cancelled) setStatus({ state: "connected", health });
      })
      .catch(() => {
        if (!cancelled) setStatus({ state: "unavailable" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}

export default function App() {
  const status = useApiHealth();

  return (
    <main>
      <h1>Private Reader</h1>
      <p>Admin Console</p>
      <p role="status" data-state={status.state}>
        {status.state === "checking" && "Checking API…"}
        {status.state === "connected" &&
          `API connected (v${status.health.version})`}
        {status.state === "unavailable" && "API unavailable"}
      </p>
    </main>
  );
}
