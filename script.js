$(document).ready(function() {
    /*(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "weekly"});*/

    // controlla se l'utente è loggato
    checkLoginStatus();

    // fa in modo che cliccando su "cambia immagine" si clicchi in realtà sull'input per inserire un file
    $("#change-pic-link").on("click", function(e) {
        e.preventDefault();
        $("#user-pic-input").click();
    });

    // gestione caricamento user pic
    $("#user-pic-input").on("change", function() {
        var imageFile = $(this).prop("files")[0];   // oggetto FileList contenente tutti i file selezionati. con [0] selezioniamo solo il primo file
        var formData = new FormData();  // oggetto per creare coppie chiave-valore da inviare in una richiesta HTTP
        formData.append("image", imageFile);    // aggiunge una coppia chiave-valore "image"-imageFile

        // Richiesta AJAX per caricare l'immagine
        $.ajax({
            url: "./uploadUserPic.php",
            type: "POST",
            data: formData,
            processData: false, // file inviati direttamente senza pre-processarli
            contentType: false,
            success: function(response) {
                $("#user-pic").attr("src", response);
                localStorage.setItem("user-pic_" + profileUsername, response);
            },
            error: function() {
                alert("Errore");
            }
        });
    });

    $("#signup-button").on("click", function() {
        toggleSignupForm();
    });

    $("#login-button").on("click", function() {
        toggleLoginForm();
    });

    $("#signup-button-lm").on("click", function() {
        toggleSignupFormLM();
    });

    $("#login-button-lm").on("click", function() {
        toggleLoginFormLM();
    });

    $("#close-signup-form").on("click", function() {
        closeSignupForm();
    });

    $("#close-login-form").on("click", function() {
        closeLoginForm();
    });

    /* Gestione search-bar del left-menu */
    $(".nav").on("click", function() {
        setCurrentPill($(this).attr("id"));
        toggleSearchBarLM();
    });

    /* Gestione search-bar del top-menu */
    /*$(".search-bar-container").on("click", function() {
        if (425 < $(window).width() && $(window).width() <= 1024) {
            $(".search-bar-container").css("top", "110px");
            $(".search-bar-container").css("max-width", "600px");
            $(".right-container").css("margin-top", "70px");
            $("#signup-button").prop("disabled", true);
            $("#login-button").prop("disabled", true);
        } else if ($(window).width() <= 425) {
            $(".search-bar-container").css("max-width", "600px");
            $("#signup-button").prop("disabled", true);
            $("#login-button").prop("disabled", true);
        }
    });*/

    /* Chiusura search-bar del top-menu */
    /*$("body > *").not("body > .search-bar-container").on("click", function() {
        if ($(".search-bar-container").css("top") == "110px") {
            if (425 < $(window).width() && $(window).width() <= 1024) {
                $(".search-bar-container").css("top", "30px");
                $(".search-bar-container").css("max-width", "55px");
                $(".right-container").css("margin-top", "0px");
                $("#signup-button").prop("disabled", false);
                $("#login-button").prop("disabled", false);
            } else if ($(window).width() <= 425) {
                $(".search-bar-container").css("max-width", "55px");
                $("#signup-button").prop("disabled", false);
                $("#login-button").prop("disabled", false);
            }
        }
    });*/

    /*$("#darkmode-btn").on("click", function() {
        $("#darkmode-btn").toggleClass("dark");
        $("#darkmode-btn").toggleClass("light");
        if ($("#darkmode-btn").hasClass("light")) {
            $(".darkmode").css("background-color", "white");
            $("#darkmode-btn").css("background-color", "rgb(110, 110, 110)");
        } else {
            $(".darkmode").css("background-color", "rgb(80, 80, 80)");
            $("#darkmode-btn").css("background-color", "white");
        }
    });*/

    // Gestione ridimensionamento finestra (Da rifare)
    $(window).on("resize", function() {
        /*if($(".left-menu").css("display") != "none") {  // Desktop
            $("#search-pill").removeClass("current");
            $("#near-me-pill").addClass("current");
            $(".search-bar-container").css("display", "none");
            $(".right-container").css("margin", "20px 30px 20px 900px");
        } else {    // Mobile
            $(".search-bar-container").css("display", "none");
            $("#map").css("display", "none");
            $(".right-container").css("margin", "0px 20px 0px 20px");
            if ($(".signup-form-container").css("display") != "none") {
                $("#signup-button").css("padding", "10px 60px");
                $("#login-button").css("padding", "10px 10px");
            }
            if ($(".login-form-container").css("display") != "none") {
                $("#login-button").css("padding", "10px 60px");
                $("#signup-button").css("padding", "10px 10px");
            }
        }*/
    });
});

function toggleSearchBarLM() {
    // se si clicca su un oggetto .nav si apre la barra
    if ($(".nav").hasClass("current")) {
        $("#map").css("top", "110px");
        $(".search-bar-container").fadeIn();
        $(".search-bar-container").css("margin-top", "30px");
        $(".search-bar-container").css("display", "flex");
        document.getElementById("search-bar").focus();
    }

    $("#search-bar").val("");
    // gestione placeholder
    if ($("#search-pill").hasClass("current")) {
        
        $("#search-bar").attr("placeholder", "Dove vuoi andare?");
    } else if ($("#near-me-pill").hasClass("current")) {
        $("#search-bar").attr("placeholder", "Cerca luoghi generici vicino a te (es: libreria, discoteca)");
    } else if ($("#suggestions-pill").hasClass("current")) {
        $("#search-bar").attr("placeholder", "Cerca luoghi sul tema di una stringa (es: pizza)");
    }
}

/* Apre il form di registrazione */
function toggleSignupForm() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return false;

    /* form chiusi */
    if ($("#signup-button").css("padding") == "10px 20px") {
        $("#signup-button").css("padding", "10px 60px");
        $("#login-button").css("padding", "10px 10px");
        $(".signup-form-container").fadeIn();   // fadeIn
        $(".signup-form-container").css("transform", "scale(1.0)");
    /* form aperto */
    } else if ($("#signup-button").css("padding") == "10px 60px") {
        $("#signup-button").css("padding", "10px 20px");
        $("#login-button").css("padding", "10px 30px");
        $(".signup-form-container").fadeOut();   // fadeOut
        $(".signup-form-container").css("transform", "scale(0.0)");
    } else {    // login form aperto
        $("#signup-button").css("padding", "10px 60px");
        $("#login-button").css("padding", "10px 10px");
        $(".login-form-container").fadeToggle(1);
        $(".login-form-container").css("transform", "scale(0.0)");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
    }
}

/* Apre il form di accesso */
function toggleLoginForm() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return false;

    /* form chiusi */
    if ($("#login-button").css("padding") == "10px 30px") {
        $("#login-button").css("padding", "10px 60px");
        $("#signup-button").css("padding", "10px 10px");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
    /* login form aperto */
    } else if ($("#login-button").css("padding") == "10px 60px") {
        $("#login-button").css("padding", "10px 30px");
        $("#signup-button").css("padding", "10px 20px");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    } else {    // signup form aperto
        $("#login-button").css("padding", "10px 60px");
        $("#signup-button").css("padding", "10px 10px");
        $(".signup-form-container").fadeToggle(1);
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
    }
}

function closeSignupForm() {
    if ($(".left-menu").css("display") == "flex") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".subtitle").css("margin-top", "50px");
        $(".left-menu").css("height", "560px");
    } else {
        $("#signup-button").css("padding", "10px 20px");
        $("#login-button").css("padding", "10px 30px");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
    }
}

function closeLoginForm() {
    if ($(".left-menu").css("display") == "flex") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    } else {
        $("#login-button").css("padding", "10px 30px");
        $("#signup-button").css("padding", "10px 20px");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    }
}

function setCurrentPill(pillId) {
    $(".nav").removeClass("current");
    $("#" + pillId).addClass("current");
}

function toggleSignupFormLM() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return;

    // form chiusi
    if ($(".signup-form-container").css("display") == "none" && $(".login-form-container").css("display") == "none") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        $(".subtitle").css("margin-top", "20px");
        $(".left-menu").css("height", "470px");
        document.signupForm.username.focus();
    // signup form aperto -> va chiuso
    } else if ($(".signup-form-container").css("display") == "block") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".subtitle").css("margin-top", "50px");
        $(".left-menu").css("height", "560px");
    // login form aperto
    } else if ($(".login-form-container").css("display") == "block") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        $(".subtitle").css("margin-top", "20px");
        $(".left-menu").css("height", "470px");
        document.signupForm.username.focus();
    }
}

function toggleLoginFormLM() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return;

    // form chiusi
    if ($(".signup-form-container").css("display") == "none" && $(".login-form-container").css("display") == "none") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
        document.loginForm.email.focus();
    // login form aperto -> va chiuso
    } else if ($(".login-form-container").css("display") == "block") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    // signup form aperto
    } else if ($(".signup-form-container").css("display") == "block") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
        $(".subtitle").css("margin-top", "50px");
        $(".left-menu").css("height", "560px");
        document.loginForm.email.focus();
    }
}

function checkSignupForm() {
    const usernameInput = document.signupForm.username;
    const emailInput = document.signupForm.email;
    const passwordInput = document.signupForm.psw;

    const usernameRegex = /^[a-zA-Z0-9.\-_]{3,20}$/;        // 3-20 caratteri alfanumerici + .-_
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,40}$/;
    const passwordRegex = /^[a-zA-Z0-9.\-_!?$&]{6,20}$/;    // 6-20 caratteri alfanumerici + .-_!?$&
    
    if (usernameInput.value == "" || !usernameInput.value.match(usernameRegex)) {
        //alert("L'username deve contenere da 3 a 20 caratteri alfanumerici.");
        showAlert("username-alert");
        usernameInput.focus();
        setTimeout(function() {
            $("#username-alert").fadeOut(150);
            $("#username-alert").css("margin-bottom", "0px");
            $(".signup-form-container").css("bottom", "20px");
        }, 3000);
        return false;
    }

    if (emailInput.value == "" || !emailInput.value.match(emailRegex)) {
        showAlert("email-alert");
        emailInput.focus();
        setTimeout(function() {
            $("#email-alert").fadeOut(150);
            $("#email-alert").css("margin-bottom", "0px");
            $(".signup-form-container").css("bottom", "20px");
        }, 3000);
        return false;
    }

    if (passwordInput.value == "" || !passwordInput.value.match(passwordRegex)) {
        showAlert("password-alert");
        passwordInput.focus();
        setTimeout(function() {
            $("#password-alert").fadeOut(150);
            $("#password-alert").css("margin-bottom", "0px");
            $(".signup-form-container").css("bottom", "20px");
        }, 3000);
        return false;
    }

    return true;
}

var loggedIn, profileUsername;
function checkLoginStatus() {
    $.ajax({
        url: "./forms/getLoginStatus.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            loggedIn = response.loggedIn === "true";
            profileUsername = response.username;
            console.log("loggedIn:" + loggedIn, ", username:" + profileUsername);

            if (loggedIn) {
                showUserProfile(profileUsername);

                // Controlla se esiste una user pic associata all'username loggato
                var savedImageUrl = localStorage.getItem("user-pic_" + profileUsername);
                if (savedImageUrl)
                    $("#user-pic").attr("src", savedImageUrl);

                // Controlla se esiste una lista dei preferiti associata all'username loggato
                
            } else {
                showFormButtons();
            }
        },
        error: function() {
            // Gestione errore
        }
    });    
}

function showUserProfile(username) {
    $("#username-placeholder").text(profileUsername);
    $(".user-buttons").hide();
    $(".user-profile").show();
}

function showFormButtons() {
    $(".user-profile").hide();
    $(".user-buttons").show();
}



/* -------- Gestione APIs -------- */
let map, infoWindow;
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: { lat: 41.8954295, lng: 12.4874373 },
        zoom: 12,
    });

    // Geolocalizzazione
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Posizione corrente";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Posizione trovata.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
        } else {
            // Il browser non supporta la geolocalizzazione
            handleLocationError(false, infoWindow, map.getCenter());
        }
    })
}

// Gestore errori geolocalizzazione
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Il servizio di geolocalizzazione non ha funzionato."
        : "Il tuo browser non supporta la geolocalizzazione."
    );
    infoWindow.open(map);
}

function toggleMap() {
    $(".map-container").fadeIn();
    $("#map").css("transform", "scale(1.0)");
}



let settings;

function searchLocation(input) {
    //handleEmptySearch(input);
    
    // richiesta
    settings = {
        async: true,
        crossDomain: true,
        url: `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${input}&lang=it_IT&units=km`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '81de52f504msh18b7bdd5e303a63p18528djsn997fb5d3f4b0',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var res = response.data.Typeahead_autocomplete.results;

        // gestione primo luogo
        if (res[0].__typename == "Typeahead_LocationItem" && res[0].detailsV2.geocode != null) {
            const firstRes = res[0].detailsV2;
            const firstResLat = firstRes.geocode.latitude;
            const firstResLng = firstRes.geocode.longitude;
            const firstResLatLng = new google.maps.LatLng(firstResLat, firstResLng);
            const firstResName = firstRes.names.name;
            const firstResVenue = firstRes.names.longOnlyHierarchyTypeaheadV2;
            const firstResImages = res[0].image.photo;
            const firstResMarkerImg = firstResImages.photoSizes[2].url;
            
            // finestra informativa
            const contentString =
                '<div class="marker-content" style="text-align: center;">' +
                '<h5 style="font-weight: 800;">' + firstResName + '</h5>' +
                '<div class="mb-2">' +
                '<img src="' + firstResMarkerImg + '" class="marker-img">' +
                '</div>' +
                '<h7 style="color: #8b8b8b">' + firstResVenue + '</h7><br/>' +
                '<a href="#" id="add-favorite">Aggiungi ai preferiti</a>' +
                '</div>';
            const infoWindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: firstResName,
            });
    
            // marker
            const marker = new google.maps.Marker({
                map,
                title: firstResName,
                position: { lat: firstResLat, lng: firstResLng },
                animation: null,
            });
            marker.addListener("click", () => {
                infoWindow.open({
                    map,
                    anchor: marker, // collega la infoWindow al marker
                });
            });
            animateMarker(marker);
            map.setCenter(firstResLatLng); // la mappa viene centrata sulle coordinate del marker
        }
        
        // creazione schede di tutti i luoghi
        let title = document.createElement("h1");
        title.id = "tips-title";
        title.textContent = input;
        let cardsContainer = document.createElement("div");
        cardsContainer.classList.add("tips-cards");
        for (var i=0; i < res.length; i++) {
            if (res[i].__typename == "Typeahead_LocationItem" && res[i].detailsV2.geocode !== null) {
                var iRes = res[i].detailsV2;

                var iLat = iRes.geocode.latitude;
                var iLng = iRes.geocode.longitude;
                var iLatLng = new google.maps.LatLng(iLat, iLng);
                var iName = iRes.names.name;
                var iVenue = iRes.names.longOnlyHierarchyTypeaheadV2;
                var iImages = res[i].image.photo;
                var iMarkerImg = iImages.photoSizes[2].url;
                var iCardImg = iImages.photoSizes[5].url;
            
                let card = document.createElement("a");
                card.href = "#";
                card.classList.add("text-decoration-none");
                // gestione click sulle schede
                let cardClickhandler = createCardClickHandler(i, iName, iVenue, iMarkerImg, iLat, iLng, iLatLng);
                card.addEventListener("click", cardClickhandler);
                card.dataset.index = i;
                
                let cardTitle = document.createElement("h1");
                cardTitle.textContent = iName;
                cardTitle.classList.add("tip", "me-4");
                cardTitle.id = "tip" + i;
                cardTitle.style.backgroundImage = `url(${iCardImg})`;

                card.appendChild(cardTitle);
                cardsContainer.appendChild(card);
            }
        }
        let tipsContainer = document.querySelector(".search-location-container");
        tipsContainer.appendChild(title);
        tipsContainer.appendChild(cardsContainer);
    });
}

function showAlert(alertId) {
    if (alertId == "void-search-alert") {
        $("#void-search-alert").fadeIn(300);
        $("#void-search-alert").css("top", "110px");
        $("#map").css("top", "190px");
    } else if (alertId == "username-alert") {
        $("#username-alert").fadeIn();
        $("#username-alert").css("margin-bottom", "20px");
    } else if (alertId == "email-alert") {
        $("#email-alert").fadeIn();
        $("#email-alert").css("margin-bottom", "20px");
    } else if (alertId == "password-alert") {
        $("#password-alert").fadeIn();
        $("#password-alert").css("margin-bottom", "20px");
    } else if (alertId == "existing-favorite-alert") {
        $("#existing-favorite-alert").fadeIn(300);
        $("#existing-favorite-alert").css("top", "110px");
        $("#map").css("top", "190px");
    } else if (alertId == "successed-favorite-alert") {
        $("#successed-favorite-alert").fadeIn(300);
        $("#successed-favorite-alert").css("top", "110px");
        $("#map").css("top", "190px");
    }
}

function animateMarker(marker) {
    marker.setAnimation(google.maps.Animation.DROP);
}

function createCardClickHandler(index, name, venue, markerImg, lat, lng, latLng) {
    return function(event) {
        handleSearchLocation(index, name, venue, markerImg, lat, lng, latLng);
    }
}

// Gestione near me
function requestNearMe(input) {
    //handleEmptySearch(input);

    //...
}

// Gestione suggerimenti
function requestSuggestion(input) {
    //handleEmptySearch(input);

    //...
}

// Gestione schede ricerca luogo
function handleSearchLocation(i, name, venue, markerImg, lat, lng, latLng) {
    const contentString =
        '<div class="marker-content" style="text-align: center;">' +
        '<h5 style="font-weight: 800;">' + name + '</h5>' +
        '<div class="mb-2">' +
        '<img src="' + markerImg + '" class="marker-img">' +
        '</div>' +
        '<h7 style="color: #8b8b8b">' + venue + '</h7>' +
        '<a href="#" id="add-favorite">Aggiungi ai preferiti</a>' +
        '</div>';
    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: name,
    });

    // marker
    const marker = new google.maps.Marker({
        map,
        title: name,
        position: { lat: lat, lng: lng },
        animation: null,
    });
    marker.addListener("click", () => {
        infoWindow.open({
            map,
            anchor: marker, // collega la infoWindow al marker
        });
    });
    animateMarker(marker);
    map.setCenter(latLng);
}

function handleEmptySearch(input) {
    if (input == "") {
        showAlert("void-search-alert");
        setTimeout(function() {
            $("#void-search-alert").fadeOut(250);
            $("#void-search-alert").css("top", "0px");
            $("#map").css("top", "110px");
        }, 3000);
        return true;
    }
    return false;
}

$(document).ready(() => {
    $("#search-button").on("click", () => {
        var searchText = document.getElementById("search-bar").value;
        // ridimensionamento search-bar e map per far apparire il right container
        if (!handleEmptySearch(searchText)) {
            $("#search-bar").css("width", "480px");
            $("#map").css("max-width", "550px").css("height", "550px");
            $(".right-container").css("transform", "scale(1.0)");
            $("#void-search-alert").css("left", "380px");
        }
        
        if ($("#search-pill").hasClass("current")) { // ricerca luogo
            searchLocation(searchText);
        } else if ($("#near-me-pill").hasClass("current")) { // vicino a me
            requestNearMe(searchText);
        } else if ($("#suggestions-pill").hasClass("current")) { // suggerimenti
            requestSuggestion(searchText);
        }        
    });
});



/* -------- Preferiti -------- */
$(document).ready(() => {
    // click su "Preferiti" dal dropdown menu
    $("#favorites-link").on("click", () => {
        $(".left-menu").css("margin-top", "-400px");
        $(".favorites-list").css("top", "20vh");
    });

    // click su "Aggiungi ai preferiti" dalla infoWindow
    $(document).on("click", "#add-favorite", function(event) {
        event.preventDefault();
        // se l'utente non è loggato -> si apre il form di accesso
        if (!loggedIn) {
            toggleLoginFormLM();
        }
        
        // se luogo già presente nei preferiti -> alert rosso
        showAlert("existing-favorite-alert");
        setTimeout(function() {
            $("#existing-favorite-alert").fadeOut(250);
            $("#existing-favorite-alert").css("top", "0px");
            $("#map").css("top", "110px");
        }, 3000);

        // se luogo non presente nei preferiti -> alert verde
        showAlert("successed-favorite-alert");
        setTimeout(function() {
            $("#successed-favorite-alert").fadeOut(250);
            $("#successed-favorite-alert").css("top", "0px");
            $("#map").css("top", "110px");
        }, 3000);
    });

    // click sul bottone per chiudere la lista dei preferiti
    $("#close-favorites-list").on("click", () => {
        $(".left-menu").css("margin-top", "20px");
        $(".favorites-list").css("top", "100vh");
    });
});

function addFavorite(place) {
    
}