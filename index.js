"use strict";
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","'","_",".",","];

let elText = document.querySelector(".shifr-text");
let elKeyOne = document.querySelector(".shifr-key1");
let elKey = document.querySelector(".shifr-key");
// let elKeyTwo = document.querySelector(".shifr-key2");
let elBtn = document.querySelector(".shifr-btn");
let elSelect = document.querySelector(".select-shifr");
let elResult = document.querySelector(".result-text");
let alert = document.querySelector(".alert");

let changeVal;

elSelect.addEventListener("change", (e)=>{
    elText.removeAttribute("disabled");
    let value = elSelect.value;
    elKeyOne.value = "";
    elKey.value = "";
    elText.value = "";
    alert.style.display = "none";
    if(value == 2){
        elKeyOne.style.display = "block";
        elKey.style.display = "none";
    } else if(value == 3){
        elKey.style.display = "block";
        elKeyOne.style.display = "none";
    } else if(value == 4){
        window.location = './vijiner.html'
    } else {
        elKeyOne.style.display = "none";
        elKey.style.display = "none";
    }
    changeVal = value;
})

elBtn.addEventListener("click", (e)=>{
    let value = elText.value;
    let keyOne = elKeyOne.value;
    let valLength = value.length;
    let keyOneLength = keyOne.length;
    let valRectangle = square(valLength);
    let letters = box(value,valRectangle);
    let change;
    let arrShifr;
    let placeIn;
    let arrShifr2;
    if(changeVal == 1){
        change = shifr1(letters).join("");
        // console.log(change);
        elResult.innerHTML = `
       <strong>Shifrlangan matn: </strong> ${change}
       `;
       alert.style.display = "block";
    } else if(changeVal == 2){
        arrShifr = shifrSort(value,keyOne);
        placeIn = place(keyOne, valRectangle);
        // console.log(placeIn);
        // arrShifr2 = funSort(placeIn,arrShifr);
        let result = funSort(placeIn,arrShifr);
        console.log(result);
        // let result = shifr2(arrShifr2, keyOneLength);
        elResult.innerHTML = `
       <strong>Shifrlangan matn: </strong> ${result.join("")}
       `;
       alert.style.display = "block";
    } else if(changeVal == 3){
    //    console.log(changeVal);
       let valShifr = place(value);
    //    console.log(valShifr, elKey.value);
       let result = shifr3(valShifr,Number(elKey.value));
       elResult.innerHTML = `
       <strong>Shifrlangan matn: </strong> ${result.join("")}
       `;
       alert.style.display = "block";
    }
    // console.log(keyOneLength);
    // console.log(arrShifr);
});

function square(p){
    let x = p;
    while(Math.sqrt(x) !== Math.trunc(Math.sqrt(x))){
        x++;
    }
    return x;
};
function box(a,b){
    let letters = [];
    for(let i=0; i<b; i++){
        let letter = a.substr(i,1);
        if(letter){
            letters.push(letter);
        } else {
            letters.push("*");
        }
    }
    return letters;
};
function shifr1(a){
    let arrLetters = [];
    let k = Math.sqrt(a.length);
    for(let i=0; i<k; i++){
        for(let j=0; j<k*k; j+=k){
            arrLetters.push(a[j+i]);
        }
    }
    return arrLetters;
};
function place(a,b){
    let sp = Math.sqrt(b);
    // if(sp == a.length){
        let arrIndex = [];
        for(let i=0; i<a.length; i++){
            let index = alphabet.indexOf(a[i]);
            arrIndex.push(index);
        }
        return arrIndex;
    // }
};
function shifrSort(a,b){
    let length = Math.ceil(a.length/b.length);
    let arrSort = [];
    if(length>1){
        for(let i=0; i<b.length*length; i++){
            let el = a[i];
            if(el){
                arrSort.push(el);
            } else{
                arrSort.push("*");
            }
        }
    }
    return arrSort;
};
function funSort(a,b){
    let arrSort = [];
    for(let i=0; i<a.length; i++){
        let arr = [];
        arr.push(a[i]);
        for(let j=0; j<b.length/a.length; j++){
            arr.push(b[j+i*Math.trunc(b.length/a.length)]);
        }
        arrSort.push(arr);
    }
    arrSort.sort(function(a,b){return a[0]-b[0]});
    let sortedArr = [];
    let arr = [];
    console.log(arrSort);
    for(let j=1; j<b.length/a.length+1; j++){
        for(let i=0; i<a.length; i++){
            arr.push(arrSort[i][j])
        }
    }
    return arr;
console.log(arr);
    for(let i=0; i<a.length; i++){
        for(let j=1; j<b.length/a.length+1; j++){
            sortedArr.push(arrSort[i][j]);
        }
    }
    console.log(sortedArr);

    return sortedArr;
};
function shifr2(a,b){
    let arr = [];
    for(let i=0; i<a.length/b; i++){
        let arr1 = [];
        for(let j=0; j<b; j++){
            arr1.push(a.shift());
        }
        arr.push(arr1);
    }
    console.log(arr);
    return arr;
};
function shifr3(a,b){
    let arrIndex = [];
    a.forEach(item=>{
        let index = alphabet[item+b];
        arrIndex.push(index);
    });
    console.log(arrIndex);
    return arrIndex;
}
