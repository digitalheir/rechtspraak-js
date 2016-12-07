export default function throwIfNotString(str:any, extra:string, ...extras:string[]):string {
    if (typeof str === 'string') return str;
    else throw new Error("Expected " + JSON.stringify(str) + " to be a string. (" + extra + ")");
}