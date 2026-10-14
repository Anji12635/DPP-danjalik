
$(document).ready(function () {

    $("#changeColor").on("click", function () {

        // Generate a random color
        const randomColor = "#" + Math.floor(
            Math.random() * 16777215
        ).toString(16).padStart(6, "0");

        // Change the background using jQuery
        $("body").css("background-color", randomColor);

    });

});
