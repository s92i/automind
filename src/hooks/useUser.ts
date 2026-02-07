"use client";

import useSWR from "swr";

type User = {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
};

const fetcher = async (url: string): Promise<{ user: User | null }> => {
  const r = await fetch(url, { credentials: "include" });

  if (r.status === 401) {
    return { user: null };
  }

  const json = await r.json();
  return json;
};

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<{ user: User | null }>(
    "/api/auth/me",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
    },
  );

  const user = data?.user ?? null;

  async function refreshUser() {
    await mutate();
  }

  return {
    user,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refreshUser,
  };
}
