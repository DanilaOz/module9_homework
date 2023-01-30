function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            };
        };
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

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
  
const resultNode = document.querySelector('.j-result'); // Node для вставки результата
const btnNode = document.querySelector('.j-btn-request'); // Поиск кнопки, по нажатии на которую будет запрос
btnNode.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    let outOfRange = document.getElementById('result'); 
    if (value > 0 && value <= 10) {       
        useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
    } else {
        outOfRange.textContent = '';
        outOfRange.textContent = 'Число вне диапазона от 1 до 10';
    }
});