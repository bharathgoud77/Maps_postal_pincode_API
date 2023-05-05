console.log("helo world");
const Btn = document.getElementById('getData');
const infoContainer = document.querySelector('.info-container');
const pinContainer = document.querySelector('.loc-container');
const postOfficeContainer = document.querySelector('.poffice-container');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const city = document.getElementById('city');
const region = document.getElementById('region');
const organisation = document.getElementById('organisation');
const hostname = document.getElementById('hostname');
const map = document.getElementById('map');
const x = document.getElementById('x');
const timeZone = document.getElementById('timezone');
const dateTime = document.getElementById('date-time');
const pincode = document.getElementById('pincode');
const message = document.getElementById('message');
const search = document.getElementById('search');

var IP;
var dataJson;
var lat, long;
var pin;

var postOfficer = [];
fetch('https://api.ipify.org?format=json')
   .then(response => response.json())
   .then(data => {
    console.log(data.ip)
    Ip = data.ip;
    document.getElementById('Ip').innerHTML = data.ip;
   })

   Btn.addEventListener('click', () =>{
    axios.get("https://ipapi.co/json").then(response =>{
        console.log(response);
        latitude.innerHTML = `<strong>Lat:</strong> ${response.data.latitude}`;
        longitude.innerHTML = `<strong>Long:</strong> ${response.data.longitude}`;
        city.innerHTML = `<strong>City:</strong> ${response.data.city}`;
        region.innerHTML = `<strong>Region:</strong> ${response.data.region}`;
        organisation.innerHTML = `<strong>Organisation: </strong>${response.data.org}`;
        hostname.innerHTML = `<strong>Hostname:</strong> ${response.data.hostname}`;
        timeZone.innerHTML = `<strong>Timezone:</strong> ${response.data.timezone}`;
        dateTime.innerHTML = `<strong>Date and Time:</strong> ${Date()}`;
        pin = response.data.postal;
        pincode.innerHTML = `<strong>Pincode:</strong> ${response.data.postal}`;
        var loc = document.getElementById("demo");
        const mapUrl = `https://maps.google.com/maps?q=${response.data.latitude},${response.data.longitude}&z=15&output=embed`;
        map.setAttribute("src", mapUrl);

         postOffice(pin);

    });
        Btn.style.display='none';
        infoContainer.style.display='flex';
        pinContainer.style.display='block';
});



function postOffice(pin) {
    console.log(pin);
    fetch(`https://api.postalpincode.in/pincode/${pin}`)
    .then((resp)=>resp.json())
    .then((data)=>{
        console.log(data[0]);
        message.innerHTML = `<strong>Message: </strong>${data[0].Message}`;
        console.log(data[0].PostOffice);
        postOfficeArr = data[0].PostOffice;
        search.style.display='block';

        showPostOffice(postOfficeArr);
    })
    .catch((e)=>{
        console.log("Error",e);
    })
    
}

function showPostOffice(Arr) {
    postOfficeContainer.innerHTML='';
    let myHtml='';
    Arr.forEach((ele)=>{
        myHtml+=`
        <div class="post-content">
         <div><strong>Name:</Strong> ${ele.Name}</div>
         <div><strong>Branch Type:</Strong> ${ele.BranchType}</div>
         <div><strong>Delivery Status:</Strong> ${ele.DeliveryStatus}</div>
         <div><strong>District:</Strong> ${ele.District}</div>
         <div><strong>Division:</Strong> ${ele.Division}</div>
        </div>
        `
    })
    postOfficeContainer.innerHTML=myHtml;
}


search.addEventListener('input',()=>{
    var filterArr = postOfficeArr.filter((ele)=>{
        if(ele.Name.toLowerCase().includes(search.value.trim().toLowerCase())){
            return ele;
        }
    })
    showPostOffice(filterArr);
})
