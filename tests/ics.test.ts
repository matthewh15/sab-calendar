import { describe, it, expect, vi } from 'vitest';
import { generateICS } from '../lib/ics';

vi.mock('uuid', () => ({ v4: () => 'test-uid' }));

describe('generateICS', () => {
  it('creates a valid ICS payload', () => {
    const { uid, ics } = generateICS({
      summary: 'Test Event',
      description: 'Demo',
      start: '2024-01-01T10:00:00.000Z',
      end: '2024-01-01T10:30:00.000Z',
      organizer: 'mailto:organizer@example.com',
      attendee: 'mailto:user@example.com',
    });
    expect(uid).toBe('test-uid');
    expect(ics).toContain('SUMMARY:Test Event');
    expect(ics).toContain('UID:test-uid');
    expect(ics).toContain('DTSTART:20240101T100000Z');
  });
});
