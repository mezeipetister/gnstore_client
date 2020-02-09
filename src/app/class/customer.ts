export class Customer {
    constructor(
        public id: string,
        public date_created: Date,
        public created_by: string,
        public name: string,
        public address: CustomerAddress,
        public email: string,
        public phone: string,
        public tax_number: string,
        public has_user: boolean,
        public users: string[]
    ) { }
}

export class CustomerAddress {
    constructor(
        public zip: string,
        public location: string,
        public address: string
    ) { }
}
