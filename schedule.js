"use strict";
import "@babel/polyfill";

const apiKey = "5eb95b31ce64705c9963f924";
const endpoint = "https://copenhagenbaseball-d844.restdb.io/rest/schedule";

window.addEventListener("load", init);

function init() {
  getData();
}

async function getData() {
  const data = await fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  const response = await data.json();
  handleData(response);
}

function handleData(data) {
  data.forEach(postGame);
}

function postGame(game) {
  const date = new Date(game.gamedate);
  const time = new Date(game.gameTime);
  console.log("time", time.getHours() - 1);

  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector(".gamedate").textContent = date.toDateString();
  clone.querySelector(".time").textContent = `${time.getHours() - 1}:00`;
  clone.querySelector(".home-team").textContent = game.homeTeam;
  clone.querySelector(".away-team").textContent = game.awayTeam;
  clone.querySelector(".location").textContent = game.location;
  clone.querySelector(".umpire").textContent = game.umpire;

  document.querySelector("#schedule-main").appendChild(clone);
}
