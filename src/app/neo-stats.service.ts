import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NeoStatsService {
  private baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

  constructor(private httpClient: HttpClient) {}

  getRange(startDate: string, endDate: string) {
    const apiKey = 'Zl5ZDEoyJTKoxSmrwLJV2yCu547BMGcSUnnEC1Uy';
    this.baseUrl =
      this.baseUrl +
      '?start_date=' +
      startDate +
      '&end_date=' +
      endDate +
      '&api_key=' +
      apiKey;
    console.log(this.baseUrl);

    return this.httpClient.get(this.baseUrl);
  }
}
