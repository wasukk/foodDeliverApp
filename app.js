// var email = document.getElementById('sign');
// // console.log(email)
// function showData(){
//     console.log(email.value);
// }

let userName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone')
let country = document.getElementById('country')
let city = document.getElementById('city')
let password = document.getElementById('password')
let sellerName = document.getElementById('sellerName')
let getCustomerId ;

// let confirmPassword = document.getElementById('confirm-password')

// function showData(){
//     // console.log(email.value);
//     // console.log(userName.value)
//     // console.log(phone.value)
//     // console.log(country.value)
//     // console.log(city.value)
//     // console.log(password.value)
//     // console.log(confirmPassword.value)
//     // console.log(sellerName.value);
// }


// User SignUp

const userSignUp = ()=>{
    // alert("ok")
    let userName = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone')
    let country = document.getElementById('country')
    let city = document.getElementById('city')
    let password = document.getElementById('password')
   


    // console.log(email.value);
    // console.log(userName.value)
    // console.log(phone.value)
    // console.log(country.value)
    // console.log(city.value)
    // console.log(password.value)
    // console.log(country.value)
    // console.log(confirmPassword.value)
    // console.log(sellerName.value);
    // Sign Up form
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        // ...
        var obj = {
            name :      userName.value,
            email:      email.value,
            password:   password.value,
            phone:      phone.value,
            country: country.value,
            city: city.value,
            uid : user.uid
            
        }
        firebase.database().ref(`/user/`).child(user.uid).set(obj);
        // console.log(email.value);
        // if(obj.profession==="Teacher"){
        //     firebase.database().ref('teacher').push(obj);
        // }
        // else{
        //     firebase.database().ref('student').push(obj);
        // }
        // window.location ='signin.html'
                userName.value= '' ;
                email.value = '' ;
                password.value = '';
                // profession.value = '';
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert( errorCode + " : "+ errorMessage);
    });
    
    
    }


// Resturant SignUp

const resturantSignUp = ()=>{
    let userName = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone')
    let country = document.getElementById('country')
    let city = document.getElementById('city')
    let password = document.getElementById('password')
    let sellerName = document.getElementById('sellerName')


    // console.log(email.value);
    // console.log(userName.value)
    // console.log(phone.value)
    // console.log(country.value)
    // console.log(city.value)
    // console.log(password.value)
    // console.log(country.value)
    // console.log(confirmPassword.value)
    // console.log(sellerName.value);
    // Sign Up form
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        console.log(user.uid);
        // ...
        var obj = {
            name :      userName.value,
            email:      email.value,
            password:   password.value,
            phone:      phone.value,
            country:    country.value,
            city:       city.value,
            sellerName : sellerName.value,
            uid : user.uid
        }
        firebase.database().ref(`/Restaurant/`).child(user.uid).set(obj);
        // console.log(email.value);
        // if(obj.profession==="Teacher"){
        //     firebase.database().ref('teacher').push(obj);
        // }
        // else{
        //     firebase.database().ref('student').push(obj);
        // }
        // window.location ='signin.html'
                userName.value= '' ;
                email.value = '' ;
                password.value = '';
                // profession.value = '';
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert( errorCode + " : "+ errorMessage);
    });
    
    }

// sign In 

let signIn = () =>{

    let email = document.getElementById('email');
    let password = document.getElementById('password')


    if(email=='' ||password=="" ){
        alert("Enter Correct Values")
    }
    else{

        
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
          console.log("SignedIn Successfully")
          console.log("User Email :",user.email)
          console.log("User Uid :",user.uid)

          localStorage.setItem('Current_user Uid',user.uid);

        //   .....
        let currentUser = localStorage.getItem('Current_user Uid')
            getCustomerId = currentUser;
        console.log(currentUser);
        console.log(getCustomerId);
        firebase.database().ref().child('Restaurant').orderByChild('uid').equalTo(currentUser).once('value')
    .then((snap) => {
        var data = snap.toJSON();
        // console.log("Not json",snap)
        // console.log("JSON",data)



        if (data == null) {
            window.location = 'users.html'
            firebase.database().ref().child('user')
                .orderByChild('uid')
                .equalTo(currentUser)
                .once('value')
                .then((snap) => {
                    var data = snap.toJSON();

                    const value = Object.values(data)

                    console.log("user:", value[0].email)

                    document.getElementById('email').innerText = value[0].email
                    document.getElementById('name').innerText = value[0].Name

                    // firebase.database().ref('Resturant').once('value')
                    //     .then((data) => {
                    //         var js = data.toJSON()
                    //         console.log(js)
                    //     })
                    //     .catch((err) => {
                    //         console.log(err)
                    //     })

                    firebase.database().ref('Restaurant').once('value', (snapshot) => {

                        const data11 = snapshot.toJSON()
                        const value = Object.values(data11)
            
                        console.log("Resturants:",value)
                    })


                })

        }

        else {
           
            window.location = "resturants.html"

            // const key = Object.keys(data)
            // console.log(key)
            const value = Object.values(data)
            console.log(value)

            console.log("Resturant:", value[0].email)

            document.getElementById('email').innerText = value[0].email
            document.getElementById('name').innerText = value[0].Name

           var user_data = []

             var data = document.getElementById("user_data")
           

            firebase.database().ref('User').once('value', (snapshot) => {

                const data11 = snapshot.toJSON()
                const value = Object.values(data11)
                
                // value.forEach(v=>
                 
                //    user_data.push(v)   
                // )
               

                // user_data.map((v,i)=>{
                //     // console.log("User No :",i)
                //     // console.log("User Value :",v)
               
                //     var ele1 = document.createElement('h1')
                //     var text = document.createTextNode(`User Name :${v.Name}`)
                //     ele1.appendChild(text)
                //     var ele2 = document.createElement('h3')
                //     var text2 = document.createTextNode(`User Email :${v.email}`)
                //     ele2.appendChild(text2)
                //     data.appendChild(ele1)
                //     data.appendChild(ele2)

                // })
               
                
            })
           

          


          

          
        }


    })
 
    // console.log( user + "  Signed in Successfully")

    // window.location = "students.html"
    // let check = firebase.database().ref('student')
 
    // if(firebase.database().ref('student') ==='true'){
    //     console.log("Student");
    // }
    // else{
    //     console.log("Teacher");
    // }
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert( errorCode+ " : " +errorMessage)
  });
}
}





// ShowCutomers
var a = localStorage.getItem('Current_user Uid')
const showCutomer=()=>{



    firebase.database().ref().child('Resturant').orderByChild('uid').equalTo(a).once('value')
    .then((snap) => {
        var data = snap.toJSON();
        // console.log("Not json",snap)
        // console.log("JSON",data)



        if (data == null) {

            firebase.database().ref().child('user')
              
                .once('value')
                .then((snap) => {
                    var data = snap.toJSON();
                    console.log(data)

                    const value = Object.values(data)

                    // console.log("user:", value[0].email)

                    document.getElementById('email').innerText = value[0].email
                    document.getElementById('name').innerText = value[0].name

                    // firebase.database().ref('Resturant').once('value')
                    //     .then((data) => {
                    //         var js = data.toJSON()
                    //         console.log(js)
                    //     })
                    //     .catch((err) => {
                    //         console.log(err)
                    //     })

                    // firebase.database().ref('Restaurant').once('value', (snapshot) => {

                    //     const data11 = snapshot.toJSON()
                    //     const value = Object.values(data11)
            
                    //     console.log("Resturants:",value)
                    // })


                })

        }

        else {

            // const key = Object.keys(data)
            // console.log(key)
            const value = Object.values(data)
            console.log(value)

            console.log("Resturant:", value[0].email)

            document.getElementById('email').innerText = value[0].email
            document.getElementById('name').innerText = value[0].Name

           var user_data = []

             var data = document.getElementById("user_data")
           

            firebase.database().ref('user').once('value', (snapshot) => {

                const data11 = snapshot.toJSON()
                const value = Object.values(data11)
                
                value.forEach(v=>
                 
                   user_data.push(v)   
                )
               

                user_data.map((v,i)=>{
                    // console.log("User No :",i)
                    // console.log("User Value :",v)
               
                    var ele1 = document.createElement('h1')
                    var text = document.createTextNode(`User Name :${v.Name}`)
                    ele1.appendChild(text)
                    var ele2 = document.createElement('h3')
                    var text2 = document.createTextNode(`User Email :${v.email}`)
                    ele2.appendChild(text2)
                    data.appendChild(ele1)
                    data.appendChild(ele2)

                })
               
                
            })
           

          


          

          
        }


    })








}
// Show 
const showResturant=()=>{



    firebase.database().ref().child('Resturant').orderByChild('uid').equalTo(a).once('value')
    .then((snap) => {
        var data = snap.toJSON();
        // console.log("Not json",snap)
        // console.log("JSON",data)



        if (data == null) {

            firebase.database().ref().child('Restaurant')
              
                .once('value')
                .then((snap) => {
                    var data = snap.toJSON();
                    console.log(data)

                    const value = Object.values(data)

                    // console.log("user:", value[0].email)

                    document.getElementById('email').innerText = value[0].email
                    document.getElementById('name').innerText = value[0].name

                    // firebase.database().ref('Resturant').once('value')
                    //     .then((data) => {
                    //         var js = data.toJSON()
                    //         console.log(js)
                    //     })
                    //     .catch((err) => {
                    //         console.log(err)
                    //     })

                    // firebase.database().ref('Restaurant').once('value', (snapshot) => {

                    //     const data11 = snapshot.toJSON()
                    //     const value = Object.values(data11)
            
                    //     console.log("Resturants:",value)
                    // })


                })

        }

        else {

            // const key = Object.keys(data)
            // console.log(key)
            const value = Object.values(data)
            console.log(value)

            console.log("Resturant:", value[0].email)

            document.getElementById('email').innerText = value[0].email
            document.getElementById('name').innerText = value[0].Name

           var user_data = []

             var data = document.getElementById("user_data")
           

            firebase.database().ref('user').once('value', (snapshot) => {

                const data11 = snapshot.toJSON()
                const value = Object.values(data11)
                
                value.forEach(v=>
                 
                   user_data.push(v)   
                )
               

                user_data.map((v,i)=>{
                    // console.log("User No :",i)
                    // console.log("User Value :",v)
               
                    var ele1 = document.createElement('h1')
                    var text = document.createTextNode(`User Name :${v.Name}`)
                    ele1.appendChild(text)
                    var ele2 = document.createElement('h3')
                    var text2 = document.createTextNode(`User Email :${v.email}`)
                    ele2.appendChild(text2)
                    data.appendChild(ele1)
                    data.appendChild(ele2)

                })
               
                
            })
           

          


          

          
        }


    })

}





// dishes


let dishName = document.getElementById('dName');
let dishPrice = document.getElementById('dPrice');
let dishCat = document.getElementById('dCat');
// let dishImage = document.write('dImage');
let dishDelivery = document.getElementById('dDelivery');
const writeUserData = () =>{
    
    console.log(dishName.value)
    console.log(dishPrice.value)
    console.log(dishCat.value)
    console.log(dishDelivery.value)

    a = localStorage.getItem('Current_user Uid')

    firebase.database().ref().child('Restaurant').orderByChild('uid').equalTo(a).once('value')
    .then((snap) => {
        var data = snap.toJSON()
        var value = Object.values(data)

        console.log(value[0].Dish1_Name)
        

        if(value.Dish1_Name == undefined){
            var obj ={
                city: value[0].city,
                country: value[0].country,
                email: value[0].email,
                name: value[0].name,
                password: value[0].password,
                phone: value[0].phone,
                sellerName: value[0].sellerName,
                uid: value[0].uid,
                Dish1_Name:dishName.value,
                Dish1_Price : dishPrice.value,
                Dish1_Cat:dishCat.value,
                Dish1_Dilvery : dishDelivery.value

            }

            firebase.database().ref('/Restaurant').child(a).set(obj)

        }
        else if(value.Dish2_Name == undefined){
            alert("ok")
            var obj ={
                city: value[0].city,
                country: value[0].country,
                email: value[0].email,
                name: value[0].name,
                password: value[0].password,
                phone: value[0].phone,
                sellerName: value[0].sellerName,
                uid: value[0].uid,
                Dish2_Name:dishName.value,
                Dish2_Cat:dishCat.value,
                Dish2_Price : dishPrice.value,
                Dish2_Dilvery : dishDelivery.value

            }
            firebase.database().ref('/Restaurant').child(a).set(obj)

        }
        console.log(value)

        
    })




// firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
//       .then((userCredential) => {
//         // Signed in
//         var user = userCredential.user;
//         console.log(user);
//         console.log(user.uid);
//         // ...
//         var obj = {
//             dishName :      dishName.value,
//             dishPrice:      dishPrice.value,
//             dishCat :   dishCat.value,
//             dishDelivery:      dishDelivery.value,
//             uid : user.uid
//         }
//         firebase.database().ref('Restaurant').push(obj);
//         // console.log(email.value);
//         // if(obj.profession==="Teacher"){
//         //     firebase.database().ref('teacher').push(obj);
//         // }
//         // else{
//         //     firebase.database().ref('student').push(obj);
//         // }
//         // window.location ='signin.html'
//                 userName.value= '' ;
//                 email.value = '' ;
//                 password.value = '';
//                 // profession.value = '';
//     })
//       .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         alert( errorCode + " : "+ errorMessage);
//     });
    
    }

