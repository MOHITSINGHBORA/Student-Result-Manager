# Student Result Manager

A simple and interactive Student Result Management System built using HTML, CSS, and JavaScript.  
This project allows users to add, edit, delete, and store student records in the browser using LocalStorage.

---

## Features

- Add new student records
- Edit existing student details
- Delete student records
- Automatic grade calculation
- Data persistence using LocalStorage
- Responsive design (Mobile Friendly)
- Clean and modern UI

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API
- Font Awesome
- Google Fonts

---

## Project Structure

Student-Result-Manager/
│
├── index.html
├── studentResultmanager.css
├── studentResultmanager.js
└── README.md

---

##  How It Works

### 1. Adding a Student
- Enter Roll Number
- Enter Student Name
- Enter Marks
- Click the Add button
- Grade is automatically calculated

### 2. Grade Calculation Logic

| Marks Range | Grade |
|-------------|--------|
| 90+         | A      |
| 75 - 89     | B      |
| 60 - 74     | C      |
| 40 - 59     | D      |
| Below 40    | Fail   |

---

### 3. Editing a Student
- Click the Edit icon
- Update the details
- Click Update
- Data is saved automatically

---

### 4. Deleting a Student
- Click the Delete icon
- Record will be removed instantly

---

## Data Storage

This project uses LocalStorage to store student data in the browser.

Since JavaScript Map cannot be directly stored in LocalStorage, it is converted into an array using the spread operator before saving:

localStorage.setItem("students", JSON.stringify([...students]));

---

## How to Run the Project

1. Download or clone the repository
2. Open index.html in your browser
3. Start adding student records

No installation required.

---

## Future Improvements

- Search functionality
- Filter by grade
- Sort by marks
- Export to PDF
- Confirmation before delete
- Toast notifications


---

## License

This project is free to use for learning purposes.