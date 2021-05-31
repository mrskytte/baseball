"use strict";
import "@babel/polyfill";

const apiKey = "5eb95b31ce64705c9963f924";
const endpoint = "https://copenhagenbaseball-d844.restdb.io/rest/news";

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
  data.forEach(postNews);
}

function postNews(news) {
  const date = new Date(news.dateAdded);

  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector(".news-date-p").textContent = date.toDateString();
  clone.querySelector(".news-title").innerHTML = news.title;
  clone.querySelector(".news-body").innerHTML = news.body;

  document.querySelector("#news-main").appendChild(clone);
}
