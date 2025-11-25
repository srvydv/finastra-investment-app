import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
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
}
