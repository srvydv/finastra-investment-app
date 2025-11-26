import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctions {
  formatDateToYMD(isoString: string): string {
    // Parse the ISO string into a Date object
    const date = new Date(isoString);

    // Extract year, month, day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Return in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  }

  isoToNativeDate(iso: any): Date | null {
    // Expecting "YYYY-MM-DD"
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;

    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d); // local time, avoids UTC shift

    // Validate that the parts produced a real date (e.g., 2025-02-31 would be invalid)
    return isNaN(date.getTime()) ? null : date;
  }
}
