export type Invoice = {
    invoiceId: string,
    id: string,
    fee: number,
    date: any,
    venue: string,
    entity: string
    userId: string
    status: string
}

export type Entity = {
    name: string
    email: string,
    address: string,
    postcode: string,
    id: string,
    userId: string,
}
