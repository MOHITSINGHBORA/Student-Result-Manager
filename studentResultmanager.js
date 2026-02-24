const form = document.getElementById("studentForm");
const rollInput = document.getElementById("roll");
const nameInput = document.getElementById("name");
const marksInput = document.getElementById("marks");
const tableBody = document.getElementById("studentTable");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

let students = new Map();
let editingRoll = null;

function loadData() {
    const savedData = JSON.parse(localStorage.getItem("students"));
    if (savedData) {
        students = new Map(savedData);
        renderTable();
    }
}

function saveData() {
    localStorage.setItem("students", JSON.stringify([...students]));
}

function calculateGrade(marks) {
    if (marks >= 450) return "A";
    if (marks >= 400) return "B";
    if (marks >= 350) return "C";
    if (marks >= 300) return "D";
    return "Fail";
}

function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((value, key) => {
       
        const row = `
            <tr>
                <td data-label="Roll No">${key}</td>
                <td data-label="Name">${value.name}</td>
                <td data-label="Marks">${value.marks}</td>
                <td data-label="Grade">${value.grade}</td>
                <td data-label="Action">
                    <div class="action-buttons">
                        <i class="fa-solid fa-pencil edit" onclick="editStudent('${key}')" title="Edit"></i>
                        <i class="fa-solid fa-trash delete" onclick="deleteStudent('${key}')" title="Delete"></i>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const marks = Number(marksInput.value);

    if (!name || marksInput.value.trim() === "") {
        message.textContent = "All fields are required!";
        message.style.color = "red";
        return;
    }

    if (marks < 0 || marks > 500) {
        message.textContent = "Marks must be between 0 and 500!";
        message.style.color = "red";
        return;
    }

    const grade = calculateGrade(marks);

    if (editingRoll) {
        students.set(editingRoll, { name, marks, grade });
        message.textContent = "Student updated successfully!";
        message.style.color = "green";

        submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i>'; 
        rollInput.disabled = false;
        editingRoll = null;
    } else {
        const roll = rollInput.value.trim();

        if (!roll) {
            message.textContent = "Roll number is required!";
            message.style.color = "red";
            return;
        }

        if (students.has(roll)) {
            message.textContent = "Roll Number already exists!";
            message.style.color = "red";
            return;
        }

        students.set(roll, { name, marks, grade });
        message.textContent = "Student added successfully!";
        message.style.color = "green";
    }

    saveData();
    renderTable();
    form.reset();

    setTimeout(() => message.textContent = "", 2000);
});

function editStudent(roll) {
    const student = students.get(roll);
    if (!student) return;

    rollInput.value = roll;
    nameInput.value = student.name;
    marksInput.value = student.marks;

    rollInput.disabled = true;

    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i>';  
    editingRoll = roll;

    message.textContent = `Editing student with Roll No: ${roll}`;
    message.style.color = "yellow";

    form.scrollIntoView({ behavior: "smooth" });
}

function deleteStudent(roll) {
    if (editingRoll === roll) {
        cancelEdit();
    }
    students.delete(String(roll));
    saveData();
    renderTable();
}

function cancelEdit() {
    editingRoll = null;
    form.reset();
    submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    rollInput.disabled = false;
    message.textContent = "";
}

loadData();