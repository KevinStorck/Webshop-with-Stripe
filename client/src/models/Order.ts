export interface Order {
    id: 44569915,
    customerId: string,
    customerName: string,
    products: [
      {
        id: string,
        object: string,
        amount_discount: number,
        amount_subtotal: number,
        amount_tax: number,
        amount_total: number,
        currency: string,
        description: string,
        price: Price,
        quantity: number
      }
    ],
    cost: number,
    date: Date
  }

  export interface Price {
    price: {
        id: string,
        object: string,
        active: boolean,
        billing_scheme: string,
        created: number,
        currency: string,
        custom_unit_amount: object | null,
        livemode: false,
        lookup_key: string | null,
        metadata: object,
        nickname: string | null,
        product: string,
        recurring: object | null,
        tax_behavior: string | null,
        tiers_mode: string | null,
        transform_quantity: object | null,
        type: string,
        unit_amount: number | null,
        unit_amount_decimal: string | null
      },
  }