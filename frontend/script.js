let allEmployees = [];
let currentPage = 0;
const limit = 5;

let filteredData = [];

const renderEmployees = ((data) => {
    const tableBody = document.getElementById('tbody');
    let rows = "";
    const start = currentPage * limit;
    const end = start + limit;
    const pageData = data.slice(start, end);
    pageData.forEach((employee, index) => {
        rows += `
        <tr>
            <td>${index + 1}</td>
            <td>${employee.salutation}. ${employee.firstName} ${employee.lastName}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.country}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-light btn-sm dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown">
                        ⋮
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item view-btn" 
                               href="#" 
                               data-id="${employee.id}">
                               View
                            </a>
                            <a class="dropdown-item edit-btn" 
                               href="#" 
                               data-id="${employee.id}">
                               Edit
                            </a>
                            <a class="dropdown-item delete-btn" 
                               href="#" 
                               data-id="${employee.id}">
                               Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
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
    catch (error) {
        console.log("Error fetching employees data", error);
    }

}

function generatePaginationButtons() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredData.length / limit);
    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;

        button.classList.add('btn', 'btn-outline-primary');

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


function searchEmployees(query) {
    return allEmployees.filter(emp =>
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

document.getElementById("searchBtn").addEventListener("click", (e) => {
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

function formClose() {
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('number').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('qualification').value = "";
    document.getElementById('address').value = "";
    document.getElementById('city').value = "";
    document.getElementById('pin').value = "";
    document.getElementById('country').value = "";
    document.getElementById('state').value = "";
    document.getElementById('salutation').value = "Select";
    document.getElementById('radio1').checked = false;
    document.getElementById('radio2').checked = false;

    const modalElement = document.getElementById('exampleModalLong');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

}
document.getElementById('cancel-btn').addEventListener("click", formClose);
document.getElementById('close-icon').addEventListener("click", formClose);

// document.getElementById('adding-employee-btn').addEventListener("click", ()=>{
//     const employeeData = {
//         salutation: document.getElementById('salutation').value,
//         firstName: document.getElementById('firstname').value,
//         lastName: document.getElementById('lastname').value,
//         email: document.getElementById('email').value,
//         phone: document.getElementById('number').value,
//         dob: document.getElementById('dob').value,
//         gender: document.querySelector('input[name = "gender"]:checked')?.value || "",
//         qualification: document.getElementById('qualification').value,
//         address: document.getElementById('address').value,
//         city: document.getElementById('city').value,
//         state: document.getElementById('state').value,
//         country: document.getElementById('country').value,
//         pin: document.getElementById('pin').value,

//         username: "user",
//         password: "default123"
//     }

//     fetch("http://localhost:3000/employees",{
//         method: "POST",
//         headers:{"Content-Type": "application/json"},
//         body:JSON.stringify(employeeData)
//     })
//     .then(response => response.json())
//     .then(data=>{
//         console.log(data)
//     })

//     getEmployees();
//     formClose();


document.getElementById('adding-employee-btn').addEventListener("click", () => {

    let dobValue = document.getElementById('dob').value;

    if (!dobValue) {
        alert("Please select Date of Birth");
        return;
    }

     const selectedGender = document.querySelector('input[name="gender"]:checked');

    if (!selectedGender) {
        alert("Please select gender");
        return;
    }

    const dateObj = new Date(dobValue);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDob = `${day}-${month}-${year}`;

    const employeeData = {
        salutation: document.getElementById('salutation').value,
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('number').value,
        dob: formattedDob,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        qualifications: document.getElementById('qualification').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        pin: document.getElementById('pin').value,
        username: "user",
        password: "default123"
    };

    // fetch("http://localhost:3000/employees", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(employeeData)
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error("Failed to add employee");
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("Employee Added:", data);
    //         getEmployees();
    //         formClose();
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //     });

    // fetch("http://localhost:3000/employees", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(employeeData)
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             return response.json().then(err => {
    //                 console.log("Backend Validation Error:", err);
    //                 throw new Error("Failed");
    //             });
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("Employee Added:", data);
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //     });





    fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData)
})
.then(async response => {
    const data = await response.json();

    if (!response.ok) {
       console.log("Backend Validation Error:", data.errors);
 // 👈 IMPORTANT
        throw new Error("Failed to add employee");
    }

    return data;
})
.then(data => {
    console.log("Employee Added:", data);
    getEmployees();
    formClose();
})
.catch(error => {
    console.error("Error:", error);
});


//     fetch("http://localhost:3000/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employeeData)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Failed to add employee");
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log("Employee Added:", data);

//             getEmployees();   // 🔥 refresh table
//             formClose();      // 🔥 close modal
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });



});



// chatgpt
// fetch("http://localhost:3000/employees", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(employeeData)
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("POST failed");
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Added:", data);

//         getEmployees();   // ✅ wait for POST
//         formClose();      // ✅ wait for POST
//     })
//     .catch(error => {
//         console.error(error);
//     });


// Chagpt - To know whether image is added in its field or not
document.getElementById("image-input").addEventListener("change", function () {
    if (this.files.length > 0) {
        console.log("File selected:", this.files[0].name);
    } else {
        console.log("No file selected");
    }
});


// chatgpt - To pop up modal when the view button of each employee is clicked
// document.addEventListener("click", function (e) {

//     if (e.target.classList.contains("view-btn")) {
//         e.preventDefault();

//         const employeeId = e.target.dataset.id;

//         console.log("Viewing employee:", employeeId);

//         // Optional: Set modal content here
//         document.querySelector(".modal-body").innerHTML = `
//             <p>Employee ID: ${employeeId}</p>
//         `;

//         // Open Modal
//         const modal = new bootstrap.Modal(
//             document.getElementById("exampleModalForViewDetails")
//         );

//         modal.show();
//     }
// });



// Chatgpt - The code to pop up the modal for viewing employee details along with employee details
document.addEventListener("click", async function (e) {

    if (e.target.classList.contains("view-btn")) {
        e.preventDefault();

        const employeeId = e.target.dataset.id;

        try {
            const response = await fetch(`http://localhost:3000/employees/${employeeId}`);

            if (!response.ok) {
                throw new Error("Employee not found");
            }

            const employee = await response.json();

            const modalBody = document.querySelector("#exampleModalForViewDetails .modal-body");

            modalBody.innerHTML = `
                <p><strong>Name:</strong> ${employee.salutation}. ${employee.firstName} ${employee.lastName}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Phone:</strong> ${employee.phone}</p>
                <p><strong>Gender:</strong> ${employee.gender}</p>
                <p><strong>DOB:</strong> ${employee.dob}</p>
                <p><strong>Qualification:</strong> ${employee.qualifications}</p>
                <p><strong>Address:</strong> ${employee.address}</p>
                <p><strong>City:</strong> ${employee.city}</p>
                <p><strong>State:</strong> ${employee.state}</p>
                <p><strong>Country:</strong> ${employee.country}</p>
                <p><strong>Pin:</strong> ${employee.pin}</p>
            `;

            const modal = new bootstrap.Modal(
                document.getElementById("exampleModalForViewDetails")
            );

            modal.show();

        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    }
});





// Chatgpt - To open the edit modal
// document.addEventListener("click", async function (e) {

//     if (e.target.classList.contains("edit-btn")) {
//         e.preventDefault();

//         const employeeId = e.target.dataset.id;

//         try {
//             const response = await fetch(`http://localhost:3000/employees/${employeeId}`);

//             if (!response.ok) {
//                 throw new Error("Employee not found");
//             }

//             const employee = await response.json();

            // Fill edit modal fields
            // document.querySelector("#exampleModalForEdit #salutationEdit").value = employee.salutation;
            // document.querySelector("#exampleModalForEdit #firstnameEdit").value = employee.firstName;
            // document.querySelector("#exampleModalForEdit #lastnameEdit").value = employee.lastName;
            // document.querySelector("#exampleModalForEdit #emailEdit").value = employee.email;
            // document.querySelector("#exampleModalForEdit #numberEdit").value = employee.phone;

            // Convert DOB from dd-mm-yyyy to yyyy-mm-dd
            // const [day, month, year] = employee.dob.split("-");
            // document.querySelector("#exampleModalForEdit #dobEdit").value = `${year}-${month}-${day}`;

            // document.querySelector("#exampleModalForEdit #qualificationsEdit").value = employee.qualifications;
            // document.querySelector("#exampleModalForEdit #addressEdit").value = employee.address;
            // document.querySelector("#exampleModalForEdit #cityEdit").value = employee.city;
            // document.querySelector("#exampleModalForEdit #stateEdit").value = employee.state;
            // document.querySelector("#exampleModalForEdit #countryEdit").value = employee.country;
            // document.querySelector("#exampleModalForEdit #pinEdit").value = employee.pin;

            // if (employee.gender === "Male") {
            //     document.querySelector("#exampleModalForEdit #radio1Edit").checked = true;
            // } else {
            //     document.querySelector("#exampleModalForEdit #radio2Edit").checked = true;
            // }

            // Store ID for updating later
            // document.getElementById("exampleModalForEdit").dataset.id = employeeId;

            // Open modal
//             const modal = new bootstrap.Modal(
//                 document.getElementById("exampleModalForEdit")
//             );

//             modal.show();

//         } catch (error) {
//             console.error("Error loading employee for edit:", error);
//         }
//     }
// });


getEmployees();
