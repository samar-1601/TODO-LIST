update();// Updates the table with whatever the initial value is there in the localstorage;

let add = document.getElementById("add");

add.addEventListener("click",getAndUpdate);


function getAndUpdate()
{
    console.log('adding');
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    if(localStorage.getItem('itemsJson') == null && title !='')
    {
        taskJsonArray = [];
        taskJsonArray.push([title,description]);
        localStorage.setItem('itemsJson',JSON.stringify(taskJsonArray));
    }
    else if(title != ''){
        taskJsonArrayString = localStorage.getItem('itemsJson');
        taskJsonArray = JSON.parse(taskJsonArrayString);
        taskJsonArray.push([title,description]);
        localStorage.setItem('itemsJson',JSON.stringify(taskJsonArray));
    }
    
    update();
}
function update()
{
    if(localStorage.getItem('itemsJson') == null)
    {
        taskJsonArray = [];
        localStorage.setItem('itemsJson',JSON.stringify(taskJsonArray));
    }
    else {
        taskJsonArrayString = localStorage.getItem('itemsJson');
        taskJsonArray = JSON.parse(taskJsonArrayString);
        localStorage.setItem('itemsJson',JSON.stringify(taskJsonArray));
    }
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
// Code for Entering the user entries in th table
let tableBody = document.getElementById('tableBody');
dataString = '';
taskJsonArray.forEach((element,index) => {
    if(element[0] == '');
    
    else
    dataString += `
    <tr>
        <th scope="row">${index +1 }</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick = "deleteEntry(${index})">Delete</button></td>
    </tr>
    `    
});

tableBody.innerHTML = dataString;

}

function deleteEntry(itemIndex)
{
    if(confirm("Have you really completed this task and want to delete it ?"))
    {
        console.log('Deleting');
        taskJsonArrayString = localStorage.getItem('itemsJson');
        taskJsonArray = JSON.parse(taskJsonArrayString);
        taskJsonArray.splice(itemIndex,1);
        localStorage.setItem('itemsJson',JSON.stringify(taskJsonArray));
        update();
    }
}

function clearList()
{
    if(confirm("Do you want to clear the entire list ?"))
    {
        localStorage.clear();
        update();
    }
}
