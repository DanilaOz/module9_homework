// Задача - написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль

// JSON
const jsonString = `
{
    "list": [
        {
            "name": "Petr",
            "age": "20",
            "prof": "mechanic"
        },
        {
            "name": "Vova",
            "age": "60",
            "prof": "pilot"
        }
    ]
}`;

// Получение данных

const data = JSON.parse(jsonString);
const list = data.list;

const listArray = [];
list.forEach(person => {
  listArray.push({
    name: person.name,
    age: Number(person.age),
    prof: person.prof
  });
})

const result = {
  list: listArray
}

console.log(result);