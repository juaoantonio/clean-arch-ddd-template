import { Period } from "./period.vo";
import { DateVo } from "./date.vo";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Period Value Object Unit Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-09-20"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create a valid period", () => {
    const startDate = DateVo.create("2024-09-20");
    const endDate = DateVo.create("2024-09-25");

    const period = Period.create({ startDate, endDate });

    expect(period.getStartDate()).toEqual(startDate);
    expect(period.getEndDate()).toEqual(endDate);
    expect(period.getTotalDays()).toBe(6); // Deve incluir ambos os dias
  });

  it("should throw error if start date is in the past", () => {
    const startDate = DateVo.create("2022-01-01");
    const endDate = DateVo.create("2024-09-25");

    expect(() => {
      Period.create({ startDate, endDate });
    }).toThrow("The start date cannot be in the past");
  });

  it("should throw error if end date is in the past", () => {
    const startDate = DateVo.create("2024-09-20");
    const endDate = DateVo.create("2022-01-01");

    expect(() => {
      Period.create({ startDate, endDate });
    }).toThrow("The end date cannot be in the past");
  });

  it("should throw error if start date is after end date", () => {
    const startDate = DateVo.create("2024-09-25");
    const endDate = DateVo.create("2024-09-20");

    expect(() => {
      Period.create({ startDate, endDate });
    }).toThrow("The start date cannot be after the end date");
  });

  it("should correctly calculate the number of days in the period", () => {
    const startDate = DateVo.create("2024-09-20");
    const endDate = DateVo.create("2024-09-22");

    const period = Period.create({ startDate, endDate });

    expect(period.getTotalDays()).toBe(3);
  });

  it("should correctly check if a date is contained in the period", () => {
    const startDate = DateVo.create("2024-09-20");
    const endDate = DateVo.create("2024-09-25");

    const period = Period.create({ startDate, endDate });

    const dateInside = DateVo.create("2024-09-22");
    const dateOutside = DateVo.create("2024-09-26");

    expect(period.contains(dateInside)).toBe(true);
    expect(period.contains(dateOutside)).toBe(false);
  });
});
