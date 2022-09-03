const loadCategoryTitle = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategoryTitle(data.data.news_category))
        .catch(error => console.log('There is a ' + error))
}
const displayCategoryTitle = (datas) => {
    console.log(datas)
    const categoryTitleContainer = document.getElementById('category-title');
    datas.forEach(data => {
        const li = document.createElement('li');
        li.classList.add('md:p-4')
        li.innerText =`${data.category_name}`
        categoryTitleContainer.appendChild(li)
    });
}
loadCategoryTitle()