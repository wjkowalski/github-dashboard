
let url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=100';

fetch(url)
.then( response => response.json())
.then( data => {
    console.log(data);
})