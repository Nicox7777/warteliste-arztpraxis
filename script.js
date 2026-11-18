const patientList = document.getElementById("patientList");
const nameInput = document.getElementById("nameInput");

function update() {
    const n = patientList.children.length;
    document.getElementById("count").textContent = n + (n === 1 ? " Person" : " Personen");
    document.getElementById("empty").hidden = n > 0;
}

document.getElementById("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name === "") return;

    const li = document.createElement("li");
    li.textContent = name;
    patientList.appendChild(li);
    nameInput.value = "";
    update();
});

update();
