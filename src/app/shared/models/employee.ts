export interface Employee {
  contactId?: number;
  name?: string;
  username?: string;
  email?: string;
  location?: string;
  phone?: string;
  fax?: string;
  password?: string;
  roles?: string;
  nbEnfant?: number;
  regime?: string;
  chefDefamille?: boolean;
  salaireDeBASE?: number;
  numCompte?: string;
  modeDePaiement?: string;
  dateRecrutemnt?: Date;
  absences?: Absence[];
  primes?: Prime[];
  autorisations?: Autorisation[];
  conges?: Conge[];
  //cotisations?: Cotisation[];
  enfants?: Enfant[];
  entreprise?:any;
  category?:any;
  grade?:any;
  groupe?:any;


}

interface Absence {
  absenceId?: number;
  dateDebutAbsence?: Date;
  dateFinAbsence?: Date;
  reason?: string;
  justified?: boolean;
}

interface Prime {
  primeId?: number;
  year?: number;
  month?: number;
  montant?: number;
  motif?: string;
}

interface Autorisation {
  autorisationId: number;
  dateDebut: Date;
  dateFin: Date;
  state: string;
}

interface Conge {
  congeId: number;
  startDate: Date;
  endDate: Date;
  state: string;
}

/*interface Cotisation {
  cotisationId?: number;
  libele?: string;
  annee?: number;
  taux?: number;
}*/

interface Enfant {
  id?: number;
  name?: string;
  familyName?: string;
  age?: number;
  disabled?: boolean;
  bourse?: boolean;
  educationGrade?: string;
}

