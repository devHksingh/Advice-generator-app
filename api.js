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

// fetch("")

// fetch('https://randomuser.me/api/').then((response)=>{
//     let data = response.json()
//     // console.log(data);
//     return data
// }).then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{console.log(`error `,err);}).finally(()=>{
//     console.log(`this is response fetch`);
// })

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
        // console.log(userDetail.get("locationDetail").get("country"));
        // console.log(country);

        // name
        // firstNameEl.textContent =`${firstName}`
        // lastNameEl.textContent =`${lastName}`
        //location
        // locationEl.textContent = `${state}, ${country}`
        // closer
        function userDetailPrint(element,value) {
            
            return function(){
                element.textContent=`${value} `
            }
        }

        let printAtDom = userDetailPrint(firstNameEl,firstName)
        printAtDom(firstNameEl,firstName)
        printAtDom = userDetailPrint(lastNameEl,lastName)
        printAtDom(lastNameEl,lastName)
        printAtDom = userDetailPrint(stateEl,state)
        printAtDom(stateEl,state)
        printAtDom = userDetailPrint(countryEl,country)
        printAtDom(countryEl,country)


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

        // console.log(data[0])
        // console.log(data[0].content)
        // console.log(data[0].tags)

        quoteDetail.set("quote",data[0].content)
        quoteDetail.set("tags",data[0].tags)

        // console.log((quoteDetail.get("tags"))[1]);

        // tag
        // console.log(quoteDetail);
        tagArr = quoteDetail.get("tags")
        // console.log(quoteDetail.get("tags"));
        // console.log(tagArr.length);
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
apiCall()





