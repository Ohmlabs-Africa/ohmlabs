const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError("Could not reach the OHM Labs API. Check your connection and try again.", 0);
  }

  let payload: ApiResponse<T>;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError("The API returned an unreadable response.", response.status);
  }

  if (!response.ok || !payload.success) {
    throw new ApiError(payload.error || "The request could not be completed.", response.status);
  }

  return payload.data;
}

export function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}
