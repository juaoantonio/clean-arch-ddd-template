import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DateVo } from "./date.vo";

describe("DateVO", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-08-30"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("constructor", () => {
    it("should create a new instance of DateVO", () => {
      // Arrange
      const date = new Date();
      // Act
      const dateVO = new DateVo(date);
      // Assert
      expect(dateVO).toBeDefined();
      expect(dateVO.getDate()).toBe(date);
      expect(dateVO.getDateFormatted()).toBe("2024-08-30");
    });
  });

  describe("create", () => {
    it("should create a new instance of DateVO from a string", () => {
      // Arrange
      const date = "2024-08-30";
      // Act
      const dateVO = DateVo.create(date);
      // Assert
      expect(dateVO).toBeDefined();
      expect(dateVO.getDate()).toEqual(new Date(date));
      expect(dateVO.getDateFormatted()).toBe("2024-08-30");
    });
  });

  it("should check if date is equal today", () => {
    const datevo = DateVo.create(new Date());
    expect(datevo.isToday()).toBe(true);
  });

  it("should check if date is not equal today", () => {
    const datevo = DateVo.create("2024-08-29");
    expect(datevo.isToday()).toBe(false);
  });

  it("should check if is in past", () => {
    const datevo = DateVo.create("2024-08-29");
    expect(datevo.isInPast()).toBe(true);
  });

  it("should check if is in future", () => {
    const datevo = DateVo.create("2024-08-31");
    expect(datevo.isInFuture()).toBe(true);
  });

  it("should return now date", () => {
    const datevo = DateVo.now();
    expect(datevo.isToday()).toBe(true);
  });
});
