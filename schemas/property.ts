import { z } from 'zod';

export const SponsorSchema = z.object({
  sponsor_id: z.string().min(1),
  name: z.string().min(1),
  contact_email: z.string().email(),
}).strict();

export const PropertySponsorSchema = z.object({
  property_id: z.string().min(1),
  sponsor_id: z.string().min(1),
  sponsorship_tier: z.enum(['Gold', 'Silver', 'Bronze']),
}).strict();

export const PropertySchema = z.object({
  property_id: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().length(2),
  }).strict(),
  zip_code: z.string().regex(/^\d{5}(-\d{4})?$/),
  price: z.number().nonnegative(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  square_feet: z.number().positive(),
  amenities: z.array(z.string()),
  local_sponsors: z.array(SponsorSchema),
}).strict();

export type Property = z.infer<typeof PropertySchema>;


