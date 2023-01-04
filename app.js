const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchBook = displayStyle => {
    document.getElementById('result-div').style.visibility = displayStyle;
}
const toggleResultnumber = displayStyle =>{
     document.getElementById('result-number').style.visibility = displayStyle;
}



const searchData = () => {
    const inputText = document.getElementById('search-text')
    const searchText = inputText.value;
    //clear data
    inputText.value = '';
    if(searchText === ''){
        alert('please input some text')
    }
    else{
        toggleSpinner('none');
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.docs))
        //Spinner
    toggleSpinner('block');
    toggleSearchBook('hidden')
    toggleResultnumber('hidden')
    }    
}

const displayData = books =>{
    const resultDiv = document.getElementById('result-div')
    const resultNumber = document.getElementById('result-number')
    resultNumber.innerText = `Total search result ${Object.keys(books).length}`
    resultDiv.textContent = "";
    
    books.forEach(book=>{
    const div = document.createElement('div')
    div.classList.add('col')
    let bookSrc = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    if(book.cover_i === undefined){
        bookSrc = 'https://libribook.com/Images/across-bridge-pdf.jpg';
    }
    div.innerHTML = `
    <div class="card">
    <img src=${bookSrc} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${book.title.slice(0,50)}</h5>
      <p class="card-text"><small class="text-muted">By</small> ${book.author_name}</p>
      
      <p><small>First Publish In</small>${book.first_publish_year}</p>
      
    </div>
    </div>
`
resultDiv.appendChild(div)

///spinner
toggleSpinner('none');
toggleSearchBook('visible')
toggleResultnumber('visible')

})
}


