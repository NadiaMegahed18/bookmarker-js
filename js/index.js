// DOM==============================================
const siteNameInput = document.getElementById('siteName');
const siteURLInput = document.getElementById('siteURL');
const submitBtn = document.getElementById('submitBtn');
const tableBody = document.getElementById('tableBody');

// Modal====================================
const validationModal = document.getElementById('validationModal');
const closeBtn = document.querySelector('.close-btn');

// Bookmarks======================================
let bookmarkList = [];

// down load  saved data ==================================
if (localStorage.getItem('bookmarks')) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}

// ----------------------====================(Validation)======================================= ----------------------

function isValidURL(url) {

    const urlRegex = new RegExp(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    );
    return urlRegex.test(url);
}

function validateInputs() {
    const name = siteNameInput.value.trim();
    const url = siteURLInput.value.trim();

    
    const isNameValid = name.length >= 3;
    

    const isURLValid = isValidURL(url);

    if (isNameValid && isURLValid) {

        validationModal.style.display = 'none';
        return true;
    } else {

        validationModal.style.display = 'block';
        return false;
    }
}


// ----------------------============================= CRUD =====================================----------------------

function addBookmark() {
    if (!validateInputs()) {
        return; 
    }
    const bookmark = {
        name: siteNameInput.value.trim(),
        url: siteURLInput.value.trim(),
    };


    bookmarkList.push(bookmark);


    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    displayBookmarks();
    clearInputs();
}


function displayBookmarks() {
    let tableRows = '';
    
    for (let i = 0; i < bookmarkList.length; i++) {
        const bookmark = bookmarkList[i];
        tableRows += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmark.name}</td>
                <td>
                    <button class="visit-btn" onclick="visitWebsite('${bookmark.url}')">
                        <i class="fa-solid fa-eye"></i> Visit
                    </button>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteBookmark(${i})">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }
    
    tableBody.innerHTML = tableRows;
}


function clearInputs() {
    siteNameInput.value = '';
    siteURLInput.value = '';
}
function visitWebsite(url) {

    let properUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        properUrl = 'http://' + url;
    }
    window.open(properUrl, '_blank');
}


function deleteBookmark(index) {

    bookmarkList.splice(index, 1) 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    

    displayBookmarks();
}


// ----------------------=========================Event Listeners============================== ----------------------


submitBtn.addEventListener('click', addBookmark);


closeBtn.onclick = function() {
    validationModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == validationModal) {
        validationModal.style.display = 'none';
    }
}