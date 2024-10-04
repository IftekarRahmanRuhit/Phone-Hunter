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
                    <button onclick="" class="btn bg-[#0D6EFD] text-white ">Show Details</button>
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
const loadDetails = async () => {
    const uri = ``;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };
  
  const displayDetails = () => {
    

  

    document.getElementById('customModal').showModal();
  };