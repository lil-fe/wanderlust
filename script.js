const MAX_NAME_LENGTH = 11;

$(document).ready(function() {
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "NOTE", v: "weekly"});

    // controlla se l'utente è loggato
    checkLoginStatus();

    if ($(window).width() <= 550) {
        $(".navbar-brand").css("display", "none");
        $("#mobile-title").css("display", "inline-block");
    }

    // fa in modo che cliccando su "cambia immagine" si clicchi in realtà sull'input per inserire un file
    $("#change-pic-link").on("click", function(e) {
        e.preventDefault();
        $("#user-pic-input").click();
    });

    // gestione caricamento user pic lm
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
                $(".user-pic").attr("src", response);
                localStorage.setItem("user-pic_" + profileUsername, response);
            },
            error: function() {
                alert("Errore");
            }
        });
    });

    // quanto sopra ma per top menu
    $("#change-pic-link-top").on("click", function(e) {
        e.preventDefault();
        $("#user-pic-input-top").click();
    });

    $("#user-pic-input-top").on("change", function() {
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
                $(".user-pic").attr("src", response);
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

    // Gestione search-bar
    $(".nav").on("click", function() {
        setCurrentPill($(this).attr("id"));

        if ($(".left-menu").css("display") != "none") { // desktop
            toggleSearchBarLM();
        } else {    // mobile
            toggleSearchBar();
        }
    });

    $("#search-button").on("click", () => {
        var searchInput = document.getElementById("search-bar");
        var searchText = searchInput.value;
        if (handleEmptySearch(searchText)) {
            showAlert("void-search-alert");
            return;
        }

        // ridimensionamento search-bar e map per far apparire il right container (desktop)
        if ($(".left-menu").css("display") != "none") {
            $("#search-bar").css("width", "480px");
            $("#map").css("max-width", "550px").css("height", "550px");
            //$(".right-container").css("transform", "scale(1.0)");
            $("#void-search-alert").css("left", "380px");
        }
        $(".right-container").css("transform", "scale(1.0)");
        $(".right-container").css("display", "flex");
        
        if ($("#search-pill").hasClass("current") || $("#search-pill-top").hasClass("current")) { // "Ricerca luogo"
            searchLocation(searchText);
        } else if ($("#suggestions-pill").hasClass("current") || $("#suggestions-pill-top").hasClass("current")) { // "Suggerimenti"
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        map.setCenter(pos);

                        const placesService = new google.maps.places.PlacesService(map);
                        const request = {
                            location: pos,
                            radius: 1500,
                            keyword: searchText,
                        };

                        placesService.nearbySearch(request, (results, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                for (let i=0; i < results.length; i++)
                                    createMarker(results[i]);
                            }
                        });
                    },
                    () => {
                        handleLocationError(true, infoWindow, map.getCenter());
                    }
                )
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }     
    });
});

// top search bar
function toggleSearchBar() {
    // se si clicca su un oggetto .nav si apre la barra
    if ($(".nav").hasClass("current")) {
        $(".search-bar-container").fadeIn();
        $(".search-bar-container").css("transform", "scale(1.0)");
        document.getElementById("search-bar").focus();
    }

    $("#search-bar").val("");
    // gestione placeholder
    if ($("#search-pill-top").hasClass("current")) {
        $("#search-bar").attr("placeholder", "Dove vuoi andare?");
    } else if ($("#suggestions-pill-top").hasClass("current")) {
        $("#search-bar").attr("placeholder", "Cerca luoghi vicino a te basati su una stringa (es: pizza)");
    }
}

// lm search bar
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
    } else if ($("#suggestions-pill").hasClass("current")) {
        $("#search-bar").attr("placeholder", "Cerca luoghi vicino a te basati su una stringa (es: pizza)");
    }
}

/* Apre il form di registrazione */
function toggleSignupForm() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return false;

    if ($(window).width() > 700) {
        // form chiusi
        if ($("#signup-button").css("padding") == "10px 20px") {
            $("#signup-button").css("padding", "10px 60px");
            $("#login-button").css("padding", "10px 10px");
            $(".signup-form-container").fadeIn();
            $(".signup-form-container").css("transform", "scale(1.0)");
        // form aperto
        } else if ($("#signup-button").css("padding") == "10px 60px") {
            $("#signup-button").css("padding", "10px 20px");
            $("#login-button").css("padding", "10px 30px");
            $(".signup-form-container").fadeOut();
            $(".signup-form-container").css("transform", "scale(0.0)");
        } else {    // login form aperto
            $("#signup-button").css("padding", "10px 60px");
            $("#login-button").css("padding", "10px 10px");
            $(".login-form-container").fadeOut(1);
            $(".login-form-container").css("transform", "scale(0.0)");
            $(".signup-form-container").fadeIn();
            $(".signup-form-container").css("transform", "scale(1.0)");
        }
    } else {
        // form chiusi
        if ($(".signup-form-container").css("display") == "none" && $(".login-form-container").css("display") == "none") {
            $(".signup-form-container").fadeIn();
            $(".signup-form-container").css("transform", "scale(1.0)");
        // signup form aperto
        } else if ($(".signup-form-container").css("display") != "none") {
            $(".signup-form-container").fadeOut();
            $(".signup-form-container").css("transform", "scale(0.0)");
        } else {    // login form aperto
            $(".login-form-container").fadeOut(1);
            $(".login-form-container").css("transform", "scale(0.0)");
            $(".signup-form-container").fadeIn();
            $(".signup-form-container").css("transform", "scale(1.0)");
        }
    }
    
}

/* Apre il form di accesso */
function toggleLoginForm() {
    // controlla che i form non si stiano aprendo/chiudendo
    if ($(".signup-form-container, .login-form-container").is(":animated"))
        return false;

    if ($(window).width() > 700) {
        // form chiusi
        if ($("#login-button").css("padding") == "10px 30px") {
            $("#login-button").css("padding", "10px 60px");
            $("#signup-button").css("padding", "10px 10px");
            $(".login-form-container").fadeIn();
            $(".login-form-container").css("transform", "scale(1.0)");
        // login form aperto
        } else if ($("#login-button").css("padding") == "10px 60px") {
            $("#login-button").css("padding", "10px 30px");
            $("#signup-button").css("padding", "10px 20px");
            $(".login-form-container").fadeOut();
            $(".login-form-container").css("transform", "scale(0.0)");
        } else {    // signup form aperto
            $("#login-button").css("padding", "10px 60px");
            $("#signup-button").css("padding", "10px 10px");
            $(".signup-form-container").fadeOut(1);
            $(".signup-form-container").css("transform", "scale(0.0)");
            $(".login-form-container").fadeIn();
            $(".login-form-container").css("transform", "scale(1.0)");
        }
    } else {
        // form chiusi
        if ($(".login-form-container").css("display") == "none" && $(".signup-form-container").css("display") == "none") {
            $(".login-form-container").fadeIn();
            $(".login-form-container").css("transform", "scale(1.0)");
        // login form aperto
        } else if ($(".login-form-container").css("display") != "none") {
            $(".login-form-container").fadeOut();
            $(".login-form-container").css("transform", "scale(0.0)");
        } else {    // signup form aperto
            $(".signup-form-container").fadeOut(1);
            $(".signup-form-container").css("transform", "scale(0.0)");
            $(".login-form-container").fadeIn();
            $(".login-form-container").css("transform", "scale(1.0)");
        }
    }
}

function closeSignupForm() {
    if ($(".left-menu").css("display") == "flex") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".subtitle").css("margin-top", "50px");
        $(".left-menu").css("height", "500px");
    } else {
        if ($(window).width() > 700) {
            $("#signup-button").css("padding", "10px 20px");
            $("#login-button").css("padding", "10px 30px");
        }
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
    }
}

function closeLoginForm() {
    if ($(".left-menu").css("display") != "none") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    } else {
        if ($(window).width() > 700) {
            $("#login-button").css("padding", "10px 30px");
            $("#signup-button").css("padding", "10px 20px");
        }
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
        $(".subtitle").css("margin-top", "40px");
        $(".left-menu").css("height", "470px");
        document.signupForm.username.focus();
    // signup form aperto -> va chiuso
    } else if ($(".signup-form-container").css("display") == "block") {
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".subtitle").css("margin-top", "50px");
        $(".left-menu").css("height", "500px");
    // login form aperto
    } else if ($(".login-form-container").css("display") == "block") {
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        $(".subtitle").css("margin-top", "40px");
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
        $(".left-menu").css("height", "500px");
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
        if ($(".left-menu").css("display") != "none") { // Desktop
            setTimeout(function() {
                $("#username-alert").fadeOut(150);
                $("#username-alert").css("margin-bottom", "0px");
                $(".signup-form-container").css("bottom", "20px");
            }, 3000);
        } else {    // Mobile
            setTimeout(function() {
                $("#username-alert").fadeOut();
                $("#username-alert").css("transform", "scale(0.0)");
            }, 3000);
        }
        
        return false;
    }

    if (emailInput.value == "" || !emailInput.value.match(emailRegex)) {
        showAlert("email-alert");
        emailInput.focus();
        if ($(".left-menu").css("display") != "none") { // Desktop
            setTimeout(function() {
                $("#email-alert").fadeOut(150);
                $("#email-alert").css("margin-bottom", "0px");
                $(".signup-form-container").css("bottom", "20px");
            }, 3000);
        } else {    // Mobile
            setTimeout(function() {
                $("#email-alert").fadeOut();
                $("#email-alert").css("transform", "scale(0.0)");
            }, 3000);
        }
        return false;
    }

    if (passwordInput.value == "" || !passwordInput.value.match(passwordRegex)) {
        showAlert("password-alert");
        passwordInput.focus();
        if ($(".left-menu").css("display") != "none") { // Desktop
            setTimeout(function() {
                $("#password-alert").fadeOut(150);
                $("#password-alert").css("margin-bottom", "0px");
                $(".signup-form-container").css("bottom", "20px");
            }, 3000);
        } else {    // Mobile
            setTimeout(function() {
                $("#password-alert").fadeOut();
                $("#password-alert").css("transform", "scale(0.0)");
            }, 3000);
        }
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
                    $(".user-pic").attr("src", savedImageUrl);

                // Controlla se esiste una lista dei preferiti associata all'username loggato
                if (!isFavoritesListEmpty()) {
                    $("#favorites-placeholder").css("display", "none");
                    const favoritesKey = "favorites_" + profileUsername;
                    let favorites = JSON.parse(localStorage.getItem(favoritesKey));
                    let favoritesContainer = document.querySelector(".favorites-cards");
                    for (let i=0; i < favorites.length; i++) {
                        let favorite = favorites[i];
                        favorite.index = i;

                        // Tronca il nome se necessario
                        if (favorite.name.length > MAX_NAME_LENGTH) {
                            favorite.name = favorite.name.substring(0, MAX_NAME_LENGTH) + "...";
                        }

                        let favoriteCard = document.createElement("div");
                        favoriteCard.classList.add("favorite", "mb-3");
                        favoriteCard.style.backgroundImage = `url(${favorite.imgUrl})`;
                        favoriteCard.textContent = favorite.name;
                        // per getFavoriteData()
                        favoriteCard.dataset.img = favorite.imgUrl;
                        favoriteCard.dataset.venue = favorite.venue;
                        favoriteCard.dataset.latitude = favorite.latitude;
                        favoriteCard.dataset.longitude = favorite.longitude;

                        let deleteButton = document.createElement("button");
                        deleteButton.setAttribute("type", "button");
                        deleteButton.setAttribute("class", "btn-close");
                        deleteButton.setAttribute("id", "delete-favorite-button");
                        deleteButton.setAttribute("aria-label", "Elimina preferito");
                        deleteButton.addEventListener("click", () => deleteFavorite(i));

                        favoriteCard.appendChild(deleteButton);
                        favoritesContainer.appendChild(favoriteCard);
                    }
                }
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
    $(".username-placeholder").text(profileUsername);
    $(".user-buttons").hide();
    $(".user-profile").show();
}

function showFormButtons() {
    $(".user-profile").hide();
    $(".user-buttons").show();
}



/* -------- Maps -------- */
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
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(locationButton);
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
            'X-RapidAPI-Key': 'NOTE',
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
                '<p style="display: none"; id="lat">' + firstResLat + '</p>' +
                '<p style="display: none"; id="lng">' + firstResLng + '</p>' +
                '<p style="display: none"; id="latLng">' + firstResLatLng + '</p>' +
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
        title.id = "search-location-title";
        title.textContent = input;
        let cardsContainer = document.createElement("div");
        cardsContainer.classList.add("search-location-cards");
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
                let cardClickHandler = createCardClickHandler(i, iName, iVenue, iMarkerImg, iLat, iLng, iLatLng);
                card.addEventListener("click", cardClickHandler);
                card.dataset.index = i; // l'attributo dataset consente di accedere ad attributi aggiuntivi data-attributo_aggiuntivo (in questo caso data-index)
                
                let cardTitle = document.createElement("h1");
                cardTitle.textContent = iName;
                cardTitle.classList.add("location", "me-4");
                cardTitle.id = "location" + i;
                cardTitle.style.backgroundImage = `url(${iCardImg})`;

                card.appendChild(cardTitle);
                cardsContainer.appendChild(card);
            }
        }
        let locationsContainer = document.querySelector(".search-location-container");
        locationsContainer.appendChild(title);
        locationsContainer.appendChild(cardsContainer);
    });
}

function animateMarker(marker) {
    marker.setAnimation(google.maps.Animation.DROP);
}

function createCardClickHandler(index, name, venue, markerImg, lat, lng, latLng) {
    return function(event) {
        handleSearchLocation(index, name, venue, markerImg, lat, lng, latLng);
    }
}

// Gestione schede ricerca luogo
function handleSearchLocation(i, name, venue, markerImg, lat, lng, latLng) {
    const contentString =
        '<div class="marker-content" style="text-align: center;">' +
        '<h5 style="font-weight: 800;">' + name + '</h5>' +
        '<div class="mb-2">' +
        '<img src="' + markerImg + '" class="marker-img">' +
        '</div>' +
        '<h7 style="color: #8b8b8b">' + venue + '</h7><br/>' +
        '<a href="#" id="add-favorite">Aggiungi ai preferiti</a>' +
        '<p style="display: none"; id="lat">'+ lat + '</p>' +
        '<p style="display: none"; id="lng">' + lng + '</p>' +
        '<p style="display: none"; id="latLng">' + latLng + '</p>' +
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

// Gestione della creazione dei marker per "Vicino a me"
function createMarker(place) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
    });

    // controlla se il posto ha almeno un'immagine da mostrare nella infoWindow
    let infoWindow;
    if (place.photos && place.photos.length > 0) {
        infoWindow = new google.maps.InfoWindow({
            content: `<div style="text-align: center;">
                        <h5 style="font-weight: 800;">${place.name}</h3>
                        <img src="${place.photos[0].getUrl()}" width="150">
                    </div>`,
        });
    } else {
        infoWindow = new google.maps.InfoWindow({
            content: `<div style="text-align: center;">
                        <h5 style="font-weight: 800;">${place.name}</h3>
                    </div>`,
        });
    }

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

function handleEmptySearch(input) {
    if (input == "") {
        showAlert("void-search-alert");
        if ($(".left-menu").css("display") != "none") { // Desktop
            setTimeout(function() {
                $("#void-search-alert").fadeOut(250);
                $("#void-search-alert").css("top", "0px");
                $("#map").css("top", "110px");
            }, 3000);
        } else {    // Mobile
            setTimeout(function() {
                $("#void-search-alert").fadeOut();
                $("#void-search-alert").css("transform", "scale(0.0)");
            }, 3000);
        }
        return true;
    }
    return false;
}

function showAlert(alertId) {
    if ($(".left-menu").css("display") != "none") { // Desktop
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
    } else {    // Mobile
        if (alertId == "void-search-alert") {
            $("#void-search-alert").fadeIn(1);
            $("#void-search-alert").css("transform", "scale(1.0)");
        } else if (alertId == "username-alert") {
            $("#username-alert").fadeIn(1);
            $("#username-alert").css("transform", "scale(1.0)");
        } else if (alertId == "email-alert") {
            $("#email-alert").fadeIn(1);
            $("#email-alert").css("transform", "scale(1.0)");
        } else if (alertId == "password-alert") {
            $("#password-alert").fadeIn(1);
            $("#password-alert").css("transform", "scale(1.0)");
        } else if (alertId == "existing-favorite-alert") {
            $("#existing-favorite-alert").fadeIn(1);
            $("#existing-favorite-alert").css("transform", "scale(1.0)");
        } else if (alertId == "successed-favorite-alert") {
            $("#successed-favorite-alert").fadeIn(1);
            $("#successed-favorite-alert").css("transform", "scale(1.0)");
        }
    }
    
}



/* -------- Preferiti -------- */
$(document).ready(() => {
    // Controlla che la lista dei preferiti non sia vuota per eliminare il placeholder
    if (!isFavoritesListEmpty())
        $("#favorites-placeholder").css("display", "none");

    // Click su "Preferiti" dal dropdown menu
    $("#favorites-link").on("click", () => {    // Desktop
        $(".left-menu").css("margin-top", "-350px");
        $(".favorites-list").fadeIn(1);
        $(".favorites-list").css("top", "20vh");
    });
    $("#favorites-link-top").on("click", () => {    // Mobile
        $(".top-menu").css("margin-left", "-550px");
        $(".search-bar-container").css("margin-left", "-550px");
        $("#map").css("margin-left", "-260px");
        $(".right-container").css("margin-left", "-260px");
        $(".favorites-list").fadeIn(1);
        $(".favorites-list").css("right", "20px");
        if ($(window).width() <= 550) {
            $(".favorites-list").css("top", "70px");
        }
    });

    // click su "Aggiungi ai preferiti" dalla infoWindow
    $(document).on("click", "#add-favorite", function(event) {
        // Recupera nome e url dell'imagine del luogo sul quale si clicca "Aggiungi ai preferiti"
        let name = $(this).closest(".marker-content").find("h5").text();
        let imgUrl = $(this).closest(".marker-content").find(".marker-img").attr("src");
        console.log(imgUrl);
        let venue = $(this).closest(".marker-content").find("h7").text();
        let latitude = $(this).closest(".marker-content").find("p#lat").text();
        let longitude = $(this).closest(".marker-content").find("p#lng").text();
        //let latLng = $(this).closest(".marker-content").find("p#latLng").text();
        addFavorite(name, imgUrl, venue, latitude, longitude);
    });

    // Click sul bottone per chiudere la lista dei preferiti
    $("#close-favorites-list").on("click", () => {
        if ($(".left-menu").css("display") != "none") { // Desktop
            $(".left-menu").css("margin-top", "20px");
            $(".favorites-list").css("top", "100vh");
        } else {    // Mobile
            $(".top-menu").css("margin-left", "20px");
            $(".favorites-list").css("right", "-30vh");
            $(".search-bar-container").css("margin-left", "auto");
            $("#map").css("margin-left", "auto");
            $(".right-container").css("margin-left", "auto");
        }
        $(".favorites-list").fadeOut();
    });

    // Click sui preferiti
    $(".favorites-cards").on("click", ".favorite", function(event) {
        let favoriteData = getFavoriteData(event.target);
        showFavoriteOnMap(favoriteData);
    });
});

function addFavorite(name, imgUrl, venue, latitude, longitude) {
    /*console.log(venue);
    console.log(latitude);
    console.log(longitude);*/
    // Se l'utente non è loggato -> si apre il form di accesso
    if (!loggedIn) {
        toggleLoginFormLM();
        return;
    }

    // Se luogo già presente nei preferiti -> alert rosso e uscita dalla funzione
    if (isPlaceInFavorites(name, imgUrl, venue, latitude, longitude)) {
        showAlert("existing-favorite-alert");
        if ($(".left-menu").css("display") != "none") { // Desktop
            setTimeout(function() {
                $("#existing-favorite-alert").fadeOut(250);
                $("#existing-favorite-alert").css("top", "0px");
                $("#map").css("top", "110px");
            }, 3000);
        } else {    // Mobile
            setTimeout(function() {
                $("#existing-favorite-alert").fadeOut();
                $("#existing-favorite-alert").css("transform", "scale(0.0)");
            }, 3000);
            if ($(".favorites-list").css("display") != "none") {
                $("#existing-favorite-alert").css("margin-left", "20px");
            } else {
                $("#existing-favorite-alert").css("margin-left", "auto");
            }
        }
        return;
    } else {
        showAlert("successed-favorite-alert");
        if ($(".left-menu").css("display") != "none") { // Desktop
            setTimeout(function() {
                $("#successed-favorite-alert").fadeOut(250);
                $("#successed-favorite-alert").css("top", "0px");
                $("#map").css("top", "110px");
            }, 3000);
        } else {    // Mobile
            setTimeout(function() {
                $("#successed-favorite-alert").fadeOut();
                $("#successed-favorite-alert").css("transform", "scale(0.0)");
            }, 3000);
            if ($(".favorites-list").css("display") != "none") {
                $("#existing-favorite-alert").css("margin-left", "20px");
            } else {
                $("#existing-favorite-alert").css("margin-left", "auto");
            }
        }
    }

    // Creazione preferito e aggiunta alla lista
    $("#favorites-placeholder").css("display", "none");
    let favoritesContainer = document.querySelector(".favorites-cards");
    let favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favorite", "mb-3");
    favoriteCard.style.backgroundImage = `url(${imgUrl})`;
    // per getFavoriteData()
    favoriteCard.setAttribute("data-img", imgUrl);
    favoriteCard.setAttribute("data-venue", venue);
    favoriteCard.setAttribute("data-latitude", latitude);
    favoriteCard.setAttribute("data-longitude", longitude);
    if (name.length > MAX_NAME_LENGTH)
        name = name.substring(0, MAX_NAME_LENGTH) + '...';
    favoriteCard.textContent = name;

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "btn-close");
    deleteButton.setAttribute("id", "delete-favorite-button");
    deleteButton.setAttribute("aria-label", "Elimina preferito");

    favoriteCard.appendChild(deleteButton);
    favoritesContainer.appendChild(favoriteCard);

    // Salvataggio nel localStorage
    const favoritesKey = "favorites_" + profileUsername;    // chiave univoca per ogni utente corrispondente all'array dei preferiti
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    const favorite = { name, imgUrl, venue, latitude, longitude };
    favorites.push(favorite);   // aggiunge l'oggetto favorite all'array favorites
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));  // sovrascrive l'array favorites corrispondente alla chiave favoritesKey

    deleteButton.setAttribute("data-index", favorites-length);
    deleteButton.addEventListener("click", () => deleteFavorite(favorites.length-1));
}

function deleteFavorite(favoriteIndex) {
    const favoritesKey = "favorites_" + profileUsername;
    let favorites = JSON.parse(localStorage.getItem(favoritesKey));

    // Rimozione preferito dal localStorage
    favorites.splice(favoriteIndex, 1);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));

    // Rimozione preferito dalla lista
    let favoriteCards = document.querySelectorAll(".favorite");
    favoriteCards[favoriteIndex].remove();
}

function isFavoritesListEmpty() {
    const favoritesKey = "favorites_" + profileUsername;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey));
    return !favorites || favorites.length === 0;
}

function isPlaceInFavorites(name, imgUrl, venue, latitude, longitude) {
    const favoritesKey = "favorites_" + profileUsername;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    return favorites.some(favorite => favorite.name === name && favorite.imgUrl === imgUrl && favorite.latitude === latitude && favorite.longitude === longitude && favorite.venue === venue);
    // some verifica se almeno un elemento dell'array soddisfa una condizione. Si ferma al primo.
}

function getFavoriteData(favorite) {
    return {
        name: $(favorite).text(),
        imgUrl: $(favorite).data("img"),
        venue: $(favorite).data("venue"),
        latitude: $(favorite).data("latitude"),
        longitude: $(favorite).data("longitude")
    };
}

function showFavoriteOnMap(favoriteData) {
    // Creazione del marker 
    console.log({
        favoriteData,
    });
    const latLng = new google.maps.LatLng(favoriteData.latitude, favoriteData.longitude);
    const marker = new google.maps.Marker({
        map,
        title: favoriteData.name,
        position: latLng,
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

    // Creazione infoWindow
    const contentString = `
        <div class="marker-content" style="text-align: center;">
            <h5 style="font-weight: 800;">${favoriteData.name}</h5>
            <div class="mb-2">
                <img src="${favoriteData.imgUrl}" class="marker-img">
            </div>
            <h7 style="color: #8b8b8b;">${favoriteData.venue}</h7><br/>
        </div>
    `;
    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
    });

    // Mostra l'infoWindow quando si clicca sul marker
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    // Mostra l'infoWindow immediatamente dopo aver creato il marker
    infoWindow.open(map, marker);
}
