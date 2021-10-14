import { Writable, writable } from "svelte/store";
import { APIStock, getStockPrice } from "../api/api";

export interface GameState {
    gameStarted: boolean;
    money: number;
    stocks: Stock[];
}

export interface Stock {
    symbol: string;
    name: string;
    priceAtBuy: number;
    currentPrice: number;
}

export let gameState: Writable<GameState>;

export function initStores() {
    gameState = writable(JSON.parse(localStorage.getItem("gameState")) || {
        gameStarted: false,
        money: 0,
        stocks: []
    });

    gameState.subscribe((value) => {
        localStorage.setItem("gameState", JSON.stringify(value));
    });

    let gameStateCopy: GameState;
    gameState.subscribe(value => gameStateCopy = value);

    setInterval(() => {
        let localGameState = gameStateCopy;
        localGameState.stocks.forEach(stock => {
            getStockPrice(stock.symbol).then(price => stock.currentPrice = price);
        });

        gameState.set(localGameState);
    }, 60000);
}
