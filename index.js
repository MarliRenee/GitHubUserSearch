'use strict'

function getRepos(usernameSearchTerms) {
  fetch(`https://api.github.com/users/${usernameSearchTerms}/repos`)

  .then(response => {
     if (response.ok) {
       return response.json();
     }
    $('.js-results').empty();
    throw new Error ('No results found. Please try again'); 
  })

  .then (responseJson => {
    displayResults(responseJson)
  })

  .catch (err => {
    console.log(err);
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(responseJson){
  $('#js-error-message').text('');

  $('.js-results').empty();

  let SearchResults = `<h3>Repos Built By: <span>${responseJson[0].owner.login}</span><h3>`

  $('.js-results').append(SearchResults);

  for(let i=0; i < responseJson.length;i++) {
    $('.js-results').append(
      `<div class="result-item"><li><h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      </li></div>`)
  }

  $('.js-results').removeClass('hidden'); 
} 

function watchForm (){
  $('#js-form').submit(event => {
    event.preventDefault();
    const usernameSearchTerms = $('.js-username').val();
    getRepos(usernameSearchTerms);
  });
}

$(watchForm);