// Declaring a function to load data from api 
const loadPhone = async(isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones ,isShowAll);

    document.getElementById('spinner').style.display='none'
}

// Displaying phones on the page 
const displayPhones = (phones, isShowAll) => {
    let showPhone = phones;
    if(!isShowAll){
        showPhone= showPhone.slice(0, 6);
        document.getElementById('show-all-button-container').classList.remove('hidden')
    }
    else{
        showPhone= showPhone.slice(6);
        document.getElementById('show-all-button-container').classList.add('hidden')
    }
    showPhone.forEach((item) =>{
        
        const phoneCard = document.createElement('div')
        phoneCard.innerHTML=`
                    <div class="border p-4 flex flex-col justify-start items-center space-y-4 rounded-lg bg-slate-50 hover:border-slate-400 hover:cursor-pointer">
                <div class="p-7 bg-[#0D6EFD0D] rounded-md">
                    <img src="${item.image}" alt="">
                </div>
                <h3 class="text-xl font-semibold">${item.
                    phone_name}</h3>
                <p class="text-center font-semibold">There are many variations of passages of <br> available, but the majority have suffered</p>
                <p class="text-center font-bold text-2xl">$999</p>
                <div>
                    <button onclick="(loadDetails('${item.slug}'))" class="btn bg-[#0D6EFD] text-white ">Show Details</button>
                  </div>
                  

        `
        phoneCards.append(phoneCard); 
    })
}
// calling the loadPhone Function 
loadPhone();


// spinner 
const handleSearch = ()=>{
    document.getElementById('spinner').style.display='block'
    setTimeout(function() {
        loadPhone()
},1000)
}

// show more Button 

const handleShowAll = ()=>{
    loadPhone(true);
}

// show details 
const loadDetails = async(id) => {
    const uri = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(uri);
    const data = await res.json();
    const phone = data.data 
    displayDetails(phone);
    
  };
  
  const displayDetails = (phone) => {

    const displayDetailsContainner = document.getElementById('modal-content');

    displayDetailsContainner.innerHTML = ` 
    <div>
  <div class="flex justify-center items-center p-4 bg-[#0D6EFD0D] rounded-md mb-2">
    <img src="${phone.image}" alt="">
  </div>
  <p class="text-xl font-bold">${phone.name}</p>
  <div class="space-y-3">
    <p> Storage: ${phone.mainFeatures.storage} </p>
    <p>Display Size: ${phone.mainFeatures.displaySize} </p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Slug: ${phone.slug}</p>
    <p>Release Date: ${phone.releaseDate}</p>
    <p>Brand: ${phone.brand}</p>
    <p>GPS: ${phone.others.GPS}</p>
  </div>
</div>
    `
    my_modal_5.showModal();

    // document.getElementById('customModal').showModal();
  };