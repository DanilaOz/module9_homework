// Задача - написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль

const parser = new DOMParser();

// XML
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentNodes = [...listNode.querySelectorAll("student")]; // ... оператор расширения. Разбивает объект на набор элементов, в итоге получаем массив элементов
//console.log(studentNodes);
const list = [];
studentNodes.forEach(studentNodes => {
    const nameNode = studentNodes.querySelector("name");
    const firstNameNode = studentNodes.querySelector("first");
    const secondNameNode = studentNodes.querySelector("second");
    const ageNode = studentNodes.querySelector("age");
    const profNode = studentNodes.querySelector("prof");
    const langAttr = nameNode.getAttribute("lang");
    list.push({
        name: firstNameNode.textContent + ' ' + secondNameNode.textContent,
        age: Number(ageNode.textContent),
        prof: profNode.textContent,
        lang: langAttr
    });
});

const result = {
    list: list
}

console.log(result);