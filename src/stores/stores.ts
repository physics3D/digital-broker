import { Writable, writable } from "svelte/store";

export type GameState = {
    gameStarted: boolean;
    money: number;
    stocks: Stock[];
}

export type Stock = {
    name: string;
    priceAtBuy: number;
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
    })
}
