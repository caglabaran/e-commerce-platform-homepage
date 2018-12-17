function openSearchResults() {

    var searchInput = document.getElementById("searchInput").value.replace(/ /g,'');
    if(searchInput!=="" && searchInput.length>2){
        showData(searchInput);
        document.getElementById("search-input").innerHTML = document.getElementById("searchInput").value;
        document.getElementById("search-input-result").innerHTML = '"' + document.getElementById("searchInput").value + '"';
        document.getElementById("dropdown").style.display="block";
    }else{
        document.getElementById("dropdown").style.display="none";
    }

}


function showData(searchInput, topThreeProductContainer){
    var categoryContainer ='categories-container';
    var keywordContainer = 'keywords-container';
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

    getTopThreeProductsWithImages(searchInput);
    
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
    var divIsVisible = false;

    const topThreeProductsContainer = document.getElementById('images-container');

    if (topThreeProductsContainer.style.display != "none") {
        divIsVisible = true;
    }

    if(topThreeProductsContainer && divIsVisible){
        while (topThreeProductsContainer.firstChild) {
            topThreeProductsContainer.removeChild(topThreeProductsContainer.firstChild);
        }
    }

    let apikey="gtjdf6yfeebwyw9pp9s6tmyd";
    let url="http://localhost:5000/products/" + searchInput;
    // let url="http://localhost:5000/suggestedKeywords/" + keyword;

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var topThreeProducts = JSON.parse(xhttp.responseText);
            if(topThreeProductsContainer && divIsVisible){
                while (topThreeProductsContainer.firstChild) {
                    topThreeProductsContainer.removeChild(topThreeProductsContainer.firstChild);
                }
                if(topThreeProducts && topThreeProducts.items){
                    let i=0;
                    let arrayLength = topThreeProducts.items.length>3 ? 3: topThreeProducts.items.length;
                    for(i=0;i<arrayLength;i++) {
                        const firstDiv = document.createElement('div');
                        firstDiv.className="top-product-container";

                        const firstImage = document.createElement('img');
                        firstImage.class ="image-size";
                        firstImage.src= topThreeProducts.items[i].thumbnailImage;
                        const firstP = document.createElement('p');
                        firstP.textContent = topThreeProducts.items[i].name;
        
                        firstDiv.appendChild(firstImage);
                        firstDiv.appendChild(firstP);

                        topThreeProductsContainer.appendChild(firstDiv);
                    }
                }
            }
        }
    };
    xhttp.open("GET", url);
    xhttp.send();
}