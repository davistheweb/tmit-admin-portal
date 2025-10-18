import { AxiosError } from "axios";
import api from "../api";
import type {
  Session,
  SessionFormData,
  PaginatedSessions,
} from "@/lib/validators/SessionFormSchema";

interface ApiErrorResponse {
  message: string;
}

export const sessionService = {
  async createSession(data: SessionFormData): Promise<Session> {
    try {
      const payload = {
        ...data,
        is_active: data.is_active ?? false,
      };
      const response = await api.post<Session>("/api/admin/sessions", payload);
      return response.data;
    } catch (error) {
      throw new Error(this.handleApiError(error, "Failed to create session"));
    }
  },

  async getSessions(): Promise<Session[]> {
    try {
      const response = await api.get<PaginatedSessions>("/api/admin/sessions");
      return response.data.data;
    } catch (error) {
      throw new Error(this.handleApiError(error, "Failed to fetch sessions"));
    }
  },

  async getActiveSessions(): Promise<Session[]> {
    try {
      const response = await api.get<Session[] | Session>(
        "/api/admin/sessions/active/current"
      );
      return Array.isArray(response.data)
        ? response.data
        : [response.data].filter(Boolean);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return []; // Return empty array for 404 instead of throwing
      }
      throw new Error(
        this.handleApiError(error, "Failed to fetch active sessions")
      );
    }
  },

  async getSessionById(id: number): Promise<Session> {
    try {
      const response = await api.get<Session>(`/api/admin/sessions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(this.handleApiError(error, "Failed to fetch session"));
    }
  },

  async updateSession(id: number, data: SessionFormData): Promise<Session> {
    try {
      const payload = {
        ...data,
        is_active: data.is_active ?? false,
      };
      const response = await api.put<Session>(
        `/api/admin/sessions/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(this.handleApiError(error, "Failed to update session"));
    }
  },

  async toggleSessionActive(id: number): Promise<Session> {
    try {
      const response = await api.patch<Session>(
        `/api/admin/sessions/${id}/toggle-active`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        this.handleApiError(error, "Failed to toggle session status")
      );
    }
  },

  async deleteSession(id: number): Promise<void> {
    try {
      await api.delete(`/api/admin/sessions/${id}`);
    } catch (error) {
      throw new Error(this.handleApiError(error, "Failed to delete session"));
    }
  },

  handleApiError(error: unknown, defaultMessage: string): string {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiErrorResponse;
      return apiError?.message || defaultMessage;
    }
    return defaultMessage;
  },
};
