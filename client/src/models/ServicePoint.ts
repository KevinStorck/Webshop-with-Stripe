export interface ServicePoint {
    name: string,
    deliveryAdress: DeliveryAdress,
    servicePointId: string
}

export interface DeliveryAdress {
city: string,
countryCode: string,
postalCode: string,
streetName: string,
streetNumber: string
}