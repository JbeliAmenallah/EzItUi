export interface Contactt {
    contactId: number;
    name: string;
    username: string;
    email: string;
    location: string;
    phone: string;
    fax: string;
    password: string;
    roles: string;
    nbEnfant: number;
    regime: string;
    chefDefamille: boolean;
    salaireDeBASE: number;
    numCompte: string;
    modeDePaiement: string;
    dateRecrutemnt: Date;
    absences?: any[]; // Modify as needed
    primes?: any[]; // Modify as needed
    autorisations?: any[]; // Modify as needed
    conges?: any[]; // Modify as needed
    cotisations?: any[]; // Modify as needed
    entreprise?: any; // Modify as needed
    deductions?: any[]; // Modify as needed
  }
  