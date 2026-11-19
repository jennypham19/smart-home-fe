// Input

import { Dayjs } from "dayjs";


// Payload
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

export interface DeliveryOrderPayload {
    deliveryOrderCode: string,
    deliveryDate: Dayjs | null,
    shippingCarrier: string | null,
    shippingFee: any,
    createdBy: string | null,
    orderId: string
}

interface DeliveryPersonPayload{
    nameDeliveryPerson: string,
    phoneDeliveryPerson: string,
    licensePlate: string,
    addressGetDelivery: string,
}

interface RecipientPayload{
    nameRecipient: string,
    phoneRecipient: string,
    addressReceivedDelivery: string,
}

export interface BodyPayload{
    deliveryOrder: DeliveryOrderPayload,
    deliveryPerson: DeliveryPersonPayload,
    recipient: RecipientPayload
}
// Output
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
    isOrderShippingCreated: boolean,
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
