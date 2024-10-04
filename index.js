
// Declaring a function to load data from API
const loadPhone = async(searchText = 'iphone',isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones ,isShowAll);

    document.getElementById('spinner').style.display='none'
}

// Displaying phones on the page 
const displayPhones = (phones, isShowAll) => {

    const phoneCards = document.getElementById('phoneCards');
    phoneCards.innerHTML = '';
   
    let showPhone = phones;

    if(showPhone.length === 0){
        // Showing no-item image when no items are found
        document.getElementById('no-item').classList.remove('hidden');
        document.getElementById('show-all-button-container').classList.add('hidden');
        return;

    }
    else{
        // Hiding no-item image when items are found
        document.getElementById('no-item').classList.add('hidden');
    }

    if(!isShowAll){
        showPhone= showPhone.slice(0, 6);
        document.getElementById('show-all-button-container').classList.remove('hidden')
    }
    else{
        showPhone= showPhone
        document.getElementById('show-all-button-container').classList.add('hidden')
    }

    showPhone.forEach((item) =>{
        
        const phoneCard = document.createElement('div')
        phoneCard.innerHTML=`
        <div class="border p-4 flex flex-col justify-start items-center space-y-4 rounded-lg bg-slate-50 hover:border-slate-400 hover:cursor-pointer">
                <div class="p-7 bg-[#0D6EFD0D] rounded-md">
                    <img src="${item.image}" alt="${item.phone_name}">
                </div>
                <h3 class="text-xl font-semibold">${item.phone_name}</h3>
                <p class="text-center font-semibold">There are many variations of passages of text available, but the majority have suffered.</p>
                <p class="text-center font-bold text-2xl">$999</p>
                <div>
                    <button onclick="loadDetails('${item.slug}')" class="btn bg-[#0D6EFD] text-white hover:text-black">Show Details</button>
                </div>
            </div>                 
        `
        phoneCards.append(phoneCard); 
    })
}
// Calling the loadPhone Function 
loadPhone();


// spinner 
const handleSearch = ()=>{
    document.getElementById('spinner').style.display='block';
    const searchText = document.getElementById('search-input').value;
    setTimeout(function() {
        if (searchText) {
            loadPhone(searchText); //Calling loadPhone function with search input
        } else {
            loadPhone(); // Calling loadPhone function for show Default iphone
        }
},1000)
}

// show more Button 

const handleShowAll = ()=>{
    const searchText = document.getElementById('search-input').value || 'iphone';
    loadPhone(searchText, true);

}

// Loading Details From API  
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
  <div class="flex justify-center items-center p-4 bg-[#0D6EFD0D] rounded-md">
    <img src="${phone.image}" alt="">
  </div>

  <div class="space-y-3">
  <p class="text-xl font-bold ">${phone.name}</p>
    <p class='font-semibold'> Storage: ${phone.mainFeatures.storage} </p>
    <p class='font-semibold'>Display Size: ${phone.mainFeatures.displaySize} </p>
    <p class='font-semibold'>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p class='font-semibold'>Memory: ${phone.mainFeatures.memory}</p>
    <p class='font-semibold'>Slug: ${phone.slug}</p>
    <p class='font-semibold'>Release Date: ${phone.releaseDate}</p>
    <p class='font-semibold'>Brand: ${phone.brand}</p>
    <p class='font-semibold'>GPS: ${phone.others.GPS}</p>
  </div>
</div>
    `
    my_modal_5.showModal();

  };

  