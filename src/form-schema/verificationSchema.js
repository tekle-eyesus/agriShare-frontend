import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageFileSchema = z
  .any()
  .refine(
    (file) => file instanceof File || typeof file === "string",
    "Image is required",
  )
  .refine(
    (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
    "Image must be 5MB or smaller",
  )
  .refine(
    (file) =>
      !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only JPEG, PNG, or WebP images are allowed",
  );

export const farmerVerificationSchema = z.object({
  faydaIdNumber: z
    .string()
    .trim()
    .min(6, "Fayda ID must be at least 6 characters")
    .max(20, "Fayda ID must be 20 characters or less")
    .regex(
      /^[A-Z0-9-]+$/,
      "Only uppercase letters, numbers, and dashes allowed",
    ),
  idFrontImage: imageFileSchema,
  idBackImage: imageFileSchema,
  selfieImage: z
    .any()
    .optional()
    .nullable()
    .refine(
      (file) => !file || typeof file === "string" || file instanceof File,
      "Invalid file",
    )
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      "Image must be 5MB or smaller",
    )
    .refine(
      (file) =>
        !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPEG, PNG, or WebP images are allowed",
    ),
});
