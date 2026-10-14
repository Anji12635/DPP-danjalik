
const newButton = document.getElementById("newTask");
const taskList = document.getElementById("ft_list");

// Save tasks in a cookie.
function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll(".task").forEach(function (task) {
        tasks.push(task.textContent);
    });

    document.cookie = "todoTasks=" + encodeURIComponent(JSON.stringify(tasks))
        + "; max-age=31536000; path=/; SameSite=Lax";
}

// Create a task and put it at the top.
function addTask(text) {
    const task = document.createElement("div");

    task.className = "task";
    task.textContent = text;

    task.addEventListener("click", function () {
        // Create a Yes/No confirmation dialog.
        const overlay = document.createElement("div");
        overlay.className = "confirmation-overlay";

        const dialog = document.createElement("div");
        dialog.className = "confirmation-dialog";

        const message = document.createElement("p");
        message.textContent = "Do you want to remove this TO DO?";

        const yesButton = document.createElement("button");
        yesButton.textContent = "Yes";

        const noButton = document.createElement("button");
        noButton.textContent = "No";

        dialog.appendChild(message);
        dialog.appendChild(yesButton);
        dialog.appendChild(noButton);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        yesButton.addEventListener("click", function () {
            task.remove();
            saveTasks();
            overlay.remove();
        });

        noButton.addEventListener("click", function () {
            overlay.remove();
        });
    });

    taskList.prepend(task);
    saveTasks();
}

// Load tasks saved in the cookie.
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
            decodeURIComponent(cookie.substring("todoTasks=".length))
        );

        if (Array.isArray(tasks)) {
            tasks.reverse().forEach(function (text) {
                if (typeof text === "string" && text.trim() !== "") {
                    addTask(text);
                }
            });
        }
    } catch (error) {
        console.error("Could not load saved tasks:", error);
    }
}

// Add a new task using the prompt function.
newButton.addEventListener("click", function () {
    const text = prompt("Enter a new TO DO:");

    if (text !== null && text.trim() !== "") {
        addTask(text.trim());
    }
});

// Load saved tasks when the page opens.
loadTasks();


