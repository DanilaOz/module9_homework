const resultNode = document.querySelector('.photos-result'); // Node для вставки результата
const btn = document.querySelector('.request'); // Поиск кнопки, по нажатии на которую будет запрос

// Вставка картинок
function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img src="${item.download_url}" class="card-image"></img>
            <p>${item.author}</p>
        </div> `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}

// Сохранение последного запоса в localStrage
function lastSuccessfulRequest() {
    localStorage.setItem('photos_from_last_successful_request', resultNode.innerHTML);
    //console.log('Данные успешно записаны в localStorage');
    //console.log(resultNode);
}

// Получение данных из localStorage
function getStorage() {
    resultNode.innerHTML = localStorage.getItem('photos_from_last_successful_request');
}

// Вызов getItem из localStorage. Будет выведен прошлый запрос.
getStorage();

// Обработчик кнопки
btn.addEventListener('click', () => {
    const pageNumber = +document.getElementById('num1').value;
    const limit = +document.getElementById('num2').value;

    let notNumber = document.getElementById('text-result');
    notNumber.textContent = '';
    if (isNaN(pageNumber) || isNaN(limit)) {
        notNumber.textContent = 'Один из введных параметров не является числом!';    
    } else if ((pageNumber < 1 || pageNumber > 10) && (limit < 1 || limit > 10)) {
        notNumber.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10!';
    } else if (pageNumber < 1 || pageNumber > 10) {
        notNumber.textContent = 'Номер страницы вне диапазона от 1 до 10!'; 
    } else if (limit < 1 || limit > 10) {
        notNumber.textContent = 'Лимит вне диапазона от 1 до 10!';
    } else {
        fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
            .then((response) => response.json()) // Чтение ответа в формате JSON
            .then((json) => {
                displayResult(json); // Вызов функции отображения картинок и передача JSON
                lastSuccessfulRequest();
            })
            .catch((error) => {
                console.log('Error', error.message);
            });
    }
});
