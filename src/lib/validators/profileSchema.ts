import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.string().min(1),
  country: z.string(),
  stateOfOrigin: z.string(),
  lga: z.string(),
  homeTown: z.string(),
  phone: z.string().min(10),
  nin: z.string().optional(),
  address: z.string(),
  bloodGroup: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
  genotype: z.enum(["AA", "AS", "SS", "AC", "SC"]),
  religion: z.enum(["Christianity", "Islam", "Other"]),
});
