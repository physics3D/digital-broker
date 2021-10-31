import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { getStockPrice } from "../api/api";

export interface GameState {
    gameStarted: boolean;
    money: number;
    startMoney: number;
    stocks: Stock[];
}

export interface Stock {
    symbol: string;
    name: string;
    priceAtBuy: number;
    currentPrice: number;
    count: number;
}

export let gameState: Writable<GameState>;

function updateStocks() {
    let gameStateCopy: GameState;
    gameState.subscribe((value) => gameStateCopy = value);

    let localGameState: GameState = gameStateCopy;

    localGameState.stocks.forEach(async stock => {
        stock.currentPrice = await getStockPrice(stock.symbol) || stock.currentPrice;
    });

    gameState.set(localGameState);

}

export function initStores() {
    let initialGameState: GameState = JSON.parse(localStorage.getItem("gameState")) || {
        gameStarted: false,
        money: 0,
        stocks: []
    };

    gameState = writable(initialGameState);

    // somehow you have to wrap it in an arrow function
    let initialUpdate = () => {
        initialGameState.stocks.forEach(async (stock) => {
            stock.currentPrice = await getStockPrice(stock.symbol) || stock.currentPrice;
        })
    };

    initialUpdate();

    gameState.subscribe((value) => {
        localStorage.setItem("gameState", JSON.stringify(value));
    });

    // set clock to update the prices of all bought stocks
    setInterval(updateStocks, 1000);
}
