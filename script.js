$(document).ready(function() {
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
        toggleSearchBar();
    });

    /* Gestione search-bar del top-menu */
    $("#search-bar").on("click", function() {
        if (425 < $(window).width() && $(window).width() <= 1024) {
            $("#search-bar").css("top", "110px");
            $("#search-bar").css("max-width", "600px");
            $(".right-container").css("margin-top", "70px");
            $("#signup-button").prop("disabled", true);
            $("#login-button").prop("disabled", true);
        } else if ($(window).width() <= 425) {
            $("#search-bar").css("max-width", "600px");
            $("#signup-button").prop("disabled", true);
            $("#login-button").prop("disabled", true);
        }
    });

    /* Chiusura search-bar del top-menu */
    $("body > *").not("body > #search-bar").on("click", function() {
        if ($("#search-bar").css("top") == "110px") {
            if (425 < $(window).width() && $(window).width() <= 1024) {
                $("#search-bar").css("top", "30px");
                $("#search-bar").css("max-width", "55px");
                $(".right-container").css("margin-top", "0px");
                $("#signup-button").prop("disabled", false);
                $("#login-button").prop("disabled", false);
            } else if ($(window).width() <= 425) {
                $("#search-bar").css("max-width", "55px");
                $("#signup-button").prop("disabled", false);
                $("#login-button").prop("disabled", false);
            }
        }
    });

    /* Reset posizione search-bar in base alla larghezza dello schermo */
    $(window).on("resize", function() {
        $("#search-bar").css("max-width", "55px");
        $(".right-container").css("margin-top", "0px");
        $("#search-bar").css("top", "30px");
        if($(window).width() <= 1024) {
            $("#search-bar").css("display", "inline-block");
        } else {
            $("#search-pill").removeClass("current");
            $("#near-me-pill").addClass("current");
            $("#search-bar").css("display", "none");
        }
    });
});

function toggleSearchBar() {
    if ($("#search-pill").hasClass("current")) {
        $("#search-bar").fadeIn();
        if ($(window).width() > 1024) {
            $("#search-bar").css("max-width", "750px");
            $(".right-container").css("margin-top", "75px");
        }
    } else {
        $("#search-bar").fadeOut();
        if ($(window).width() > 1024) {
            $("#search-bar").css("max-width", "55px");
            $(".right-container").css("margin-top", "0px");
        }
    }
}

/* Apre il form di registrazione e disabilita gli altri pulsanti. */
function toggleSignupForm() {
    if ($("#login-button").is(":enabled")) {
        $("#signup-button").css("padding", "10px 60px");
        $("#login-button").css("padding", "10px 10px");
        $("#login-button").prop("disabled", true);
        $("#search-bar").prop("disabled", true);
        $("#search-bar").css("opacity", "0.5");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        //$(".right-container").css("margin-top", "470px");
    } else {
        $("#signup-button").css("padding", "10px 20px");
        $("#login-button").css("padding", "10px 30px");
        $("#login-button").prop("disabled", false);
        $("#search-bar").prop("disabled", false);
        $("#search-bar").css("opacity", "1");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        //$(".right-container").css("margin-top", "0px");
    }
}

/* Apre il form di registrazione *DA FINIRE* */
/*function toggleSignupForm() {
    if ($("#signup-button").css("padding") == "10px 20px") {
        if ($(".login-form-container").css("display") == "block")
            $(".login-form-container").fadeToggle();    // forse fadeOut()
        if ($("#search-bar").css("max-width") == "800px") {
            toggleSearchBar();
            //$("#search-bar").css("max-width", "50px");
            //$("#search-bar").css("top", "30px")";
            //$(".right-container").css("margin-top", "0px");
        }
        $("#signup-button").css("padding", "10px 60px");
        $("#login-button").css("padding", "10px 10px");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-top", "470px");
    } else {
        $("#signup-button").css("padding", "10px 20px");
        $("#login-button").css("padding", "10px 30px");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".right-container").css("margin-top", "0px");
    }
}*/

/* Apre il form di accesso e disabilita gli altri pulsanti. */
function toggleLoginForm() {
    if ($("#signup-button").is(":enabled")) {
        $("#login-button").css("padding", "10px 60px");
        $("#signup-button").css("padding", "10px 10px");
        $("#signup-button").prop("disabled", true);
        $("#search-bar").prop("disabled", true);
        $("#search-bar").css("opacity", "0.5");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-top", "360px");
    } else {
        $("#login-button").css("padding", "10px 30px");
        $("#signup-button").css("padding", "10px 20px");
        $("#signup-button").prop("disabled", false);
        $("#search-bar").prop("disabled", false);
        $("#search-bar").css("opacity", "1");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
        $(".right-container").css("margin-top", "0px");
    }
}

/* Apre il form di accesso *DA FINIRE* */
/*function toggleLoginForm() {
    if ($("#login-button").css("padding") == "10px 30px") {
        if ($(".signup-form-container").css("display") == "block")
            $(".signup-form-container").fadeToggle();    // forse fadeOut()
        if ($("#search-bar").css("max-width") == "800px") {
            toggleSearchBar();
            //$("#search-bar").css("max-width", "50px");
            //$("#search-bar").css("top", "30px")";
            //$(".right-container").css("margin-top", "0px");
        }
        $("#login-button").css("padding", "10px 60px");
        $("#signup-button").css("padding", "10px 10px");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-top", "360px");
    } else {
        $("#login-button").css("padding", "10px 30px");
        $("#signup-button").css("padding", "10px 20px");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
        $(".right-container").css("margin-top", "0px");
    }
}*/

function openSignupForm() {
    $("#signup-button").css("padding", "10px 60px");
    $("#login-button").css("padding", "10px 10px");
    $("#login-button").prop("disabled", true);
    $("#search-bar").prop("disabled", true);
    $("#search-bar").css("opacity", "0.5");
    $(".signup-form-container").fadeToggle();
    $(".signup-form-container").css("transform", "scale(1.0)");
    $(".right-container").css("margin-top", "470px");
}

function closeSignupForm() {
    $("#signup-button").css("padding", "10px 20px");
    $("#login-button").css("padding", "10px 30px");
    $("#login-button").prop("disabled", false);
    $("#search-bar").prop("disabled", false);
    $("#search-bar").css("opacity", "1");
    $(".signup-form-container").fadeToggle();
    $(".signup-form-container").css("transform", "scale(0.0)");
    $(".right-container").css("margin-top", "0px");
}

function openLoginForm() {
    $("#login-button").css("padding", "10px 60px");
    $("#signup-button").css("padding", "10px 10px");
    $("#signup-button").prop("disabled", true);
    $("#search-bar").prop("disabled", true);
    $("#search-bar").css("opacity", "0.5");
    $(".login-form-container").fadeToggle();
    $(".login-form-container").css("transform", "scale(1.0)");
    $(".right-container").css("margin-top", "360px");
}

function closeLoginForm() {
    $("#login-button").css("padding", "10px 30px");
    $("#signup-button").css("padding", "10px 20px");
    $("#signup-button").prop("disabled", false);
    $("#search-bar").prop("disabled", false);
    $("#search-bar").css("opacity", "1");
    $(".login-form-container").fadeToggle();
    $(".login-form-container").css("transform", "scale(0.0)");
    $(".right-container").css("margin-top", "0px");
}

function setCurrentPill(pillId) {
    $(".nav").removeClass("current");
    $("#" + pillId).addClass("current");
}

function toggleSignupFormLM() {
    if ($("#login-button-lm").is(":enabled")) {
        $("#login-button-lm").prop("disabled", true);
        $("#search-bar").prop("disabled", true);
        $("#search-bar").css("opacity", "0.5");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
    } else {
        $("#login-button-lm").prop("disabled", false);
        $("#search-bar").prop("disabled", false);
        $("#search-bar").css("opacity", "1");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
    }
}

function toggleLoginFormLM() {
    if ($("#signup-button-lm").is(":enabled")) {
        $("#signup-button-lm").prop("disabled", true);
        $("#search-bar").prop("disabled", true);
        $("#search-bar").css("opacity", "0.5");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)");
    } else {
        $("#signup-button-lm").prop("disabled", false);
        $("#search-bar").prop("disabled", false);
        $("#search-bar").css("opacity", "1");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    }
}