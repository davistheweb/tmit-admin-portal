import { AxiosError } from "axios";
import api from "../api";
import type {
  FeeStructure,
  FeeStructureFormData,
  PaginatedFeeStructures,
} from "@/lib/validators/FeeStructureSchema";

interface ApiErrorResponse {
  message: string;
}

export const feeStructureService = {
  async createFeeStructure(data: FeeStructureFormData): Promise<FeeStructure> {
    try {
      const payload = {
        ...data,
        amount: Number(data.amount).toFixed(2),
        installment_first: data.installment_first
          ? Number(data.installment_first).toFixed(2)
          : undefined,
        installment_second: data.installment_second
          ? Number(data.installment_second).toFixed(2)
          : undefined,
      };
      const response = await api.post<FeeStructure>(
        "/api/admin/fee-structures",
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(
        this.handleApiError(error, "Failed to create fee structure")
      );
    }
  },

  async getFeeStructures(params?: {
    department_id?: number;
    session_id?: number;
    level?: number;
    page?: number;
  }): Promise<PaginatedFeeStructures> {
    try {
      const response = await api.get<PaginatedFeeStructures>(
        "/api/admin/fee-structures",
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        this.handleApiError(error, "Failed to fetch fee structures")
      );
    }
  },

  async updateFeeStructure(
    id: number,
    data: FeeStructureFormData
  ): Promise<FeeStructure> {
    try {
      const payload = {
        ...data,
        amount: Number(data.amount).toFixed(2),
        installment_first: data.installment_first
          ? Number(data.installment_first).toFixed(2)
          : undefined,
        installment_second: data.installment_second
          ? Number(data.installment_second).toFixed(2)
          : undefined,
      };
      const response = await api.patch<FeeStructure>(
        `/api/admin/fee-structures/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(
        this.handleApiError(error, "Failed to update fee structure")
      );
    }
  },

  async deleteFeeStructure(id: number): Promise<void> {
    try {
      await api.delete(`/api/admin/fee-structures/${id}`);
    } catch (error) {
      throw new Error(
        this.handleApiError(error, "Failed to delete fee structure")
      );
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
