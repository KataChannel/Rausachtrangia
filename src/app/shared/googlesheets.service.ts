import { Injectable } from '@angular/core';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-apis';

@Injectable({
  providedIn: 'root'
})
export class GooglesheetsService {

  private spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your actual ID
  private sheetName = 'Sheet1'; // Replace with your actual sheet name

  private async getSpreadsheet(): Promise<GoogleSpreadsheet> {
    const sheet = new GoogleSpreadsheet(this.spreadsheetId);
    await sheet.loadInfo();
    return sheet;
  }

  async getRows(): Promise<any[]> {
    const sheet = await this.getSpreadsheet();
    const sheetInstance = sheet.sheetsById[this.sheetName];
    const rows = await sheetInstance.getRows();
    return rows.map((row:any) => {
      // Map to your expected data structure
      return {
        id: row['ID'], // Assuming a column named 'ID'
        name: row['Name'],
        // ...other properties
      };
    });
  }

  async getRowById(id: string): Promise<any> {
    const rows = await this.getRows();
    return rows.find(row => row.id === id);
  }

  async createRow(data: any): Promise<void> {
    const sheet = await this.getSpreadsheet();
    const sheetInstance = sheet.sheetsById[this.sheetName];
    await sheetInstance.addRow(data);
  }

  async updateRow(id: string, data: any): Promise<void> {
    const row = await this.getRowById(id);
    if (row) {
      await row.update(data);
    } else {
      throw new Error(`Row with ID '${id}' not found`);
    }
  }

  async deleteRow(id: string): Promise<void> {
    const row = await this.getRowById(id);
    if (row) {
      await row.delete();
    } else {
      throw new Error(`Row with ID '${id}' not found`);
    }
  }
}
