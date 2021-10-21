import type { APIStock } from "src/api/api";
import type { Stock } from "src/stores/stores";

export function stockToAPIStock(stockToConvert: Stock): APIStock {
    return {
        description: stockToConvert.name,
        symbol: stockToConvert.symbol,
        displaySymbol: stockToConvert.symbol,
        type: "Common Stock",
    };
}

export function roundToTwoDigits(num: number): number {
    return parseFloat(num.toFixed(2));
}

export function getSign(num: number): string {
    if (num < 0) {
        return "";
    } else {
        return "+";
    }
}

export function getTextColor(num: number) {
    if (num < 0) {
        return "text-red";
    } else {
        return "text-green";
    }
}