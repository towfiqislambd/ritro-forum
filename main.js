const loadAllPosts = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${searchText ? `?category=${searchText}` : ``}`);
    const data = await res.json();
    setTimeout(() => {
        displayAllPosts(data.posts)
    },2000)
}
const displayAllPosts = (posts) => {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    posts.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'flex gap-5 bg-slate-200 rounded-xl p-10 mb-5';
        div.innerHTML = `
                    <div class="relative">
                        <img src=${item.image} class="w-28 rounded-xl">
                        <div class="w-5 h-5 rounded-full absolute -top-2 -right-2 ${item.isActive ? 'bg-green-500' : 'bg-red-500'}"></div>
                    </div>
                    <div class="space-y-4 w-full">
                        <div class="flex gap-3 text-gray-400 font-medium">
                            <span># ${item.category}</span>
                            <span>Author: ${item.author.name}</span>
                        </div>
                        <h2 class="font-bold text-2xl text-gray-500">${item.title}</h2>
                        <p class="pb-1 text-gray-400 ">${item.description}</p>
                        <div class="border-gray-300 border-b-2 border-dashed"></div>
                        <div class="flex justify-between">
                            <div class="flex gap-4 text-gray-400 font-semibold items-center">
                                <p><i class="fa-regular fa-comment-dots"></i> <span>${item.comment_count}</span></p>
                                <p><i class="fa-regular fa-eye"></i> <span>${item.view_count}</span></p>
                                <p><i class="fa-regular fa-clock"></i> <span>${item.posted_time}</span></p>
                            </div>
                            <button onclick="handleDotBtn('${item.description}', '${item.view_count}')" class="btn min-h-0 grid place-items-center w-8 h-8 rounded-full bg-lime-500 text-white"><i class="fa-solid fa-envelope-open"></i></button>
                        </div>
                    </div>
        `;
        postsContainer.appendChild(div)
    })
}
const loadLatestPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPosts(data)
}
const displayLatestPosts = (posts) => {
    const latestPostContainer = document.getElementById('latest-posts');
    posts.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'card shadow-xl border text-left p-7';
        div.innerHTML = `
            <img src=${item.cover_image} class="rounded-xl">
                <div class="p-2">
                    <p class="py-4 text-gray-400"><i class="fa-regular fa-calendar-days"></i> ${item.author.posted_date ? item.author.posted_date : 'No Publish Date'}</p>
                    <h2 class="card-title mb-3">${item.title}</h2>
                    <p class="text-gray-600 mb-3">${item.description}</p>
                    <div class="flex gap-4 items-center">
                        <img src=${item.profile_image} class="w-16 h-16 rounded-full">
                        <div class="">
                            <h5 class="font-bold text-lg">${item.author.name}</h5>
                            <p class="text-gray-500">${item.author.designation ? item.author.designation : 'Unknown'}</p>
                        </div>
                    </div>
                </div>
        `;
        latestPostContainer.appendChild(div);
        console.log(item)
    })
}

const handleSearchByCategory = () => {
    const searchText = document.getElementById('search-categories').value;
    loadAllPosts(searchText)
}

const handleDotBtn = (description, views) => {
    const titlePart = document.getElementById('title-part');
    const div = document.createElement('div');
    div.classList = 'flex gap-3 bg-white p-5 rounded-lg text-gray-500 items-center mb-3';
    div.innerHTML = `
        <p class="">${description}</p>
        <div class="text-center">
            <i class="fa-regular fa-eye"></i>
            <span>${views}</span>
        </div>
    `
    titlePart.appendChild(div)
    let counter = document.getElementById('counter').innerText;
    let counterNumber = parseInt(counter);
    counterNumber++
    document.getElementById('counter').innerText = counterNumber
}

loadAllPosts()
loadLatestPosts()