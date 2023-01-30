const btn = document.querySelector('.request');

btn.addEventListener('click', () => {
    const value1 = +document.getElementById('num1').value;
    const value2 = +document.getElementById('num2').value;

    let notNumber = document.getElementById('text-result');
    notNumber.textContent = '';
    if (isNaN(value1) || isNaN(value2)) {
        notNumber.textContent = 'Один из введных параметров не является числом!';    
    } else if (value1 < 100 || value1 > 300 || value2 < 100 || value2 > 300) {
        notNumber.textContent = 'Одно из чисел вне диапазона от 100 до 300!'; 
    } else {
        fetch(`https://picsum.photos/${value1}/${value2}`)
            .then((response) => {
                document.getElementById('img-result').src = response.url;
            });
    }
});