export class Conge {
    startDate?: Date;
    endDate?: Date;
    state?: string;
    contactId?: number;
  
    constructor(startDate: Date, endDate: Date, state: string, contactId: number) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.state = state;
      this.contactId = contactId;
    }
  }
  