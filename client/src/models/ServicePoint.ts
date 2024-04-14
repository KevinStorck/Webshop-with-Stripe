export interface ServicePoint {
    name: string,
    deliveryAddress: DeliveryAdress,
    servicePointId: string
}

export interface DeliveryAdress {
city: string,
countryCode: string,
postalCode: string,
streetName: string,
streetNumber: string
}