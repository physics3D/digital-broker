let apiKey: string = "c5itmc2ad3ifq3te92jg";
let baseUrl: string = "https://finnhub.io/api/v1/"

let watermarkColor = "%231db954";
let backgroundColor = "%23222222";
let textColor = "white";


// get the URL to a widget that shows the price development of the specific stock
export function getWidgetURL(symbol: string) {
    return "https://widget.finnhub.io/widgets/stocks/chart?symbol=" + symbol + "&watermarkColor=" + watermarkColor + "&backgroundColor=" + backgroundColor + "&textColor=" + textColor;
}

function queryAPI(query: string): Promise<any> {
    let queryURL = baseUrl + query + "&token=" + apiKey;
    return fetch(queryURL).then(res => res.json());
}

export interface APIStock {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

// returns a list of all stocks traded in the US
export function getStocksList(): Promise<APIStock[]> {
    return queryAPI("stock/symbol?exchange=US");
}

export interface CurrentRatio {
    period: string;
    v: number;
}

export interface SalesPerShare {
    period: string;
    v: number;
}

export interface NetMargin {
    period: string;
    v: number;
}

export interface Annual {
    currentRatio: CurrentRatio[];
    salesPerShare: SalesPerShare[];
    netMargin: NetMargin[];
}

export interface Series {
    annual: Annual;
}

export interface Metric {
    TenDayAverageTradingVolume: number;
    FiftyTwoWeekHigh: number;
    FiftyTwoWeekLow: number;
    FiftyTwoWeekLowDate: string;
    FiftyTwoWeekPriceReturnDaily: number;
    beta: number;
}

export interface BasicFinancials {
    series: Series;
    metric: Metric;
    metricType: string;
    symbol: string;
}

// get basic financials of a stock
export function getBasicFinancials(symbol: string): Promise<BasicFinancials> {
    return queryAPI("stock/metric?symbol=" + symbol + "&metric=all");
}

export interface CompanyNews {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

// get company news from the last month
export function getCompanyNews(symbol: string): Promise<CompanyNews> {
    let currentDateString = new Date().toISOString().slice(0, 10);

    let lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    if (lastMonthDate.getMonth() === 12) {
        lastMonthDate.setFullYear(lastMonthDate.getFullYear() - 1);
    }

    let lastMonthDateString = lastMonthDate.toISOString().slice(0, 10);

    return queryAPI("company-news?symbol=" + symbol + "&from=" + lastMonthDateString + "&to=" + currentDateString);
}

// get real-time the real-time of a stock
export function getStockPrice(symbol: string): Promise<number> {
    return queryAPI("quote?symbol=" + symbol).then(json => json.c); // c is the current price
}