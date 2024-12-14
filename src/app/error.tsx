"use client";

import ErrorPage from "@/components/styled-components/error-page";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage message={error.message} />;
}
