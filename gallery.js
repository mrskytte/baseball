"use strict";
import "@babel/polyfill";

const apiKey = "5eb95b31ce64705c9963f924";
const endpoint = "https://copenhagenbaseball-d844.restdb.io/rest/gallery";

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
  data[0].images.forEach(postImg);
}

function postImg(img) {
  console.log("img", img);
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  const image = clone.querySelector("img");

  image.setAttribute(
    "src",
    `https://copenhagenbaseball-d844.restdb.io/media/${img}`
  );

  document.querySelector("#gallery-main").appendChild(clone);
}
