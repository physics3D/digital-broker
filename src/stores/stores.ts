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

function updateBoughtStocksPrices() {
    let gameStateCopy;
    gameState.subscribe((value) => gameStateCopy = value);

    let localGameState = gameStateCopy;

    localGameState.stocks.forEach(stock => {
        getStockPrice(stock.symbol).then(price => stock.currentPrice = price);
    });

    gameState.set(localGameState);
}

export function initStores() {
    gameState = writable(JSON.parse(localStorage.getItem("gameState")) || {
        gameStarted: false,
        money: 0,
        stocks: []
    });

    gameState.subscribe((value) => {
        localStorage.setItem("gameState", JSON.stringify(value));
    });

    // set clock to update the prices of all bought stocks
    // do it manually first because setInterval waits 1 min before running the code
    updateBoughtStocksPrices();

    setInterval(() => {
        updateBoughtStocksPrices();
    }, 60000);
}
