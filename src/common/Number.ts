export class Number {
    static isInt(n:any){
        return n === n && n % 1 === 0;
    }
    static isFloat(n:any){
        return n === n && n % 1 !== 0;
    }
}