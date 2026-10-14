
$(document).ready(function () {
    let size = 200;

    const colors = ["red", "green", "blue"];
    let colorIndex = 0;

    // Update the balloon size and color using jQuery
    function updateBalloon() {
        $("#balloon").css({
            width: size + "px",
            height: size + "px",
            backgroundColor: colors[colorIndex]
        });
    }

    // Grow the balloon when clicked
    $("#balloon").on("click", function () {
        size += 10;
        colorIndex = (colorIndex + 1) % colors.length;

        // Reset when the balloon exceeds 420 pixels
        if (size > 420) {
            size = 200;
        }

        updateBalloon();
    });

    // Shrink the balloon when the pointer leaves
    $("#balloon").on("mouseleave", function () {
        size = Math.max(200, size - 5);

        // Cycle colors in reverse
        colorIndex =
            (colorIndex - 1 + colors.length) % colors.length;

        updateBalloon();
    });
});
