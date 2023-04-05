let url = 'http://localhost:4000/'
let table = document.getElementById('tableItems');

showData();

document.getElementById('submitBtn').addEventListener('click', (e) => {
  e.preventDefault()
  let obj = JSON.stringify({
    "candyName": document.getElementById('candyName').value,
    "description": document.getElementById('description').value,
    "price": document.getElementById('price').value,
    "quantity": document.getElementById('quantity').value
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  };
  axios.request(config)
    .then((res) => {
      let response = res.data;
      let tr = document.createElement('tr');
    tr.innerHTML = `<td class="withName">${response.candyName}</td>
        <td class="withDesc">${response.candyDescription}</td>
        <td class="withPrice">${response.candyPrice}</td>
        <td class="withQuty">${response.candyQuantity}</td>
        <td><input type="number" placeholder="buyCandy">
        <button class="buyBtn candyOne" id="${response.id}">buy</button>
        </td>`
      table.appendChild(tr);
    })
    .catch((error) => {
      console.log(error);
    });
});


function showData() {
  axios.get(url)
    .then(res => {
      let resp = res.data
      // console.log(resp)
      resp.forEach(response => {
        let html = `
      <tr>
        <td class="withName">${response.candyName}</td>
        <td class="withDesc">${response.candyDescription}</td>
        <td class="withPrice">${response.candyPrice}</td>
        <td class="withQuty">${response.candyQuantity}</td>
        <td><input type="number" placeholder="buyCandy">
        <button class="buyBtn candyOne" id="${response.id}">buy</button>
        </td>
      </tr>
          `
        table.innerHTML += html;
      })
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById('tableItems').addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('candyOne')) {
    let Id = e.target.id;
    let candyValue = e.target.previousElementSibling.value;
    let obj = {
      'id': Id,
      "candyQuantity": candyValue
   }
    axios.put(url, obj)
      .then(res => console.log(res))
    .catch(err=>console.log(err))
  }
})
