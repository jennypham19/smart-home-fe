export interface OrderPayload {
    code: string;
    name: string;
    productQuantity: any;
    createdBy: string | null,
    productsOrder:{
        skuCode: string,
        name: string,
        quantity: any,
        description: string | null
    }[]
}

export interface IOrder{
    id: string,
    code: string,
    name: string,
    productQuantity: any,
    process: number,
    status: string,
    createdBy: string,
    createdAt?: string,
    updatedAt?: string,
    products: {
        id: string,
        name: string,
        skuCode: string,
        quantity: any,
        description: string,
        isChecked: boolean,
        createdAt?: string,
        updatedAt?: string, 
    }[]
}
