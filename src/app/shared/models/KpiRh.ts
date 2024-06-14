
export interface KpiRh {
    id: number;
    username: string;
    createdDate: string;
    nbAbsences: number;
    nbConges: number;
    kpiProject: {
      id: number;
      username: string;
      createdDate: string;
    };
  }
  