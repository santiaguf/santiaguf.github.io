let count = 0;

const getMediumPosts = () => {
    const apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@santiaguf';
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
        // Fillter the array
        const res = data.items;
        // This is an array with the content. No feed, no info about author etc..
        const posts = res.filter((item) => item.categories.length > 0); // That's the main trick* !

        function toText(node) {
            const tag = document.createElement('div');
            tag.innerHTML = node;
            const newNode = tag.innerText;
            return newNode;
        }

        function shortenText(text, startingPoint, maxLength) {
            return text.length > maxLength
            ? text.slice(startingPoint, maxLength)
            : text;
        }

        let output = '';
        posts.forEach((item) => {
            output += `
                    <div class="blog__content">
                        <div class="blog_preview">
                            <a href="${item.link}">
                                <h4 class="blog__title">${`${item.title}`}</h4>
                            </a>
                            <p class="blog__date">${shortenText(item.pubDate, 0, 10)}</p>
                            <p class="blog__intro">${shortenText(toText(item.content), 0, 300)}...</p>
                        </div>
                        <div class="post-image">
                            <a href="${item.link}">
                                <img src="${item.thumbnail}" class="blog__topImg"></img>
                            </a>
                        </div>
                    </div>`;
        });
        document.querySelector('.blog__slider').innerHTML = output;
    });
};

document.getElementById('year').innerHTML = new Date().getFullYear();

const tab1label = document.getElementById('tab1');
tab1label.addEventListener('click', () => {
    const tabs = document.getElementById('tabs');
    tabs.classList.remove(...tabs.classList);
    tabs.classList.add('tab1');
});

const tab2label = document.getElementById('tab2');
tab2label.addEventListener('click', () => {
    const tabs = document.getElementById('tabs');
    tabs.classList.remove(...tabs.classList);
    tabs.classList.add('tab2');
});

const tab3label = document.getElementById('tab3');
tab3label.addEventListener('click', () => {
    const tabs = document.getElementById('tabs');
    tabs.classList.remove(...tabs.classList);
    tabs.classList.add('tab3');
});

const tab4label = document.getElementById('tab4');
tab4label.addEventListener('click', () => {
    const tabs = document.getElementById('tabs');
    tabs.classList.remove(...tabs.classList);
    tabs.classList.add('tab4');
});

const tab5label = document.getElementById('tab5');
tab5label.addEventListener('click', () => {
    const tabs = document.getElementById('tabs');
    tabs.classList.remove(...tabs.classList);
    tabs.classList.add('tab5');
});

const tab6label = document.getElementById('tab6');
tab6label.addEventListener('click', () => {

    const tabs = document.getElementById('tabs');
    tabs.classList.remove(...tabs.classList);
    tabs.classList.add('tab6');

    if(count == 0){
        getMediumPosts();
        count += 1;
    }
});
