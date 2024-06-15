export interface Conversation  {
    _id: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
    contactName: string;
    imageUrl: string;
    lastMessage?:String;
    timeLastMessage?:Date;
    contactId?:string;
}