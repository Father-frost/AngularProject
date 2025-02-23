export class ListOfButtons{

    constructor(
        public id:string,
        public operation: string,
        public displayValue: string,
        public handleClick:() =>any,
    )
    {
    }
}