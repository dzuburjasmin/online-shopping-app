const checkoutgrid=document.getElementById("checkoutgrid");
const formname=document.getElementById("name");
const formsurname=document.getElementById("surname");
const formaddress=document.getElementById("address");
const formpostcode=document.getElementById("postcode");
const formcity=document.getElementById("city");
const formphonenumber=document.getElementById("phonenumber");
const orderatthedoor=document.getElementById("atthedoor");
const totalpricecheckout=document.getElementById("totalpricecheckout");
const tobeclosed=document.getElementById("tobeclosed");
const thankh1=document.getElementById("thankh1");
const thankyou=document.getElementById("thankyou");
orderatthedoor.addEventListener("click",placeOrder);
var totalPrice=0;
document.addEventListener("DOMContentLoaded",checkoutFromLocal);

function checkoutFromLocal(){
    let orders;
    if (localStorage.getItem("orders")===null){
      orders=[];
    }else{
      orders=JSON.parse(localStorage.getItem("orders"));
    };
    var totalPrice=0;
    for (i=0;i<orders.length;i++){
  
     const newCheckoutDiv=document.createElement("div");
     newCheckoutDiv.classList.add("checkoutgriditem");
  
     const newCheckoutImg=document.createElement("img");
     newCheckoutImg.setAttribute("src",orders[i].itemImage);
     newCheckoutImg.classList.add("checkoutinfo");
  
     const newCheckoutName=document.createElement("div");
     newCheckoutName.innerText=orders[i].itemName;
     newCheckoutName.classList.add("checkoutinfo");
  
     const newCheckoutQuantity=document.createElement("div");
     newCheckoutQuantity.innerText="x"+orders[i].itemQuantity;
     newCheckoutQuantity.classList.add("checkoutinfo");
  
     const newCheckoutSize=document.createElement("div");
     newCheckoutSize.innerText=orders[i].itemSize;
     newCheckoutSize.classList.add("checkoutinfo");
  
     const newCheckoutPrice=document.createElement("div");
     newCheckoutPrice.innerText=orders[i].itemPrice;
     newCheckoutPrice.classList.add("checkoutinfo");
  
     newCheckoutDiv.appendChild(newCheckoutImg);
     newCheckoutDiv.appendChild(newCheckoutName);
     newCheckoutDiv.appendChild(newCheckoutQuantity);
     newCheckoutDiv.appendChild(newCheckoutSize);
     newCheckoutDiv.appendChild(newCheckoutPrice);
    
    checkoutgrid.appendChild(newCheckoutDiv);
    integerprice=parseInt(orders[i].itemPrice.slice(0,-3));
    totalPrice+=integerprice;
    };
    totalpricecheckout.innerText+="Total: "+totalPrice+"BAM";
  }

function placeOrder(event){
  if ((formname.value=="") || (formsurname.value=="") || (formaddress.value=="") || (formpostcode.value=="") || (formcity.value=="") || (formphonenumber.value=="")){
    alert("Please fill in all fields.");
   }else{ 
    let orders;
    if (localStorage.getItem("orders")===null){
      orders=[];
    }else{
      orders=JSON.parse(localStorage.getItem("orders"));
    };
    var orderarray="";
    orders.forEach(function(order){
    orderarray+="/"+order.itemName+"x"+order.itemQuantity+"s"+order.itemSize+"/";
    });
    var itemsarray=orderarray.replace(/(\r\n|\n|\r)/gm, ""  );
    var formtotal=localStorage.getItem("total");
    const orderObject={
      items:itemsarray,
      name:formname.value,
      surname:formsurname.value,
      address:formaddress.value,
      postcode:formpostcode.value,
      city:formcity.value,
      phonenumber: formphonenumber.value,
      total: formtotal+"BAM"
    };
    var stringifiedObject=JSON.stringify(orderObject);
    console.log(stringifiedObject);
    console.log(orderObject.name);
    var ordertosend="items="+itemsarray.toString()+"&name="+orderObject.name+"&surname="+orderObject.surname+"&address="+orderObject.address+"&postcode="+orderObject.postcode+"&city="+orderObject.city+"&phonenumber="+orderObject.phonenumber+"&total="+orderObject.total;
    var ajx = new XMLHttpRequest();
            ajx.onreadystatechange = function () {
                if (ajx.readyState == 4 && ajx.status == 200) {
                    alert("Order successful!");
                    thankh1.innerHTML=ajx.responseText;
                    closeToBeClosed();
                    openThankyou();
                    window.scrollTo(0,0);
                    localStorage.removeItem("orders");
                    localStorage.removeItem("total");
                }
            };
            ajx.open("POST", "order.php", true);
            ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajx.send(ordertosend);
            
  };
};

console.log(localStorage.getItem("total"));
function closeToBeClosed(){
  tobeclosed.classList.add("animatedtobeclosed");
  setTimeout(() => {
    tobeclosed.style.display="none";
  }, 300); 
}
function openThankyou(){
  thankyou.style.display="block";
  setTimeout(()=>{
    thankyou.classList.remove("thankyouanimated");
  }, 300);
}