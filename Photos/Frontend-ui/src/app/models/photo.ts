export class Photo{
    constructor(
        public _id: string,
        public name: string,
        public image: string,
        public state: string,
        public user: any,
        public date: string
        
    ){}
}