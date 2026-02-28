
(function () {

    let body = document.querySelector('body');
    let readout = document.createElement('div');
    readout.setAttribute('id', 'readout');
    body.appendChild(readout);

    let url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=100';

    try {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Fetching Github data...");

                // Get our list of repos from the main array
                let repos = data.items;

                console.log(repos);

                for (const repo of repos) {
                    let name = repo.full_name;
                    let desc = repo.description;
                    let topics = repo.topics;
                    let clone_url = repo.clone_url;
                    let homepage = repo.homepage;
                    let github_link = repo.html_url;
                    let avatar = repo.owner.avatar_url;
                    let stars = repo.stargazers_count;

                    // make a container for each repo listing
                    const output = document.createElement('div');
                    output.setAttribute('class', 'output');


                    body.append(output);

                    // make a container for the image
                    let imHolder = document.createElement('div');
                    imHolder.class = 'imHolder';
                    output.append(imHolder);

                    // make the image
                    let image = "<img style='class: image; height: 200px; width=200px; border-radius: 25px' src='" + avatar + "'>";

                    // put the image in the image container
                    imHolder.innerHTML = image;

                    // get the name and description 
                    let nameDesc = "<h2 style='margin-bottom: 0'>" + name + "</h2>" + desc + "<br /><h3>Stars: " + stars + "</h3>";

                    // build a container to hold name and description
                    let ndHolder = document.createElement('div');
                    ndHolder.class = 'ndHolder';


                    // put name and desc in the container
                    ndHolder.innerHTML = nameDesc;

                    // build a top section in output that will hold image and name/desc
                    let top = document.createElement('div');
                    top.setAttribute('class', 'top');

                    // put this section at the top of output
                    output.append(top);

                    // put the pic/name/desc in the top section
                    top.append(imHolder, ndHolder);
                    top.classList.add('top');

                    // create container for links to repo, website, and copy clone URL if they exist
                    let linksHolder = document.createElement('div');
                    linksHolder.setAttribute('class', 'linksHolder');
                    output.appendChild(linksHolder);

                    // create buttons for each link if there is anything there
                    if (github_link) {
                        console.log("Found a github link.");
                        let btnGh = document.createElement('a');
                        btnGh.class = 'button';
                        btnGh.id = 'button-gh';
                        btnGh.href = github_link;
                        btnGh.target = '_blank';
                        btnGh.rel = 'noopener noreferrer';
                        btnGh.innerHTML = "REPO" + "<span class='sr-only'>(opens in new tab)</span>";
                        linksHolder.append(btnGh);
                    }

                    if (clone_url) {
                        console.log("Found the clone url.");
                        let btnClone = document.createElement('a');
                        btnClone.setAttribute('class', 'button');
                        btnClone.setAttribute('id', 'btn-clone');
                        linksHolder.append(btnClone);
                        btnClone.innerHTML = "CLONE URL";
                        btnClone.addEventListener('click', () => {
                            alert("The clone URL has been copied to your clipboard.")
                            navigator.clipboard.writeText(clone_url)
                        });
                    }

                    if (homepage) {
                        console.log("Found a homepage link.");
                        let btnHome = document.createElement('a');
                        btnHome.setAttribute('class', 'button');
                        btnHome.innerHTML = "WEBSITE" + "<span class='sr-only'>(opens in new tab)</span>";
                        btnHome.target = "_blank";
                        btnHome.rel = 'noopener noreferrer'; // security layer that prevents tabnabbing via window.opener, and also prevents the destination site from seeing where the user came from
                        btnHome.href = homepage;
                        linksHolder.append(btnHome);
                    }


                    // build a container for the topics
                    let topicsHolder = document.createElement('div');
                    topicsHolder.setAttribute('class', 'topicsHolder');
                    topicsHolder.style.flexWrap = "wrap";

                    // add the topics holder to output
                    output.appendChild(
                        topicsHolder
                    );

                    // Topics
                    for (j = 0; j < topics.length; j++) {
                        let topic = document.createElement('a');
                        const query = `topic:${topics[j]}`;
                        topic.href = `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`;

                        topic.innerHTML = topics[j];
                        topic.style.backgroundColor = "black";
                        topic.style.color = "white";
                        topic.style.padding = ".25rem";
                        topic.style.borderRadius = "5px";
                        topicsHolder.append(topic);
                    }
                    topicsHolder.style.display = "flex";
                    topicsHolder.style.gap = ".5rem";
                }
                // All done, bye bye
                console.log("Fetching complete.");
            })


    } catch {
        console.log("There was an error.", error);
    }

})();