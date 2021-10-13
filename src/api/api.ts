let apiKey: string = "c5itmc2ad3ifq3te92jg";
let baseUrl: string = "https://finnhub.io/api/v1/"

export type APIStock = {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

function queryAPI(query: string): Promise<string> {
    let queryURL = baseUrl + query + "&token=" + apiKey;
    return fetch(queryURL).then(res => res.text());
}

// returns a list of all stocks traded in the US
export function getStocksList(): Promise<string> {
    return queryAPI("stock/symbol?exchange=US");
}