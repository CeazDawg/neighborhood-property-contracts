import { expect, test } from 'vitest';
import { PropertySchema } from '../schemas/property';

const validRecord = {
  property_id: "prop-101",
  address: { street: "123 Main St", city: "Los Angeles", state: "CA" },
  zip_code: "90001",
  price: 750000,
  bedrooms: 3,
  bathrooms: 2,
  square_feet: 1800,
  amenities: ["Parking", "Pool"],
  local_sponsors: [{ sponsor_id: "s-1", name: "First Bank", contact_email: "contact@firstbank.com" }]
};

test("Valid property record passes validation", () => {
  expect(() => PropertySchema.parse(validRecord)).not.toThrow();
});

test("Fails on missing property_id", () => {
  const invalid = { ...validRecord, property_id: undefined };
  expect(() => PropertySchema.parse(invalid)).toThrow();
});

test("Fails on negative price", () => {
  const invalid = { ...validRecord, price: -50000 };
  expect(() => PropertySchema.parse(invalid)).toThrow();
});

test("Fails on bad ZIP code format", () => {
  const invalid = { ...validRecord, zip_code: "INVALID_ZIP" };
  expect(() => PropertySchema.parse(invalid)).toThrow();
});

test("Fails on unknown field (strict mode)", () => {
  const invalid = { ...validRecord, unknown_field: "unexpected data" };
  expect(() => PropertySchema.parse(invalid)).toThrow();
});

