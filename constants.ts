
import { SafetyLevel } from './types';
import type { Station, Feedback } from './types';

export const CENTRAL_LINE_STATIONS: Station[] = [
  { id: 1, name: 'CSMT', safety: SafetyLevel.Safe },
  { id: 2, name: 'Masjid', safety: SafetyLevel.Moderate },
  { id: 3, name: 'Sandhurst Road', safety: SafetyLevel.Unsafe },
  { id: 4, name: 'Byculla', safety: SafetyLevel.Moderate },
  { id: 5, name: 'Chinchpokli', safety: SafetyLevel.Unsafe },
  { id: 6, name: 'Currey Road', safety: SafetyLevel.Unsafe },
  { id: 7, name: 'Parel', safety: SafetyLevel.Moderate },
  { id: 8, name: 'Dadar', safety: SafetyLevel.Safe },
  { id: 9, name: 'Matunga', safety: SafetyLevel.Moderate },
  { id: 10, name: 'Sion', safety: SafetyLevel.Moderate },
  { id: 11, name: 'Kurla', safety: SafetyLevel.Unsafe },
  { id: 12, name: 'Vidyavihar', safety: SafetyLevel.Moderate },
  { id: 13, name: 'Ghatkopar', safety: SafetyLevel.Safe },
  { id: 14, name: 'Vikhroli', safety: SafetyLevel.Moderate },
  { id: 15, name: 'Kanjurmarg', safety: SafetyLevel.Moderate },
  { id: 16, name: 'Bhandup', safety: SafetyLevel.Unsafe },
  { id: 17, name: 'Nahur', safety: SafetyLevel.Moderate },
  { id: 18, name: 'Mulund', safety: SafetyLevel.Safe },
  { id: 19, name: 'Thane', safety: SafetyLevel.Safe },
];

export const INITIAL_FEEDBACK: Feedback[] = [
  {
    id: 1,
    station: 'Kurla',
    comment: 'Very poorly lit platform 7 after 10 PM. Felt very unsafe.',
    upvotes: 42,
    userHandle: 'Priya S.'
  },
  {
    id: 2,
    station: 'Dadar',
    comment: 'Good RPF presence on the central line bridge. Felt secure.',
    upvotes: 18,
    userHandle: 'Anjali M.'
  },
  {
    id: 3,
    station: 'Sandhurst Road',
    comment: 'Groups of men loitering near the exit. No security personnel in sight.',
    upvotes: 77,
    userHandle: 'Sneha P.'
  },
];
