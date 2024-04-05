export interface Product {
     id: string,
     object: string,
     active: boolean,
     created: number,
     default_price: default_price,
     description: string | null,
     images: string[],
     features: object[],
     livemode: boolean,
     metadata: object,
     name: string,
     package_dimensions: object | null,
     shippable: boolean | null,
     statement_descriptor: string | null,
     tax_code: string | null,
     unit_label: string | null,
     updated: number,
     url: string | null
}

export interface default_price {
    currency: string,
    id: string,
    type: string,
    unit_amount: number
}