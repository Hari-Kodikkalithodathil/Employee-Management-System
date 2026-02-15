let allEmployees=[];
let currentPage=0;
const limit=5;

let filteredData=[];

const renderEmployees = ((data) => {
    const tableBody = document.getElementById('tbody');
    let rows = "";
    const start = currentPage * limit;
    const end = start + limit;
    const pageData = data.slice(start, end);
    pageData.forEach((employee, index)=>{
        rows += `
        <tr>
            <td>${index + 1}</td>
            <td>${employee.salutation}. ${employee.firstName} ${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.country}</td>
        </tr>`
        tableBody.innerHTML = rows;
    });
});


async function getEmployees() {
    // let fetchPromise = fetch("http://localhost:3000/employees")

    // let jasonPromise = fetchPromise.then(function (response) {
    //     return (response.json());
    // })

    // let finalPromise = jasonPromise.then((data) => {
    //     renderEmployees(data)
    // });

    // finalPromise.catch((err) => {
    //     console.log(err);
    // })

    try {
        let response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        allEmployees = data;
        filteredData = data;
        renderEmployees(filteredData);
        generatePaginationButtons()
    }
    catch(error){
        console.log("Error fetching employees data", error);
    }
    
}

function generatePaginationButtons(){
    const pagination = document.getElementById('pagination');
    pagination.innerHTML="";
    const totalPages = Math.ceil(filteredData.length/limit);
    for(let i=0; i<totalPages; i++){
        const button = document.createElement('button');
        button.textContent = i+1;

        button.classList.add('btn','btn-outline-primary');

        button.addEventListener('click', (() => {
            currentPage = i;
            renderEmployees(filteredData);
            
        }))
        pagination.appendChild(button)
    }
}


// chatgpt
// function generatePaginationButtons(){
//     const pagination = document.getElementById('pagination');
//     pagination.innerHTML = ""; // 🔥 CLEAR OLD BUTTONS

//     const totalPages = Math.ceil(filteredData.length/limit);

//     for(let i=0; i<totalPages; i++){
//         const button = document.createElement('button');
//         button.textContent = i+1;
//         button.classList.add('btn','btn-outline-primary');

//         button.addEventListener('click', () => {
//             currentPage = i;
//             renderEmployees(filteredData);
//         });

//         pagination.appendChild(button)
//     }
// }


function searchEmployees(query){
    return allEmployees.filter(emp=>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query)
    )
}


// chatgpt
// function searchEmployees(query){
//     return allEmployees.filter(emp =>
//         emp.firstName.toLowerCase().includes(query) ||
//         emp.lastName.toLowerCase().includes(query) ||
//         emp.email.toLowerCase().includes(query)
//     );
// }

document.getElementById("searchBtn").addEventListener("click", (e)=>{
    e.preventDefault();
    const query = document.getElementById("search").value.toLowerCase();
    filteredData = searchEmployees(query);
    currentPage = 0;
    renderEmployees(filteredData);
    generatePaginationButtons();
})


// chatgpt
// document.getElementById("searchBtn").addEventListener("click", (e)=>{
//     e.preventDefault();   // 🔥 prevents form reload

//     const query = document.getElementById("search").value.toLowerCase();

//     filteredData = searchEmployees(query);
//     currentPage = 0;

//     renderEmployees(filteredData);
//     generatePaginationButtons();
// })

function formClose(){
    document.getElementById('firstname').value="";
    document.getElementById('lastname').value="";
    document.getElementById('email').value="";
    document.getElementById('number').value="";
    document.getElementById('dob').value="";
    document.getElementById('qualification').value="";
    document.getElementById('address').value="";
    document.getElementById('city').value="";
    document.getElementById('pin').value="";
    document.getElementById('country').value="";
    document.getElementById('state').value="";
    document.getElementById('salutation').value="1";
    document.getElementById('radio1').checked=false;
    document.getElementById('radio2').checked=false;


}
document.getElementById('cancel-btn').addEventListener("click",formClose);
document.getElementById('close-icon').addEventListener("click",formClose);

document.getElementById('adding-employee-btn').addEventListener("click", ()=>{
    const employeeData = {
        salutation: document.getElementById('salutation').value,
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('number').value,
        dob: document.getElementById('dob').value,
        gender: document.querySelector('input[name = "gender"]: checked')?.value || "",
        qualification: document.getElementById('qualification').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        pin: document.getElementById('pin').value,
    }
})

getEmployees();
