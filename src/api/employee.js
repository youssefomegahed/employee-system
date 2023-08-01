const server = "http://192.168.1.3:3000";

export function verifyHRUser(email, password) {
  return fetch(`${server}/verifyHRUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export function getEmployees() {
  return fetch(`${server}/getEmployees`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export function addEmployee(name, email, password, group) {
  return fetch(`${server}/addEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      group,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export function updateEmployees(employees) {
  return fetch(`${server}/updateEmployees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employees,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export function deleteEmployee(id) {
  return fetch(`${server}/deleteEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employeeId: id,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
