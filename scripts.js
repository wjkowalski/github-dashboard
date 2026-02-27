
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

            let image = "<img src='" + avatar + "'>";
            let imageHolder = document.createElement('div');
            imageHolder.setAttribute('class', 'imageHolder');
            output.appendChild(imageHolder);
            image.innerHTML = image;



            output.innerHTML = "<h2 style='margin-bottom: 0'>" + name +  "</h2>" +  desc;

            let topicsHolder = document.createElement('div');
            topicsHolder.setAttribute('class', 'topicHolder');
            output.appendChild(
                topicsHolder
            );
            topicsHolder.style.flexWrap = "wrap";
            
            for(j = 0; j < topics.length; j++){
                let topic = document.createElement('div');
                topic.innerHTML = topics[j];
                topic.style.backgroundColor = "black";
                topic.style.color = "white";
                topic.style.padding = ".25rem";
                topic.style.borderRadius = "5px";
                topicsHolder.append(topic);
            }

            topicsHolder.style.display = "flex";
            topicsHolder.style.gap = ".5rem";
            output.style.marginBottom = "1rem";
        }

    })
} catch{
    console.log("There was an error.", error);
}

})();