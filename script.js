            const wrapper = document.querySelector(".wrapper"),
            inputpart = document.querySelector(".input-part"),
            infodiv = document.querySelector(".info-div"),
            inputfield = document.querySelector("input"),
            locationbutton = document.querySelector("button"),
            weatherpart = document.querySelector(".weather-part"),
            weathericon = document.querySelector("img"),
            backwardarrow = document.querySelector("header i");

        let api;

        inputfield.addEventListener("keyup",e =>{
            if(e.key =="Enter" && inputfield.value !=""){
                requestapi(inputfield.value)
            }
        })

        function requestapi(city){
            api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d1c22a935ccb8bb94ade30683cecd328`;
            fetchdata();
        }
        function onsuccess(position){
            const {latitude, longitude} = position.coords;
            api = `https://api.openweathermap.org/data/2.5/weather?lat=77.2167&lon=28.6667&units=metric&appid=d1c22a935ccb8bb94ade30683cecd328`;
            fetchdata();
        }
        locationbutton.addEventListener("click", () =>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(onsuccess, onerror);
            }else{
                alert("Your browser not support geolocation api");
            }
        });



        function fetchdata(){
            infodiv.innerText = "Getting weather details...";
            infodiv.classList.add("pending");
            fetch(api).then(res => res.json()).then(result => weatherdetails(result)).catch(() =>{
                infodiv.innerText = "Something went wrong";
                infodiv.classList.replace("pending", "error");
            });
        }




        function onerror(error){
            infodiv.innerText=error.message;
            infoTxt.classList.add("error");
        }

        function weatherdetails(info){
            if(info.cod == "404"){
                infodiv.classList.replace("pending", "error");
                infodiv.innerText = `${inputfield.value} isn't a valid city name`;
            }else{
                const city = info.name;
                console.log(city)
                const country = info.sys.country;
                const {description, id} = info.weather[0];
                const {temp, feels_like, humidity} = info.main;
                if(id == 800){
                    weathericon.src = "https://i.pinimg.com/564x/84/03/5f/84035fbe076a5fe3ad3526ae4f436ec9.jpg";
                    //document.querySelector("body").style.background="orange"//clear
                    document.querySelector("body").style.backgroundImage="url('https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722376/after_noon.png?compress=1&resize=400x300')"//clear

                }else if(id >= 200 && id <= 232){
                    weathericon.src = "https://freepngimg.com/thumb/storm/31147-4-storm-image-thumb.png";  
                    //document.querySelector("body").style.background="pink"//storm
                    document.querySelector("body").style.color="white"
                    document.querySelector("header").style.color="white"
                    document.querySelector("#icon1").style.color="white"
                    document.querySelector("#icon2").style.color="white"
    

                    document.querySelector("body").style.backgroundImage="url('https://www.stormshieldapp.com/static/images/section1.1-bg.jpg')"
                }else if(id >= 600 && id <= 622){
                    weathericon.src = "https://www.seekpng.com/png/detail/2-21061_png-file-snow-weather-icon-png.png";
                    //document.querySelector("body").style.background="blueviolet"//snow
                
                    
                    document.querySelector("body").style.backgroundImage="url('https://images.unsplash.com/photo-1517259227355-de4b20b3fe46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c25vdyUyMGJsaXp6YXJkfGVufDB8fDB8fA%3D%3D&w=1000&q=80')"
                }else if(id >= 701 && id <= 781){
                    weathericon.src = "https://icons-for-free.com/iconfiles/png/512/fog+foggy+weather+icon-1320196634851598977.png";
                // document.querySelector("body").style.background="white"//mist
                document.querySelector("body").style.backgroundImage="url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJqIkWc8PYNJa0b-iFYWINJ1zOPIf_xVljPsCR6ArFluZGNaX6Z0nyGO0DcwXl6O3HIU&usqp=CAU')"
                }else if(id >= 801 && id <= 804){
                    weathericon.src = "https://img.favpng.com/11/17/11/cloud-weather-rain-illustration-png-favpng-DJmSjCNPBEmDZqgvMHMWMAnek.jpg";
                    //document.querySelector("body").style.background="powderblue"//clearcloud
                    document.querySelector("body").style.backgroundImage="url('https://media.istockphoto.com/photos/beautiful-sky-with-white-clouds-picture-id182412483?k=20&m=182412483&s=612x612&w=0&h=axQ1-d_KRgxHIxDYQPG-yQuxjeIjXiQLDE8x5ltD-_0=')"
                }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
                    weathericon.src = "https://www.pngkey.com/png/detail/385-3855345_nuages-pluie-rainy-weather-icons.png";
                    //document.querySelector("body").style.background="blue"//rain
                    document.querySelector("body").style.color="white"
                document.querySelector("header").style.color="white"
                document.querySelector("#icon1").style.color="white"
                document.querySelector("#icon2").style.color="white"


                    document.querySelector("body").style.backgroundImage="url('https://www.maketecheasier.com/assets/uploads/2020/06/Featured-Image-Live-Weather-Wallpapers-Android-400x200.jpg.webp')"
                }
                
                document.querySelector(".temp .num").innerText = Math.floor(temp);
                document.querySelector(".weather").innerText = description;
                document.querySelector(".location span").innerText = `${city}, ${country}`;
                document.querySelector(".temp .num2").innerText = Math.floor(feels_like);
                document.querySelector(".humidity span").innerText = `${humidity}%`;
                infodiv.classList.remove("pending", "error");
                infodiv.innerText = "";
                inputfield.value = "";
                wrapper.classList.add("active");
            }
        }
        backwardarrow.addEventListener("click", ()=>{
            wrapper.classList.remove("active");
        });