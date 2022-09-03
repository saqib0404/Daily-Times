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
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log('There is a ' + error))
}
const displayNews = (datas) => {
    console.log(datas)
    const searchResult = document.getElementById('search-result')
    if(datas.length === 0){
        searchResult.innerText=`O News Found`
    }
    else if(datas.length > 0){
        searchResult.innerText=`${datas.length} News Found`
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ''
    datas.forEach(data => {
        console.log(data)
        const singleNews = document.createElement('div');
        singleNews.classList.add('newses', 'w-9/12', 'mx-auto')
        singleNews.innerHTML = `
                <div class="news md:flex gap-3 p-2">
                    <div class="news-img-container">
                        <img class="mx-auto news-img" src="${data.image_url}" alt="">
                    </div>
                    <div class="news-details">
                        <h2 class="text-3xl text-center md:text-start mb-5">${data.title}</h2>
                        <p>${data.details.length > 200 ?  data.details.slice(0,200) + '...' : data.details}</p>
                        <div class="news-details-footer mt-5 flex  flex-col md:flex-row gap-2 items-center justify-around ">
                            <div class="flex items-center gap-2">
                                <img class="author-img" src="${data.author.img}" alt="">
                                <div class="author-details flex flex-col">
                                    <span>${data.author.name ? data.author.name : "No Data Found" }</span>
                                    <span>${data.author.published_date ? data.author.published_date : "No Data Found"}</span>
                                </div>
                            </div>
                            <p class="text-xl font-semibold flex items-center gap-2"> <i class="fa-solid fa-eye"></i>${data.rating.number}</p>
                            <span>
                                <button class="px-4 py-1 bg-indigo-700 text-white rounded font-semibold">Details</button>
                            </span>
                        </div>
                    </div>
                </div>
        `
        newsContainer.appendChild(singleNews)
    });
}
loadCategoryTitle()