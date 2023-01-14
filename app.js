const inputs = document.getElementById("inputs");

inputs.addEventListener("submit", addItem)

async function addItem(e)
{
    e.preventDefault();
    const name = e.target.name.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";

    const item = {name, amount, description};
    const itemRes = await axios.post("https://crudcrud.com/api/0ab22d87c1cd482781825ab80c5b339a/data", item);
    showItemOnScreen(itemRes.data);
    console.log(itemRes.data)
}

function showItemOnScreen(item)
{
    const itemToAdd = `<li style="margin-bottom: 10px" id="${item._id}"> ${item.name} : ${item.amount} : ${item.description} 
    <button class="btn btn-primary" onclick=editItem("${item._id}","${item.name}","${item.amount}","${item.description}")>Edit</button>
    <button class="btn btn-warning" onclick=deleteItem("${item._id}")>Delete</button>
    </li>`;

    const itemsList = document.getElementById("output");
    itemsList.innerHTML = itemsList.innerHTML + itemToAdd;

}

function editItem(id, name, amount, description, )
{
    document.getElementById("name").value = name;
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    deleteItem(id);
}

async function deleteItem(id)
{
    const itemToBeDeleted = document.getElementById(id);
    document.getElementById("output").removeChild(itemToBeDeleted);
    await axios.delete(`https://crudcrud.com/api/0ab22d87c1cd482781825ab80c5b339a/data/${id}`);
}

window.addEventListener("DOMContentLoaded", async()=> {
    const reponse = await axios.get(`https://crudcrud.com/api/0ab22d87c1cd482781825ab80c5b339a/data`);

    for (let item of  reponse.data)
    {
        showItemOnScreen(item);
    }
})


