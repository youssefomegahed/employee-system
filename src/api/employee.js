const server = "http://192.168.1.7:3000";

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
