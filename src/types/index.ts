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
    email: string | string[]
    address: string,
    postcode: string,
    id: string,
    userId: string,
    bcc?: string | string[]
}
