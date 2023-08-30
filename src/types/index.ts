export type Invoice = {
    invoiceId: string,
    id: string,
    fee: number,
    date: any,
    venue: string,
    entity: string
    userId: string
    status: string
    createdAt?: string
    sentAt?: any
    additionalInfo?: string
}

export type Entity = {
    name: string
    email: string
    address: string,
    postcode: string,
    id: string,
    userId: string,
    bcc?: string
}

export interface sendEmailBody  
    { sender: 
        { 
            name: string; 
            email: string; 
        };
         to: {
             email: string; 
             name: string; 
            }[];
         templateId: number; 
         params: {
             name: string; 
             location: string; 
             date: any; 
             fee: string; 
             address: string; 
             postcode: string; 
             document_uri: string; 
            }; subject: string; }

export interface sendEmailBodyBcc extends sendEmailBody  {
    bcc: {email: string}[] 
}