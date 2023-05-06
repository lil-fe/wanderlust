$(document).ready(function() {
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "weekly"});

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

    /*$(".tips-container").on('mousewheel', function(event) {     // non funziona
        event.preventDefault();
        var wheelDelta = event.originalEvent.wheelDelta;
        this.scrollLeft += (wheelDelta < 0 ? 1 : -1) * 500;
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

    // Gestione ridimensionamento finestra
    $(window).on("resize", function() {
        if($(".left-menu").css("display") != "none") {  // Desktop
            $("#search-pill").removeClass("current");
            $("#near-me-pill").addClass("current");
            $(".search-bar-container").css("display", "none");
            $(".right-container").css("margin", "20px 35px 0px 325px");
            if ($(".signup-form-container").css("display") != "none" || $(".login-form-container").css("display") != "none" || $(".search-bar-container").css("display") != "none" || $(".map-container").css("display") != "none") {
                $(".right-container").css("margin-left", "325px");
            }
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
        }
    });
});

function toggleSearchBarLM() {
    // se si clicca su "suggerimenti"
    if ($("#search-pill").hasClass("current") && $(".left-menu").css("display") != "none") {
        // controlla se il signup form è aperto
        if ($(".signup-form-container").css("display") != "none") {
            $(".signup-form-container").fadeToggle();
            $(".signup-form-container").css("transform", "scale(0.0)");
        }

        $(".search-bar-container").fadeIn();
        $(".search-bar-container").css("display", "flex");
        $(".search-bar-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-left", "760px");
        $("#map").css("transform", "scale(1.0)");
        $("#map").css("display", "block");
        document.getElementById("search-bar").focus();
    } else {
        $(".search-bar-container").fadeOut();
        $(".search-bar-container").css("transform", "scale(0.0)");
        $("#map").css("transform", "scale(0.0)");

        // evita che il right-container si riespanda se è aperto uno dei due form
        if ($(".signup-form-container").css("display") == "none" && $(".login-form-container").css("display") == "none") {
            $(".right-container").css("margin-left", "325px");
        }
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

        // controlla che nessun altro elemento sia presente nel menu centrale (per ora solo search bar)
        /*if ($(".search-bar-container").css("display") == "none") {
            $(".right-container").css("transform", "translateX(0%)");
            $(".right-container").css("max-width", "1500px");
        }*/
        $("#map").css("top", "110px");
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

        // controlla che nessun altro elemento sia presente nel menu centrale (per ora solo search bar)
        if ($(".search-bar-container").css("display") == "none") {
            $(".right-container").css("transform", "translateX(0%)");
            $(".right-container").css("max-width", "1500px");
        }
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
        return false;

    // form chiusi
    if ($(".signup-form-container").css("display") == "none" && $(".login-form-container").css("display") == "none") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-left", "760px");
        document.signupForm.username.focus();

        // controlla se la mappa è aperta
        if ($(".search-bar-container").css("display") != "none") {
            $("#map").css("top", "20px");
        }
    // signup form aperto -> va chiuso
    } else if ($(".signup-form-container").css("display") == "block") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        
        // evita che il right-container si espanda se si è in ricerca
        if ($(".search-bar-container").css("display") == "none") {
            $(".right-container").css("margin-left", "325px");
        } else {    // mappa aperta
            $("#map").css("top","110px");
        }
    // login form aperto
    } else if ($(".login-form-container").css("display") == "block") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        document.signupForm.username.focus();

        // controlla se la mappa è aperta
        if ($(".search-bar-container").css("display") != "none") {
            $("#map").css("top", "20px");
        }
    }
}

function toggleLoginFormLM() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return false;

    // form chiusi
    if ($(".signup-form-container").css("display") == "none" && $(".login-form-container").css("display") == "none") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-left", "760px");
        document.loginForm.email.focus();
    // login form aperto -> va chiuso
    } else if ($(".login-form-container").css("display") == "block") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
        
        // controlla che nessun'altro elemento sia presente nel menu centrale (per ora solo search bar)
        if ($(".search-bar-container").css("display") == "none") {
            $(".right-container").css("margin-left", "325px");
        }
    // signup form aperto
    } else if ($(".signup-form-container").css("display") == "block") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
        $("#map").css("top", "110px");
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
    
    if (!usernameInput.value.match(usernameRegex)) {
        alert("L'username deve contenere da 3 a 20 caratteri alfanumerici.");
        usernameInput.focus();
        return false;
    }

    if (!emailInput.value.match(emailRegex)) {
        alert("Email non valida.")
        emailInput.focus();
        return false;
    }

    if (!passwordInput.value.match(passwordRegex)) {
        alert("La password deve contenere da 6 a 20 caratteri alfanumerici.");
        passwordInput.focus();
        return false;
    }

    return true;
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

/* -------- Richieste -------- */
let settings;

function requestTip(input) {
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

        // gestione primo suggerimento
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
            '<div class="marker-img mb-2">' +
            '<img src="' + firstResMarkerImg + '" style="border-radius: 10px; border: 1px solid grey;">' +
            '</div>' +
            '<h7 style="color: #8b8b8b">' + firstResVenue + '</h7>' +
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

        // creazione schede di tutti i suggerimenti
        let title = document.createElement("h1");
        title.id = "tips-title";
        title.textContent = input;
        let cardsContainer = document.createElement("div");
        cardsContainer.classList.add("tips-cards");
        for (var i=0; i < res.length; i++) {
            if (res[i].__typename === "Typeahead_LocationItem" && res[i].detailsV2.geocode !== null) {
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
        let tipsContainer = document.querySelector(".tips-container");
        tipsContainer.appendChild(title);
        tipsContainer.appendChild(cardsContainer);
    });
}

function animateMarker(marker) {
    marker.setAnimation(google.maps.Animation.DROP);
}

function createCardClickHandler(index, name, venue, markerImg, lat, lng, latLng) {
    return function(event) {
        handleTip(index, name, venue, markerImg, lat, lng, latLng);
    }
}

// Gestione dei near me
function requestNearMe(category) {
    
}

// Gestione delle schede dei suggerimenti
function handleTip(i, name, venue, markerImg, lat, lng, latLng) {
    const contentString =
        '<div class="marker-content" style="text-align: center;">' +
        '<h5 style="font-weight: 800;">' + name + '</h5>' +
        '<div class="marker-img mb-2">' +
        '<img src="' + markerImg + '" style="border-radius: 10px; border: 1px solid grey;">' +
        '</div>' +
        '<h7 style="color: #8b8b8b">' + venue + '</h7>' +
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

$(document).ready(() => {
    $("#search-button").on("click", () => {
        // richiesta suggerimento
        let searchText = document.getElementById("search-bar").value;
        requestTip(searchText);
    });
});