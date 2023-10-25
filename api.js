const userApiUrl = 'https://randomuser.me/api/'
// const quotesApiUrl = "https://api.quotable.io/quotes/random?tags=technology,famous-quotes"
const quotesApiUrl = "https://api.quotable.io/quotes/random"

let userName
let userLocation
let userPicLarge
let userPicMedium
let userPicSmall
// let quote
let quoteTag
let userDetail = new Map()
let quoteDetail = new Map()

const tagEl = document.querySelector("#tag")
const adviceEl = document.querySelector("#advice")
const firstNameEl = document.querySelector("#first-name")
const lastNameEl = document.querySelector("#last-name")
const locationEl = document.querySelector("#location")
const stateEl = document.querySelector("#state")
const countryEl = document.querySelector("#country")

const imgDiv = document.querySelector(".img")
const refreshBtn =document.querySelector("#refresh")



function apiCall(){

    
    // random user api
    fetch(userApiUrl)
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }else{
            const data = response.json()
            
            return data
        }
    })
    .then((data)=>{
     
        
        // user name
        const userName = new Map()
        userName.set("title",data.results[0].name['title'])
        userName.set("first",data.results[0].name['first'])
        userName.set("last",data.results[0].name['last'])

        userDetail.set("userNameDetail",userName)
        // user location
        const userLocation = new Map()
        userLocation.set("city",data.results[0].location.city)
        userLocation.set("state",data.results[0].location.state)
        userLocation.set("country",data.results[0].location.country)

        userDetail.set("locationDetail",userLocation)
        // console.log(userDetail.get("locationDetail").get("country"));

        // console.log(data.results[0].picture);
        //user pic
        const userProfilePic = new Map();
        userProfilePic.set("large",data.results[0].picture.large)
        userProfilePic.set("medium",data.results[0].picture.medium)
        userProfilePic.set("thumbnail",data.results[0].picture.thumbnail)

        userDetail.set("img",userProfilePic)

        // display()

        console.log(userDetail);
        const firstName= userDetail.get("userNameDetail").get("first");
        const lastName= userDetail.get("userNameDetail").get("last");
        // console.log(userDetail.get("userNameDetail").get("last"));
        const state=userDetail.get("locationDetail").get("state");
        const country=userDetail.get("locationDetail").get("country");
        

        // name
        
        // closer
        function userDetailPrint(element,value) {
            
            return function(){
                element.textContent=`${value} `
            }
        }

        const printFirstName = userDetailPrint(firstNameEl,firstName)
        const printLastName = userDetailPrint(lastNameEl,lastName)
        const printState = userDetailPrint(stateEl,state)
        const printCountry = userDetailPrint(countryEl,country)

        printFirstName()
        printLastName()
        printState()
        printCountry()


        //user pic
        const largePic = userDetail.get("img").get("large")
        
        // document.querySelector("body").style.backgroundImage =`url(${largePic})`
        imgDiv.style.backgroundImage = `url(${largePic})`
        


    })
    .catch((error)=>{
        console.log(`user data request error `,error);
    })
    .finally(()=>{console.log(`Random user Api called`)})

    // random quote api

    fetch(quotesApiUrl)
    .then((response)=>{
        if (!response.ok) {
            
            throw new Error("Network response was not ok")
        }
        return response.json()
    })
    .then((data)=>{


        quoteDetail.set("quote",data[0].content)
        quoteDetail.set("tags",data[0].tags)

        

        // tag
        
        tagEl.textContent=``
        tagArr = quoteDetail.get("tags")
        
        if (tagArr.length > 0) {

            tagArr.forEach(element => {
            
                tagEl.textContent += `# ${element} `
            });
            
        } 

        // quote
        adviceEl.textContent = `${quoteDetail.get("quote")}`

        

    })
    .catch((err)=>{console.log(`Quotes Api Error: `,err);})
    .finally(()=>{console.log(`Quotes Api called`)})

    

}
document.querySelector("#refresh").addEventListener('click',()=>{
    
    
    console.log(quoteDetail);
    userDetail.clear()
    quoteDetail.clear()

    apiCall()
},false)
apiCall()


function setDeviceBackground(){
    const screenWidth = window.innerWidth;
    const bodyEl = document.querySelector('body');

    if (screenWidth <= 768) {
        //Mobile device background
    
        bodyEl.style.backgroundImage = 'url("./img/background-destination-mobile.jpg")'
        bodyEl.style.backgroundRepeat='no-repeat'
        bodyEl.style.backgroundSize='cover'
        refreshBtn.style.left = '25%';
    } else if(screenWidth <= 1024) {
        //Tablet device background
    
        bodyEl.style.backgroundImage = 'url("./img/background-destination-tablet.jpg")'
        bodyEl.style.backgroundRepeat='no-repeat'
        bodyEl.style.backgroundSize='cover'
    }else{
        //Tablet device background
        bodyEl.style.backgroundImage = 'url("./img/background-destination-desktop.jpg")'
        bodyEl.style.backgroundRepeat='no-repeat'
        bodyEl.style.backgroundSize='cover'
    }


}

setDeviceBackground()

window.addEventListener('resize',setDeviceBackground)


