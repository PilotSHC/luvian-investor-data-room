/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    investorAuthed?: boolean;
    investorTier?: 1 | 2;
    investorProfile?: {
      name: string;
      firm: string;
      email: string;
      acceptedAt: number;
    };
  }
}
