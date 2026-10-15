import type { Instrumentation } from "next";

// Next forwards these structured server events to the host's runtime logs.
// Never include request paths/queries, headers, bodies, error messages or stacks:
// those can contain private draft/application values.
export const onRequestError: Instrumentation.onRequestError = (
  error,
  _request,
  context,
) => {
  const digest =
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    /^[a-zA-Z0-9_-]{1,80}$/.test(error.digest)
      ? error.digest
      : undefined;
  console.error(
    JSON.stringify({
      event: "seafa.server_error",
      routeType: context.routeType,
      ...(digest ? { digest } : {}),
    }),
  );
};
