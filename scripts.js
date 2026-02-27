(function(){

    let body = document.querySelector('body');
    let readout = document.createElement('div');
    readout.setAttribute('id', 'readout');
    body.appendChild(readout);

    let url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=100';

 try  { fetch(url)
    .then( response => response.json())
    .then( data => {
        console.log("Fetching Github data...");

        let repos = data.items;

        for(const repo of repos){
            let name = repo.full_name;
            let desc = repo.description;
            let forks = repo.forks_count;
            let topics = repo.topics;
            let watchers = repo.watchers;
            let clone_url = repo.clone_url;
            let homepage = repo.homepage;
            let github_link = repo.html_url;
            let avatar = repo.owner.avatar_url;

            const output = document.createElement('div');
            body.appendChild(output);


            output.innerHTML = name, desc;
        //    console.log(name, desc)
        }

    })
} catch{
    console.log("There was an error.", error);
}

})();