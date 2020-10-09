import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private clubContext: string;

  getClubContext() {
    return this.clubContext;
  }

  setClubContext(context: string) {
    this.clubContext = context;
  }
}
