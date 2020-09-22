function showTab(tab){
    hideAllTabs()
    document.getElementById(tab).style.display = "";
}

function hideAllTabs(){
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
}

function getMediumPosts(){
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@santiaguf')
    .then((res) => res.json())
    .then((data) => {
        // Fillter the array
        const res = data.items //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

        function toText(node) {
            let tag = document.createElement('div')
            tag.innerHTML = node
            node = tag.innerText
            return node
        }

        function shortenText(text,startingPoint ,maxLength) {
        return text.length > maxLength?
            text.slice(startingPoint, maxLength):
            text
        }

        let output = '';
        posts.forEach((item) => {
            output += `
                <a href="${item.link}">
                <div class="blog__content">
                    <div class="blog_preview">
                        <h2 class="blog__title">${item.title+' - '+shortenText(item.pubDate,0 ,10)}</h2>
                        <img src="${item.thumbnail}" class="blog__topImg"></img>
                        <p class="blog__intro">${shortenText(toText(item.content),0, 300)+ '...'}</p>
                    </div>
                    <hr>
                </div>
                <a/>`
        })
        document.querySelector('.blog__slider').innerHTML = output
        });
}

hideAllTabs();
getMediumPosts();

document.getElementById("year").innerHTML = new Date().getFullYear();