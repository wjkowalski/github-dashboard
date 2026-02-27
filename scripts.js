(function(){
    let url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=100';

 try  { fetch(url)
    .then( response => response.json())
    .then( data => {
        console.log("Fetching Github data...");
        let repos = data.items;
        // watchers

        for(const repo of repos){
            let name = repo.full_name;
            let desc = repo.description;
            let forks = repo.forks_count;
            let topics = repo.topics;
            let watchers = repo.watchers;

            for(let j = 0; j < topics.length; j++){
                console.log(topics[j]);
            }

            console.log(name, topics);

            
        }

    })
} catch{
    console.log("There was an error.", error);
}

})();