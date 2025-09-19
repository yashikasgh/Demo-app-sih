
export type Screen = 'home' | 'check' | 'feedback';

export enum SafetyLevel {
  Safe = 'Safe',
  Moderate = 'Moderate',
  Unsafe = 'Unsafe',
}

export interface Station {
  id: number;
  name: string;
  safety: SafetyLevel;
}

export interface Feedback {
  id: number;
  station: string;
  comment: string;
  upvotes: number;
  userHandle: string;
}
