
$(document).ready(function () {
    const $taskList = $("#ft_list");

    // Save all tasks in a browser cookie.
    function saveTasks() {
        const tasks = [];

        $taskList.find(".task").each(function () {
            tasks.push($(this).text());
        });

        document.cookie =
            "todoTasks=" + encodeURIComponent(JSON.stringify(tasks)) +
            "; max-age=31536000; path=/; SameSite=Lax";
    }

    // Add a task to the top of the list.
    function addTask(text, shouldSave = true) {
        const $task = $("<div>")
            .addClass("task")
            .text(text);

        $taskList.prepend($task);

        if (shouldSave) {
            saveTasks();
        }
    }

    // Handle clicks on tasks using jQuery event delegation.
    $taskList.on("click", ".task", function () {
        const $task = $(this);

        // Prevent multiple confirmation dialogs.
        if ($(".confirmation-overlay").length > 0) {
            return;
        }

        const $overlay = $("<div>")
            .addClass("confirmation-overlay");

        const $dialog = $("<div>")
            .addClass("confirmation-dialog");

        const $message = $("<p>")
            .text("Do you want to remove this TO DO?");

        const $yes = $("<button>")
            .text("Yes")
            .on("click", function () {
                $task.remove();
                saveTasks();
                $overlay.remove();
            });

        const $no = $("<button>")
            .addClass("noButton")
            .text("No")
            .on("click", function () {
                $overlay.remove();
            });

        $dialog.append($message, $yes, $no);
        $overlay.append($dialog);
        $("body").append($overlay);
    });

    // Ask the user for a new task.
    $("#newTask").on("click", function () {
        const text = prompt("Enter a new TO DO:");

        if (text !== null && text.trim() !== "") {
            addTask(text.trim());
        }
    });

    // Load previously saved tasks from the cookie.
    function loadTasks() {
        const cookie = document.cookie
            .split("; ")
            .find(function (item) {
                return item.startsWith("todoTasks=");
            });

        if (!cookie) {
            return;
        }

        try {
            const tasks = JSON.parse(
                decodeURIComponent(
                    cookie.substring("todoTasks=".length)
                )
            );

            if (Array.isArray(tasks)) {
                // Reverse because addTask inserts each task at the top.
                tasks.reverse().forEach(function (text) {
                    if (
                        typeof text === "string" &&
                        text.trim() !== ""
                    ) {
                        addTask(text, false);
                    }
                });
            }
        } catch (error) {
            console.error("Could not load saved tasks:", error);
        }
    }

    // Restore saved tasks when the page opens.
    loadTasks();
});
