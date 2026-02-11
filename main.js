let students = [];
let editIndex = -1;

function addStudent() {
  const username = document.getElementById("username").value.trim();
  const province = document.getElementById("province").value.trim();
  const email = document.getElementById("email").value.trim();
  const score = parseFloat(document.getElementById("score").value);

  if (!username || !province || !email || isNaN(score)) {
    alert("Please fill in all fields correctly!");
    return;
  }

  const student = { username, province, email, score, status: score >= 50 ? "Pass" : "Fail" };

  if(editIndex === -1){
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
    document.querySelector(".btn-primary").textContent = "Save";
  }

  clearForm();
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("username").value = student.username;
  document.getElementById("province").value = student.province;
  document.getElementById("email").value = student.email;
  document.getElementById("score").value = student.score;

  editIndex = index;
  document.querySelector(".btn-primary").textContent = "Update";
}

function deleteStudent(index){
  if(confirm("Are you sure to delete this student?")){
    students.splice(index,1);
    renderTable();
  }
}

function clearForm(){
  document.getElementById("username").value = "";
  document.getElementById("province").value = "";
  document.getElementById("email").value = "";
  document.getElementById("score").value = "";
}

function renderTable(){
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";
  students.forEach((s,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${s.username}</td>
      <td>${s.province}</td>
      <td>${s.email}</td>
      <td>${s.score}</td>
      <td>${s.status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function searchStudent(){
  const query = document.getElementById("searchInput").value.toLowerCase();
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";

  students.filter(s =>
    s.username.toLowerCase().includes(query) ||
    s.province.toLowerCase().includes(query) ||
    s.email.toLowerCase().includes(query)
  ).forEach((s,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${s.username}</td>
      <td>${s.province}</td>
      <td>${s.email}</td>
      <td>${s.score}</td>
      <td>${s.status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}