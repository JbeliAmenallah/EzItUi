export interface Stopwatch {
    id ?:number ;
    startDate ?: Date;
    endDate ?: Date;
    action ?: string; 
    stopReason ?: string;
    taskId: number;
 
}