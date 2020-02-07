export class Notification {
    constructor(
        public id: number,
        public date_created: Date,
        public is_new: boolean,
        public subject: string,
        public location: string | null
    ) { }
}
