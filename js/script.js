const loadCategoryTitle = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategoryTitle(data.data.news_category))
        .catch(error => console.log('There is a ' + error))
}
const displayCategoryTitle = (datas) => {
    // console.log(datas)
    const categoryTitleContainer = document.getElementById('category-title');
    datas.forEach(data => {
        // console.log(data.category_id)
        const singleCategory = document.createElement('span');
        singleCategory.innerHTML = `
        <button onclick="loadNews(${data.category_id})" class="m-2 p-2 md:m-4">${data.category_name}</button>
        `
        categoryTitleContainer.appendChild(singleCategory)
    });
}

const loadNews = (id) => {
    document.getElementById('spinner').classList.remove('hidden')
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log('There is a ' + error))
}
const displayNews = (datas) => {
    datas.sort((a,b)=> b.total_view - a.total_view)
    // console.log(datas)
    const searchResult = document.getElementById('search-result')
    if (datas.length === 0) {
        searchResult.innerText = `No News Available`
        document.getElementById('spinner').classList.add('hidden')
    }
    else if (datas.length > 0) {
        searchResult.innerText = `${datas.length} News Available`
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ''
    datas.forEach(data => {
        // console.log(data)
        const singleNews = document.createElement('div');
        singleNews.classList.add('newses', 'w-9/12', 'mx-auto')
        singleNews.innerHTML = `
                <div class="news md:flex gap-3 p-2 mb-5">
                    <div class="news-img-container flex">
                        <img class="mx-auto news-img rounded-lg items-center" src="${data.thumbnail_url}" alt="">
                    </div>
                    <div class="news-details">
                        <h2 class="text-3xl text-center md:text-start mb-5">${data.title}</h2>
                        <p>${data.details.length > 200 ? data.details.slice(0, 200) + '...' : data.details}</p>
                        <div class="news-details-footer mt-5 flex  flex-col md:flex-row gap-2 items-center justify-around ">
                            <div class="flex items-center gap-2">
                                <img class="author-img" src="${data.author.img}" alt="">
                                <div class="author-details flex flex-col">
                                    <span>${data.author.name ? data.author.name : "No Data Found"}</span>
                                    <span>${data.author.published_date ? data.author.published_date : "No Data Found"}</span>
                                </div>
                            </div>
                            <p class="text-xl font-semibold flex items-center gap-2"> <i class="fa-solid fa-eye"></i>${data.total_view ? data.total_view : "No Data Found"}</p>
                            <span>
                                <label onclick = "loadNewsDetails('${data._id}')" for="my-modal-6" class="btn px-4 py-1 bg-indigo-700 text-white rounded font-semibold">Details</label>
                            </span>
                        </div>
                    </div>
                </div>
        `
        newsContainer.appendChild(singleNews)
        document.getElementById('spinner').classList.add('hidden')
    });
}

const loadNewsDetails = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log('There is a ' + error))
}
const displayNewsDetails = (datas) => {
    const modalContainer = document.getElementById('modal-conatiner');
    modalContainer.textContent=``
    datas.forEach(data => {
        console.log(data)
        const modal = document.createElement('div');
        modal.innerHTML=`
        <img src="${data.image_url}" alt="">
        <p class="font-bold text-indigo-600">${data.others_info.is_todays_pick ? "The News Is Today's" : "This news is not collected Today"}</p>
        <p class="font-bold text-indigo-600">${data.others_info.is_trending ? "One of the tranding News" : "Not Trendy"}</p>
        <h3 class="font-bold text-lg">${data.title}</h3>
        <p class="py-4">Details: ${data.details}</p>
        <p>Ratings- ${data.rating.number}</p>
        `
        modalContainer.appendChild(modal)
    });
}

loadNews(08)
loadCategoryTitle()