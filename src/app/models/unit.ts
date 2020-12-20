
export class Unit {
    public static GRAM = "g";
    public static MILI_LITRE = "ml";
    public static PIECE = "X";
    public static TABLE_SPOON = "tbsp";
    public static TEA_SPOON = "tsp"
    public static FLUID_OZ = "oz";
    public static CUP_VOLUME = "cv";
    public static CUP_SOLID = "cs";

    public convertAmount(fromUnit: string, fromAmount: any, toUnit: string, toAmount: any): any {
        let result = {unit: null, amount: 0};



        return result;
    }

    public static getUnits(): Array<string> {
        let result = new Array<string>();
        result.push(Unit.GRAM);
        result.push(Unit.MILI_LITRE);
        result.push(Unit.PIECE);
        result.push(Unit.TABLE_SPOON);
        result.push(Unit.TEA_SPOON);
        result.push(Unit.CUP_SOLID);
        result.push(Unit.CUP_VOLUME);
        result.push(Unit.FLUID_OZ);
        
        return result;
    }
}