import './style.css'
import {format} from 'date-fns'

const articles = document.getElementById("articles");
const form = document.getElementById("form");

const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://buuksufdwjpcnnrppnjn.supabase.co/rest/v1/article?select=*', {
      headers: {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWtzdWZkd2pwY25ucnBwbmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODY1NjksImV4cCI6MjA2NDQ2MjU2OX0.jEbJAINd59eRkfsCLRJ56M1NioszFOraP988iiYnv1s',
      },
    });
    const data = await response.json();
    console.log(data);
    let articleString = "";
    data.forEach(element => {
      articleString += `<article>
      <p>Tytuł: ${element.title}</p>
      <p>Podtytuł: ${element.subtitle}</p>
      <p>Autor: ${element.author}</p>
      <p>Data utworzenia: ${format(new Date(element.created_at),"dd-MM-yyyy")}</p>
      <p>Treść: ${element.content}</p></article>`
    });
    articles.innerHTML = articleString;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await createNewArticle(form);
})

const createNewArticle = async (article) => {
  try {
    const response = await fetch('https://buuksufdwjpcnnrppnjn.supabase.co/rest/v1/article', {
      method: 'POST',
      headers: {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWtzdWZkd2pwY25ucnBwbmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODY1NjksImV4cCI6MjA2NDQ2MjU2OX0.jEbJAINd59eRkfsCLRJ56M1NioszFOraP988iiYnv1s',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author:article["author"].value,title:article["title"].value,subtitle:article["subtitle"].value,content:article["content"].value }),
    });

    if (response.status !== 201) {
      throw new Error(`Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};


fetchArticles();
