function openSearchResults() {

    var x = document.getElementById("searchInput").value.replace(/ /g,'');
    if(x!==""){
        showData('categories-container', 'keywords-container');
        document.getElementById("search-input").innerHTML = document.getElementById("searchInput").value;
        document.getElementById("search-input-result").innerHTML = '"' + document.getElementById("searchInput").value + '"';
        document.getElementById("dropdown").style.display="block";
    }else{
        document.getElementById("dropdown").style.display="none";
    }

}

function httpPostDeneme(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "demo_post.asp", true);
    xhttp.send();
}

function showData(categoryContainer, keywordContainer, topThreeProductContainer){

    var suggestedTopCategories = getSuggestedTopCategories();

    const categoriesContainer = document.getElementById(categoryContainer);
    
    while (categoriesContainer.firstChild) {
        categoriesContainer.removeChild(categoriesContainer.firstChild);
    }
 
    suggestedTopCategories.forEach(category => {
        
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const p = document.createElement('p');
        p.textContent = category;

        categoriesContainer.appendChild(card);
        card.appendChild(p);
    });

    var suggestedKeywords = getSuggestedKeywords();
    const keywordsContainer = document.getElementById(keywordContainer);
    
    while (keywordsContainer.firstChild) {
        keywordsContainer.removeChild(keywordsContainer.firstChild);
    }
    suggestedKeywords.forEach(keyword => {
        const p = document.createElement('p');
        p.textContent = keyword;

        keywordsContainer.appendChild(p);
    });


    // var topThreeProducts = getTopThreeProductsWithImages();
    // const topThreeProductsContainer = document.getElementById(topThreeProductContainer);
    
    // while (topThreeProductsContainer.firstChild) {
    //     topThreeProductsContainer.removeChild(topThreeProductsContainer.firstChild);
    // }
    // topThreeProducts.forEach(product => {
    //     const p = document.createElement('p');
    //     p.textContent = product;

    //     keywordsContainer.appendChild(p);
    // });

    
}

function closeSearchResult() {
    document.getElementById("searchInput").value="";
    document.getElementById("dropdown").style.display="none";
}

function closeSmallScreenSearchResult(){
    document.getElementById("searchInput").value="";
    document.getElementById("dropdown").style.display="none";
}
function getSuggestedTopCategories(searchInput){
    let categories = [
        "Polyethylene Fittings",
        "Pool Chemicals",
        "Electrical Testers and tools"
    ];

    return categories;
}

function getSuggestedKeywords(searchInput){
    let keywords = [
        "voltage tester",
        "tester",
        "electrical tester"
    ];

    return keywords;
}

function getTopThreeProductsWithImages(searchInput){
    let products = [
        {
            title:"Test Cap 3(Polyethylene)",
            base64source:""
        },
        {
            title:"Sodium Chloride Test Strips",
            base64source:""
        },
        {
            title:"Test Lead Set",
            base64source:""
        }
    ];

    return products;
}