export class Conge {
    congeId?: number; 
    startDate?: Date;
    endDate?: Date;
    state?: string;
    contactId?: number;
  
    constructor(id: number, startDate: Date, endDate: Date, state: string, contactId: number) {
      this.congeId = id;
      this.startDate = startDate;
      this.endDate = endDate;
      this.state = state;
      this.contactId = contactId;
    }
  }
  