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
    $(".right-container").on("click", function() {
        if (425 < $(window).width() && $(window).width() <= 1024 && $("#search-bar").is(":enabled")) {
            $("#search-bar").css("top", "30px");
            $("#search-bar").css("max-width", "55px");
            $(".right-container").css("margin-top", "0px");
            $("#signup-button").prop("disabled", false);
            $("#login-button").prop("disabled", false);
        } else if ($(window).width() <= 425 && $("#search-bar").is(":enabled")) {
            $("#search-bar").css("max-width", "55px");
            $("#signup-button").prop("disabled", false);
            $("#login-button").prop("disabled", false);
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
            $("#search-bar").css("max-width", "800px")
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

function toggleSignupForm() {
    if ($("#login-button").is(":enabled")) {
        $("#signup-button").css("padding", "10px 60px");
        $("#login-button").css("padding", "10px 10px");
        $("#login-button").prop("disabled", true);
        $("#search-bar").prop("disabled", true);
        $("#search-bar").css("opacity", "0.5");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(1.0)");
        $(".right-container").css("margin-top", "470px");
    } else {
        $("#signup-button").css("padding", "10px 20px");
        $("#login-button").css("padding", "10px 30px");
        $("#login-button").prop("disabled", false);
        $("#search-bar").prop("disabled", false);
        $("#search-bar").css("opacity", "1");
        $(".signup-form-container").fadeToggle();
        $(".signup-form-container").css("transform", "scale(0.0)");
        $(".right-container").css("margin-top", "0px");
    }
}

function toggleLoginForm() {
    if ($("#signup-button").is(":enabled")) {
        $("#login-button").css("padding", "10px 60px");
        $("#signup-button").css("padding", "10px 10px");
        $("#signup-button").prop("disabled", true);
        $("#search-bar").prop("disabled", true);
        $("#search-bar").css("opacity", "0.5");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(1.0)"); 
    } else {
        $("#login-button").css("padding", "10px 30px");
        $("#signup-button").css("padding", "10px 20px");
        $("#signup-button").prop("disabled", false);
        $("#search-bar").prop("disabled", false);
        $("#search-bar").css("opacity", "1");
        $(".login-form-container").fadeToggle();
        $(".login-form-container").css("transform", "scale(0.0)");
    }
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