const array = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    ",",
    " ",
    ".",
    "!",
    "?",
    "'",
  ];
  
  const formEl = document.querySelector(".form-el");
  const formText = document.querySelector(".form-text");
  const formDecode = document.querySelector(".form-decode");
  const tableHead = document.querySelector(".table-head");
  const tableBody = document.querySelector(".table-body");
  const textLabel = document.querySelector(".textLabel");
  const TextResult = document.querySelector(".encrypted-text");
  const DefaultTextResult = document.querySelector(".default-text");
  const titleEncryptedText = document.querySelector(".title-encrypted-text");
  const titleDefaultText = document.querySelector(".title-default-text");
  // -------------------------------------------------------------
  const arr = [];
  function findCodeArr(key) {
    for (const item of key) {
      array.forEach((element, index) => {
        if (item == element) {
          const startArray = array.slice(index + 1);
          const endArray = array.slice(0, index);
          endArray.push(item);
          arr.push([item, startArray.concat(endArray)]);
        }
      });
    }
    return arr;
  }
  
  // ----------------------------------------------------------------
  const tableUIFn = (arr, array) => {
    const tableRow = document.createElement("tr");
    tableRow.insertAdjacentHTML("afterbegin", `<th> </th>`);
  
    array.forEach((e) => {
      const headData = document.createElement("th");
      headData.textContent = e;
      tableRow.insertAdjacentElement("beforeend", headData);
    });
  
    tableHead.insertAdjacentElement("beforeend", tableRow);
  
    arr.forEach((e) => {
      const tableRow = document.createElement("tr");
      tableRow.insertAdjacentHTML(
        "beforeend",
        `<td class="fw-bold bg-success text-white">${e[0]}</td>`
      );
      e[1].forEach((el) => {
        const headData = document.createElement("td");
        headData.textContent = el;
        tableRow.insertAdjacentElement("beforeend", headData);
      });
      tableBody.insertAdjacentElement("beforeend", tableRow);
    });
  };
  // -----------------------------------------------------------
  let keyText = 0;
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const key = e.target.key.value.toUpperCase();
    keyText = key;
  
    if (key.length) {
      const codeArr = findCodeArr(key);
      tableUIFn(codeArr, array);
      formText.classList.replace("d-none", "d-block");
    }
  });
  //
  
  formText.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = e.target.text.value.toUpperCase();
    let count = 0;
    let resultArr = [];
    for (const item of text) {
      let letterIndex = -1;
      array.forEach((element, index) => {
        if (item == element) {
          letterIndex = index;
        }
      });
  
      for (const i in arr[count][1]) {
        if (i == letterIndex) resultArr.push(arr[count][1][i]);
      }
      count++;
      if (count == keyText.length) count = 0;
    }
    if (text.length) {
      formDecode.classList.replace("d-none", "d-block");
      titleEncryptedText.classList.replace("d-none", "d-block");
    }
    const resultText = resultArr.join("");
    const encryptedText = document.createElement("p");
    encryptedText.textContent = resultText;
    encryptedText.classList = "fs-3 fw-bolder bg-success ";
    TextResult.insertAdjacentElement("beforeend", encryptedText);
  });
  
  // ------------------------------decode function
  
  formDecode.addEventListener("submit", (e) => {
    e.preventDefault();
    const decodeText = e.target.text.value.toUpperCase();
    let count = 0;
    let resultArray = [];
    for (const letter of decodeText) {
      let letterIndex = -1;
      for (const item of arr[count][1]) {
        if (item == letter) {
          letterIndex = arr[count][1].indexOf(item);
          resultArray.push(array[letterIndex]);
        }
      }
      count++;
      if (count == keyText.length) count = 0;
    }
    if (decodeText.length) {
      titleDefaultText.classList.replace("d-none", "d-none");
    }
    const resultText = resultArray.join("");
    const defaultText = document.createElement("p");
    defaultText.textContent = resultText;
    defaultText.classList = "fs-3 fw-bolder bg-success";
    DefaultTextResult.insertAdjacentElement("beforeend", defaultText);
  });
  
  // ------------------------------decode function
  
  formDecode.addEventListener("submit", (e) => {
    e.preventDefault();
    const decodeText = e.target.text.value.toUpperCase();
    let count = 0;
    let resultArray = [];
    for (const letter of decodeText) {
      let letterIndex = -1;
      for (const item of arr[count][1]) {
        if (item == letter) {
          letterIndex = arr[count][1].indexOf(item);
          resultArray.push(array[letterIndex]);
        }
      }
      count++;
      if (count == keyText.length) count = 0;
    }
    console.log(resultArray);
  });
  