/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    investorAuthed?: boolean;
    investorProfile?: {
      name: string;
      firm: string;
      email: string;
      acceptedAt: number;
    };
  }
}
