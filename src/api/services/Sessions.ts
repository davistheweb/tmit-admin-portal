import api from "../api";
import type { Session, SessionFormData } from "@/lib/validators/SessionFormSchema";

export const sessionService = {
  // Create a new session
  async createSession(data: SessionFormData): Promise<Session> {
    const payload = {
      ...data,
      ...(data.is_active && { is_active: data.is_active }),
    };
    const response = await api.post("/api/admin/sessions", payload);
    return response.data;
  },

  // Get all sessions
  async getSessions(): Promise<Session[]> {
    const response = await api.get("/api/admin/sessions");
    return Array.isArray(response.data.data)
      ? response.data.data
      : response.data;
  },

  // Get active sessions
  async getActiveSessions(): Promise<Session[]> {
    const response = await api.get("/api/admin/sessions/active/current");
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    // If single session object, wrap in array
    return response.data ? [response.data] : [];
  },

  // Get session by ID
  async getSessionById(id: number): Promise<Session> {
    const response = await api.get(`/api/admin/sessions/${id}`);
    return response.data;
  },

  // Update session
  async updateSession(id: number, data: SessionFormData): Promise<Session> {
    const payload = {
      ...data,
      ...(data.is_active !== undefined && { is_active: data.is_active }),
    };
    const response = await api.put(`/api/admin/sessions/${id}`, payload);
    return response.data;
  },

  // Toggle session active status
  async toggleSessionActive(id: number): Promise<Session> {
    const response = await api.post(`/api/admin/sessions/${id}/toggle-active`);
    return response.data;
  },

  // Delete session
  async deleteSession(id: number): Promise<void> {
    await api.delete(`/api/admin/sessions/${id}`);
  },
};
