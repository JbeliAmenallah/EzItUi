import { Functionality } from "./functionality";

export interface Task {
    id?: number;
    taskName: string;
    description: string;
    duration: number;
    totalDuration?: number;
    functionalityId: number;
    functionalities ?:Functionality  ;
    chartData ?: any ;
  }
  
