import { describe, it, expect } from 'vitest';
import {
  getWeekDays,
  addDays,
  formatDate,
  addOneHour,
  getTimeFromDate
} from '../utils/dateUtils';

describe('Date Utilities', () => {
  describe('getWeekDays', () => {
    it('returns array of 7 days starting with the current day of the week', () => {
      const testDate = new Date(2021, 4, 3);
      const weekDays = getWeekDays(testDate);
      
      expect(weekDays).toHaveLength(7);
      
      expect(weekDays[0].getFullYear()).toBe(2021);
      expect(weekDays[0].getMonth()).toBe(4);
      expect(weekDays[0].getDate()).toBe(2);
      
      expect(weekDays[6].getFullYear()).toBe(2021);
      expect(weekDays[6].getMonth()).toBe(4);
      expect(weekDays[6].getDate()).toBe(8);
    });
  });
  
  describe('addDays', () => {
    it('adds the specified number of days to a date', () => {
      const testDate = new Date(2021, 4, 15);
      
      const result = addDays(testDate, 5);
      expect(result.getFullYear()).toBe(2021);
      expect(result.getMonth()).toBe(4);
      expect(result.getDate()).toBe(20);
      
      expect(testDate.getDate()).toBe(15);
    });
    
    it('handles negative days (subtracting days)', () => {
      const testDate = new Date(2021, 4, 15);
      
      const result = addDays(testDate, -5);
      expect(result.getFullYear()).toBe(2021);
      expect(result.getMonth()).toBe(4);
      expect(result.getDate()).toBe(10);
    });
    
    it('handles month and year boundaries', () => {
      const testDate = new Date(2021, 11, 30);
      
      const result = addDays(testDate, 3);
      expect(result.getFullYear()).toBe(2022);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(2);
    });
  });
  
  describe('formatDate', () => {
    it('formats the date in the expected format', () => {
      const testDate = new Date(2021, 4, 15);
      const formattedDate = formatDate(testDate);
      
      expect(formattedDate).toContain('May');
      expect(formattedDate).toContain('15');
    });
  });
  
  describe('addOneHour', () => {
    it('adds one hour to the given time string', () => {
      expect(addOneHour('09:30')).toBe('10:30');
      expect(addOneHour('23:45')).toBe('00:45');
    });
    
    it('handles empty input', () => {
      expect(addOneHour('')).toBe('');
    });
    
    it('maintains the minutes portion unchanged', () => {
      expect(addOneHour('10:15')).toBe('11:15');
    });
  });
  
  describe('getTimeFromDate', () => {
    it('extracts time in HH:MM format from Date object', () => {
      const date1 = new Date(2021, 4, 15, 9, 30);
      expect(getTimeFromDate(date1)).toBe('09:30');
      
      const date2 = new Date(2021, 4, 15, 14, 45);
      expect(getTimeFromDate(date2)).toBe('14:45');
      
      const date3 = new Date(2021, 4, 15, 0, 0);
      expect(getTimeFromDate(date3)).toBe('00:00');
    });
    
    it('adds leading zeros for single-digit hours and minutes', () => {
      const date = new Date(2021, 4, 15, 9, 5);
      expect(getTimeFromDate(date)).toBe('09:05');
    });
  });
}); 