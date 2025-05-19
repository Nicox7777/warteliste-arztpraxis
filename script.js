const patientList = document.getElementById("patientList");

function addPatient() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();
    if (name === "") return;

    const li = document.createElement("li");
    li.textContent = name;
    patientList.appendChild(li);
    nameInput.value = "";
}
