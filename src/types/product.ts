export interface ProductPayload{
    skuCode: string,
    name: string,
    brand: string,
    amount: number,
    category: string,
    status: string
}

export interface IProduct{
    id: string,
    skuCode: string,
    name: string,
    brand: string,
    amount: number,
    category: string,
    status: string,
    createdAt?: string,
    updatedAt?: string,
}