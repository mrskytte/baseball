"use strict";
import "@babel/polyfill";

const apiKey = "5eb95b31ce64705c9963f924";
const endpoint =
  "https://copenhagenbaseball-d844.restdb.io/rest/player-profile";

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
  data.forEach(postPlayer);
}

function postPlayer(player) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector(".player-name").textContent = player.Name;
  clone.querySelector(".player-age").textContent = player.Age;
  clone.querySelector(".bats").textContent = player.Bats;
  clone.querySelector(".throws").textContent = player.Throws;
  clone.querySelector(".player-positions").textContent = player.Positions;
  clone.querySelector(".player-bio").textContent = player.Bio;
  clone.querySelector(".player-stats").textContent = player.Stats;

  document.querySelector("#player-profile-main").appendChild(clone);
}
