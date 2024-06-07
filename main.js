let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let sbtitle = document.getElementById("searchtitle");
let sbcategory = document.getElementById("searchcategory");
let btnupdate = document.getElementById("update");
let btndelete = document.getAnimations("delete");

let mood = "create"

let tmp;

//gettotal
function getTotal (){
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background = "#040"
    }else{
        total.innerHTML = "";
        total.style.background = "#a52929"
    }
}

// create product
let datapro ;

if(window.localStorage.getItem("product")){
    datapro = JSON.parse(window.localStorage.getItem("product"))
}else{
    datapro = [];
}



submit.onclick = function(){
    let newpro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }
    // count lenght
    if(newpro.count < 100 && category.value !=''&& price.value !=''&& title.value !=''){
            if(mood === "create"){
                if(newpro.count > 1){
                    for(let i = 0 ; i < newpro.count ; i ++){
                        datapro.push(newpro)
                    }
                }else{
                    datapro.push(newpro)
                }
        }else{
            datapro[tmp] = newpro;
            count.style.display = "block";
            submit.innerHTML = "create";
            mood = "create"
        }
        clearData()
    }
   
    
    window.localStorage.setItem("product", JSON.stringify(datapro))
    showData()
}

// clear data

function clearData(){
    title.value = "";
    price.value = "";
    ads.value = "";
    taxes.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
}

// show data

function showData(){
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <th><button onclick="update(${i})" id="update">update</button></th>
        <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
    </tr>
        `
    }

    document.getElementById("tbody").innerHTML = table;
    let btndeleteAll = document.getElementById("deleteall");
    if(datapro.length > 0 ){
        btndeleteAll.innerHTML = `
        <button onclick ="deleteAll()">Delete all (${datapro.length})</button>
        `
    }else{
        btndeleteAll.innerHTML = '';
    }
    getTotal()
}
showData()

//delete 

function deleteData(i){
    datapro.splice(i, 1);
    window.localStorage.setItem("product", JSON.stringify(datapro));
    showData()
}

// delete all

function deleteAll(){
    window.localStorage.removeItem("product");
    datapro.splice(0);
    showData()
}

// count

//update 
function update(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    taxes.value = datapro[i].taxes;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    submit.innerHTML = "UPDATE"
    count.style.display = "none";
    getTotal();

    mood = "update";
    tmp = i;

    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search
let searchMood = "title";

function getSearchMood(id){
    if(id == "searchtitle"){
        searchMood = "title";
    }else{
        searchMood = "category";
    }

    search.focus();
    search.placeholder = "search by " + searchMood;
    search.value = '';
    showData()
}

function searchdata(value){
    let table = '';
    if(searchMood == "title"){
        for(let i = 0 ; i < datapro.length ; i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <th><button onclick="update(${i})" id="update">update</button></th>
                <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
            </tr>
                `
            }
        }
    }else{
        for(let i = 0 ; i < datapro.length ; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <th><button onclick="update(${i})" id="update">update</button></th>
                <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
            </tr>
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

// scrolltop

let btnscroll = document.getElementById("scrolltop");

window.onscroll = function(){
   if(window.scrollY > 400 ){
    btnscroll.style.cssText = `
    visibility: visible;
    opacity : 1;
    color : #fff;
    `
   }else{
    btnscroll.style.cssText = `
    visibility: hidden;
    opacity : 0;
    `
   }
}

btnscroll.onclick = function(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}

let btnmood = document.getElementById("mood")
let lightmood = window.localStorage.apmood;

if(lightmood == window.localStorage.apmood){
    if(lightmood === "light"){
        document.body.style.background = "#fff";
        btnmood.style.background = "#111";
        document.body.style.color = "#111";
        total.style.color = "#fff";
        btnscroll.style.color = "#fff";
    }
}
btnmood.onclick = function(){
    if(window.localStorage.getItem("apmood")){
        if(lightmood === "dark"){
            document.body.style.background = "#fff";
            btnmood.style.background = "#111";
            document.body.style.color = "#111";
            total.style.color = "#fff";
            lightmood = "light";
        }else{
            document.body.style.background = "#111";
            btnmood.style.background = "#fff";
            document.body.style.color = "#fff";
            btnscroll.style.color = "#fff"
            lightmood = "dark"
        }
    }
    
   window.localStorage.setItem("apmood", lightmood)
};


