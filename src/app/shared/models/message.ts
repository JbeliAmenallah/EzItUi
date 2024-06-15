export interface Message  {
    _id?: string;
    conversationId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    text?: string;
    sender?: string;
    fileUrl?:string;
    type?:string;
    seen?:Boolean;

}