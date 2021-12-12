const grid=document.getElementById("grid");
const ordertable=document.getElementById("orderTable");
const searchbar=document.getElementById("searchbar");
const proceedtocheck=document.getElementById("proceedtocheck");

searchbar.addEventListener("keyup",filterItems,true);
document.addEventListener("DOMContentLoaded", getFromLocal);
document.addEventListener("DOMContentLoaded", showTH);
document.addEventListener("DOMContentLoaded", intervalBaner);
const ordertablediv=document.getElementById("dropdown");


function showTable(){
  ordertablediv.style.display="block";
}
function closeTable(){
  ordertablediv.style.display="none";
}

var intervall;
function intervalBaner(){
 intervall= setInterval(function(){plusSlika(1);},5000);
};

function openNav() {
    document.getElementById("mySidenav").style.width = "113px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  document.addEventListener("DOMContentLoaded",fetchItems);
  document.addEventListener("DOMContentLoaded",writeItems);


  var indexSlike=1;
  showSliku(indexSlike);

  function showSliku(n){
  var i;
  var slike= document.getElementsByClassName("slike");
  if (n>slike.length){
   indexSlike=1;
  }
  if(n<1){
   indexSlike=slike.length;
  }
for (i=0;i<slike.length;i++){
  slike[i].style.display="none";
  let gg=slike[indexSlike-1];
  gg.style.display="block";
}
 

  }
  function currentSlika(n){
    showSliku(indexSlike=n);
  }
  function plusSlika(n){
    showSliku(indexSlike+=n);
  }



  function fetchItems(){
    var xmlhttp = new XMLHttpRequest();
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
            var items=this.responseText;  
            writeItems(items);

           }
       };
       xmlhttp.open("GET", "imenapravi.php");
       xmlhttp.send();  
  }

function writeItems(item){
var parsedItem=JSON.parse(item);
for (var i=1;i<=Object.keys(parsedItem).length;i++){


  const newDiv=document.createElement("div");
  newDiv.classList.add("griditem");
  
  const newImg=document.createElement("img");
  newImg.setAttribute("src",parsedItem[i].itemImage);
  
  const newh1=document.createElement("h1");
  newh1.classList.add("itemnamesclass");
  newh1.innerText=parsedItem[i].itemName;
  
  const newp=document.createElement("p");
  newp.innerText=parsedItem[i].itemPrice+"BAM";

  const newdesc=document.createElement("p");
  newdesc.classList.add("description");
  newdesc.innerText=parsedItem[i].itemDesc;

  const neworderingHeader=document.createElement("h2");
  neworderingHeader.classList.add("orderheader");
  neworderingHeader.innerText="Order now:";

  const newForm=document.createElement("form");
  newForm.classList.add("griditemform")

  const Inp2=document.createElement("input");
  Inp2.setAttribute("type","hidden");
  Inp2.setAttribute("name","hiddenName");
  Inp2.setAttribute("value",parsedItem[i].itemName);
  
  const newLabel2=document.createElement("label");
  newLabel2.classList.add("popUpQuantity");
  newLabel2.setAttribute("for","quantity");
  newLabel2.innerText="QUANTITY:";
  
  const Inp1=document.createElement("input");
 Inp1.setAttribute("type","number");
 Inp1.setAttribute("name","quantity");
 Inp1.setAttribute("placeholder","1");
 Inp1.setAttribute("value",1);

 const Inp3=document.createElement("input");
 Inp3.setAttribute("type","hidden");
 Inp3.setAttribute("name","hiddenPrice");
 Inp3.setAttribute("value",parsedItem[i].itemPrice);

  const newLabel1=document.createElement("label");
  newLabel1.innerText="SIZE:";
  newLabel1.setAttribute("for","size");

  const newSelect=document.createElement("select");
  newSelect.setAttribute("name","size");

  const OptS=document.createElement("option");
  OptS.setAttribute("value","S");
  OptS.innerText="S";
  const OptM=document.createElement("option");
  OptM.setAttribute("value","M");
  OptM.innerText="M";
  const OptL=document.createElement("option");
  OptL.setAttribute("value","L");
  OptL.innerText="L";
  const OptXL=document.createElement("option");
  OptXL.setAttribute("value","XL");
  OptXL.innerText="XL";
  const OptXXL=document.createElement("option");
  OptXXL.setAttribute("value","XXL");
  OptXXL.innerText="XXL";
  
  newSelect.appendChild(OptS);
  newSelect.appendChild(OptM);
  newSelect.appendChild(OptL);
  newSelect.appendChild(OptXL);
  newSelect.appendChild(OptXXL);
  

  
  newDiv.appendChild(newImg);
  newDiv.appendChild(newh1);
  newDiv.appendChild(newp);
  newDiv.appendChild(newdesc);
  newDiv.appendChild(neworderingHeader);
  newDiv.appendChild(newForm);


 const Inp4=document.createElement("button");
 Inp4.classList.add("popUpAddTocart");
 Inp4.innerText="ADD TO CART";
 Inp4.setAttribute("type","button");
 Inp4.addEventListener("click",addOrder);

 //name
 newForm.appendChild(Inp2);
 //quantitylabel
 newForm.appendChild(newLabel2);

 //sizelabel
 newForm.appendChild(newLabel1);
//quantity inp
 newForm.appendChild(Inp1);
//price
 newForm.appendChild(Inp3);
 //sizeinp
  newForm.appendChild(newSelect);

  //addtocart button
 newForm.appendChild(Inp4);


  grid.appendChild(newDiv);

}

};


function addOrder(event){
  showTH();
  const submit=event.target;
  const item=submit.parentElement;
  const item2zbogslike=item.parentElement;
  const newRow=document.createElement("tr");

  const nameTD=document.createElement("td");
  nameTD.innerText=item.elements[0].value;
  nameTD.classList.add("orderTDs");

  const quantityTD=document.createElement("td");
  quantityTD.innerText=item.elements[1].value;
  quantityTD.classList.add("orderTDs");

  const priceTD=document.createElement("td");
  priceTD.innerText=item.elements[2].value;
  priceTD.innerText+="BAM";
 

  const sizeTD=document.createElement("td");
  sizeTD.innerText=item.elements[3].value;
  sizeTD.classList.add("orderTDs");
   
  const imgTD=document.createElement("td");
  imgTD.classList.add("orderTDs");

  const imgTDimg=document.createElement("img");
  imgTDimg.classList.add("TDimage");
  imgTDimg.setAttribute("src",item2zbogslike.children[0].getAttribute("src"));
  
  imgTD.appendChild(imgTDimg);
  
  const removeTD=document.createElement("td");
  removeTD.classList.add("orderTDs");

  const removeBtn=document.createElement("button");
  removeBtn.setAttribute("type","button");
  removeBtn.innerText="REMOVE";

  removeBtn.addEventListener("click",removeOrder);
  removeTD.appendChild(removeBtn);

    
 newRow.appendChild(nameTD); 
 newRow.appendChild(quantityTD); 
 newRow.appendChild(priceTD); 
 newRow.appendChild(sizeTD); 
 newRow.appendChild(imgTD);
 newRow.appendChild(removeTD); 

 ordertable.appendChild(newRow);
 let order={
   itemName: item.elements[0].value,
   itemQuantity: item.elements[1].value,
   itemPrice: item.elements[2].value+"BAM",
   itemSize: item.elements[3].value,
   itemImage: item2zbogslike.children[0].getAttribute("src")
 };
  saveToLocal(order);
  calculateTotal();
};

function removeOrder(event){
  const remove=event.target;
  const removeTr=remove.parentNode.parentNode;
  removeFromLocal(removeTr.rowIndex);
    removeTr.parentElement.deleteRow(removeTr.rowIndex);
    showTH();
    calculateTotal();
  
};

function saveToLocal(order){
  let orders;
  if (localStorage.getItem("orders")===null){
    orders=[];
  }else{
    orders=JSON.parse(localStorage.getItem("orders"));
  }
  orders.push(order);
  localStorage.setItem("orders",JSON.stringify(orders));
}

function getFromLocal(){
  let orders;
  if (localStorage.getItem("orders")===null){
    orders=[];
  }else{
    orders=JSON.parse(localStorage.getItem("orders"));
  };
  orders.forEach(function(order){
    
  const newRow=document.createElement("tr");

  const nameTD=document.createElement("td");
  nameTD.innerText=order.itemName;
  nameTD.classList.add("orderTDs");

  const quantityTD=document.createElement("td");
  quantityTD.innerText=order.itemQuantity;
  nameTD.classList.add("orderTDs");

  const priceTD=document.createElement("td");
  priceTD.innerText=order.itemPrice;
  

  nameTD.classList.add("orderTDs");

  const sizeTD=document.createElement("td");
  sizeTD.innerText=order.itemSize;
  nameTD.classList.add("orderTDs");

  const imgTD=document.createElement("td");
  imgTD.classList.add("orderTDs");

  const imgTDimg=document.createElement("img");
  imgTDimg.classList.add("TDimage");
  imgTDimg.setAttribute("src",order.itemImage);
  
  imgTD.appendChild(imgTDimg);

  const removeTD=document.createElement("td");
  nameTD.classList.add("orderTDs");
  const removeBtn=document.createElement("button");
  removeBtn.setAttribute("type","button");
  removeBtn.innerText="REMOVE";

  removeBtn.addEventListener("click",removeOrder);
  removeTD.appendChild(removeBtn);

    
 newRow.appendChild(nameTD); 
 newRow.appendChild(quantityTD); 
 newRow.appendChild(priceTD); 
 newRow.appendChild(sizeTD); 
 newRow.appendChild(imgTD);
 newRow.appendChild(removeTD); 
 ordertable.appendChild(newRow);

  });
  calculateTotal();
};

function removeFromLocal(orderindex){
  let orders;
    if (localStorage.getItem("orders")===null){
        orders=[];
    }else{
        orders=JSON.parse(localStorage.getItem("orders"));
    };
    orders.splice(orderindex-1,1);
    localStorage.setItem("orders",JSON.stringify(orders));
};

function showTH(){
  const heading=document.getElementById("tableheading");
  const totalrow=document.getElementById("totalRow");
if(ordertable.children.length>1){
  heading.style.display="table-row";
  totalrow.style.display="table-row";
}else{
  heading.style.display="none";
  totalrow.style.display="none";

}

};

function filterItems(){
  var slikeBaner=document.getElementById("banerslike");
  var slovo=searchbar.value.toUpperCase();
if (slovo==""){
if (slikeBaner.style.display="none"){
  slikeBaner.style.display="block";
setTimeout(() => {
  slikeBaner.classList.remove("animatedremovedbaner");
}, 300); 
}
}else{
  slikeBaner.classList.add("animatedremovedbaner");
  setTimeout(() => {
    slikeBaner.style.display="none";
  }, 300); 
  var griditems=grid.children;
var griditemsfilter=new Array();
for (i=0;i<griditems.length;i++){
  griditemsfilter[i]=griditems[i].children[1].innerText;
  if (griditemsfilter[i].toUpperCase().indexOf(slovo)>-1){
    griditems[i].style.display="";
  }else {
    griditems[i].style.display="none";

  }
};
}
};
var totaltd=document.getElementById("totalTd");
function calculateTotal(){
  var total=0;
  for (i=1;i<ordertable.children.length;i++){
    var value=parseInt(ordertable.children[i].children[2].innerHTML.slice(0,-3));
    total+=value;
  }
 totaltd.innerHTML=total+"BAM";
 totalToLocal(total);
};

function totalToLocal(tot){
  if (localStorage.getItem("total")===null){
  localStorage.setItem("total",JSON.stringify(tot));
  }else{
    localStorage.removeItem("total");
    localStorage.setItem("total",JSON.stringify(tot));
  }
 
};