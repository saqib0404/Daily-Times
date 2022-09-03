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
        const span = document.createElement('span');
        span.innerHTML = `
        <button onclick="loadNews(${data.category_id})" class="m-2 p-2 md:m-4 bg-red-200">${data.category_name}</button>
        `
        categoryTitleContainer.appendChild(span)
    });
}

const loadNews = (id) => {
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log('There is a ' + error))
}
loadCategoryTitle()