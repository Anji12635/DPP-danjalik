
"use strict";

/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

/* ========================================
   LIGHT / DARK THEME
======================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  });
}

/* ========================================
   GALLERY LIGHTBOX
======================================== */

const galleryItems = Array.from(
  document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;
let previousFocus = null;

function showGalleryImage(index) {
  if (!galleryItems.length || !lightboxImage) return;

  currentImageIndex =
    (index + galleryItems.length) % galleryItems.length;

  const item = galleryItems[currentImageIndex];
  const image = item.querySelector("img");

  lightboxImage.src = item.dataset.full || image.src;
  lightboxImage.alt = image.alt;

  if (lightboxCounter) {
    lightboxCounter.textContent =
      `${String(currentImageIndex + 1).padStart(2, "0")} / ` +
      `${String(galleryItems.length).padStart(2, "0")}`;
  }
}

function openLightbox(index) {
  if (!lightbox) return;

  previousFocus = document.activeElement;
  showGalleryImage(index);

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", () => {
    showGalleryImage(currentImageIndex - 1);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", () => {
    showGalleryImage(currentImageIndex + 1);
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();

  if (event.key === "ArrowLeft") {
    showGalleryImage(currentImageIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showGalleryImage(currentImageIndex + 1);
  }
});


/* ========================================
   RUSH — CULPA MÍA TRILOGY FAN QUIZ
======================================== */

const questions = [
  {
    question: "Which film begins the trilogy?",
    options: ["Your Fault", "My Fault", "Our Fault", "Beyond the Fault"],
    answer: 1,
    explanation: "My Fault is the first film in the trilogy."
  },
  {
    question: "Who plays Noah Morán in the original Spanish films?",
    options: ["Eva Ruiz", "Clara Galle", "Nicole Wallace", "María Pedraza"],
    answer: 2,
    explanation: "Nicole Wallace plays Noah Morán."
  },
  {
    question: "Who portrays Nick Leister?",
    options: ["Gabriel Guevara", "Julio Peña", "Hugo Arbués", "Manu Ríos"],
    answer: 0,
    explanation: "Gabriel Guevara portrays Nick Leister."
  },
  {
    question: "Who wrote the Culpables book trilogy?",
    options: ["Elísabet Benavent", "Alice Kellen", "Blue Jeans", "Mercedes Ron"],
    answer: 3,
    explanation: "Mercedes Ron wrote the Culpables novels."
  },
  {
    question: "What is the original language of the Spanish trilogy?",
    options: ["Italian", "Spanish", "Portuguese", "French"],
    answer: 1,
    explanation: "The original Spanish films are in Spanish."
  },
  {
    question: "How are Noah and Nick related when they first meet?",
    options: [
      "Childhood friends",
      "Classmates",
      "Step-siblings",
      "Cousins"
    ],
    answer: 2,
    explanation: "Their parents' marriage makes them step-siblings."
  },
  {
    question: "What is the title of the second film?",
    options: ["Our Fault", "Your Fault", "My Fault", "One More Chance"],
    answer: 1,
    explanation: "Your Fault is the second film."
  },
  {
    question: "Which title completes the original Spanish trilogy?",
    options: ["Our Fault", "Their Fault", "Noah's Fault", "One Last Fault"],
    answer: 0,
    explanation: "Our Fault is the third film."
  },
  {
    question: "What is the name of Mercedes Ron's book series?",
    options: [
      "The After Series",
      "The Perfect Trilogy",
      "The Culpables Trilogy",
      "The Summer Series"
    ],
    answer: 2,
    explanation: "The films are adapted from Mercedes Ron's Culpables novels."
  },
  {
    question: "Which streaming service released the original Spanish My Fault?",
    options: ["Netflix", "Disney+", "HBO Max", "Prime Video"],
    answer: 3,
    explanation: "The original Spanish My Fault was released on Prime Video."
  }
];

const questionText = document.getElementById("questionText");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizProgress = document.getElementById("quizProgress");
const progressBar = document.getElementById("progressBar");
const nextQuestion = document.getElementById("nextQuestion");

let questionIndex = 0;
let score = 0;
let hasAnswered = false;
let quizFinished = false;

function renderQuestion() {
  if (!questionText || !quizOptions) return;

  const question = questions[questionIndex];

  hasAnswered = false;
  quizFinished = false;

  questionText.textContent = question.question;

  if (quizProgress) {
    quizProgress.textContent =
      `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / ` +
      `${String(questions.length).padStart(2, "0")}`;
  }

  if (progressBar) {
    progressBar.style.width =
      `${(questionIndex / questions.length) * 100}%`;
  }

  if (quizFeedback) {
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
  }

  if (nextQuestion) {
    nextQuestion.disabled = true;
    nextQuestion.textContent =
      questionIndex === questions.length - 1
        ? "See my result →"
        : "Next question →";

    delete nextQuestion.dataset.restart;
  }

  quizOptions.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.dataset.answer = String(index);

    button.addEventListener("click", () => selectAnswer(index));

    quizOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (hasAnswered || quizFinished) return;

  hasAnswered = true;

  const question = questions[questionIndex];
  const options = quizOptions.querySelectorAll(".quiz-option");
  const correct = selectedIndex === question.answer;

  if (correct) score++;

  options.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (quizFeedback) {
    quizFeedback.textContent = correct
      ? `Correct! ${question.explanation}`
      : `Not quite! ${question.explanation}`;

    quizFeedback.classList.add(
      correct ? "feedback-correct" : "feedback-wrong"
    );
  }

  if (progressBar) {
    progressBar.style.width =
      `${((questionIndex + 1) / questions.length) * 100}%`;
  }

  if (nextQuestion) nextQuestion.disabled = false;
}

function showQuizResult() {
  quizFinished = true;

  if (quizProgress) quizProgress.textContent = "QUIZ COMPLETE";
  if (progressBar) progressBar.style.width = "100%";

  if (questionText) {
    questionText.textContent = `You scored ${score} out of ${questions.length}!`;
  }

  quizOptions.replaceChildren();

  let message;

  if (score === questions.length) {
    message = "A true trilogy expert! You know this story by heart. ♡";
  } else if (score >= 7) {
    message = "Amazing! You're a devoted Noah and Nick fan.";
  } else if (score >= 4) {
    message = "Not bad! There's still more of the trilogy to discover.";
  } else {
    message = "Time for a trilogy marathon. Try again!";
  }

  if (quizFeedback) {
    quizFeedback.textContent = message;
    quizFeedback.className = "quiz-feedback quiz-result-message";
  }

  if (nextQuestion) {
    nextQuestion.disabled = false;
    nextQuestion.textContent = "Play again ↻";
    nextQuestion.dataset.restart = "true";
  }
}

if (nextQuestion) {
  nextQuestion.addEventListener("click", () => {
    if (nextQuestion.dataset.restart === "true") {
      questionIndex = 0;
      score = 0;
      renderQuestion();
      return;
    }

    if (!hasAnswered || quizFinished) return;

    if (questionIndex < questions.length - 1) {
      questionIndex++;
      renderQuestion();
    } else {
      showQuizResult();
    }
  });
}

renderQuestion();



/* ========================================
   RUSH — FAN COMMUNITY
   Share stories, add comments, delete posts.
   Storage is local to this browser/device.
======================================== */

(() => {
  "use strict";

  const form = document.getElementById("fanPostForm");
  const postsContainer = document.getElementById("fanPosts");

  // Safely skip pages without the Fan Zone.
  if (!form || !postsContainer) return;

  const STORAGE_KEY = "rushFanZonePosts";
  const MAX_POSTS = 100;
  const MAX_COMMENTS = 200;

  let posts = [];

  // ----------------------------------------
  // LOAD SAVED POSTS
  // ----------------------------------------

  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (Array.isArray(saved)) {
      posts = saved
        .filter((post) =>
          post &&
          typeof post.id === "string" &&
          typeof post.name === "string" &&
          typeof post.title === "string" &&
          typeof post.story === "string"
        )
        .slice(0, MAX_POSTS);
    }
  } catch (error) {
    console.warn("Fan Zone posts could not be loaded.", error);
  }

  // ----------------------------------------
  // HELPER: CREATE HTML ELEMENTS SAFELY
  // ----------------------------------------

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  // ----------------------------------------
  // SAVE POSTS TO LOCAL STORAGE
  // ----------------------------------------

  function savePosts() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
      );

      return true;
    } catch (error) {
      console.error("Fan Zone posts could not be saved.", error);

      alert(
        "Your browser could not save this change. " +
        "Check your browser storage settings or available space."
      );

      return false;
    }
  }

  // ----------------------------------------
  // DELETE A STORY
  // ----------------------------------------

  function deletePost(postId) {
    const postIndex = posts.findIndex(
      (post) => post.id === postId
    );

    if (postIndex === -1) return;

    const post = posts[postIndex];

    const confirmed = window.confirm(
      `Delete "${post.title}"?\n\n` +
      "This will permanently remove this story and all its comments " +
      "from this browser's saved Fan Zone."
    );

    if (!confirmed) return;

    // Temporarily remove the story.
    const deletedPost = posts.splice(postIndex, 1)[0];

    if (savePosts()) {
      renderPosts();
    } else {
      // Restore it if saving the deletion fails.
      posts.splice(postIndex, 0, deletedPost);
      renderPosts();
    }
  }

  // ----------------------------------------
  // RENDER ALL STORIES
  // ----------------------------------------

  function renderPosts() {
    postsContainer.replaceChildren();

    if (posts.length === 0) {
      const empty = makeElement("div", "fan-empty");

      empty.append(
        makeElement("span", "fan-empty-icon", "♡"),
        makeElement(
          "h4",
          "",
          "Every story starts somewhere."
        ),
        makeElement(
          "p",
          "",
          "Be the first to share a moment and start a conversation."
        )
      );

      postsContainer.appendChild(empty);
      return;
    }

    posts.forEach((post) => {
      // Ensure every story has a comments array.
      if (!Array.isArray(post.comments)) {
        post.comments = [];
      }

      // STORY CARD
      const card = makeElement("article", "fan-post");

      // POST HEADER
      const header = makeElement("div", "fan-post-header");

      const category = makeElement(
        "span",
        "fan-post-category",
        post.category || "Fan story"
      );

      const author = makeElement(
        "span",
        "fan-post-author",
        `♡ ${post.name}`
      );

      // DELETE BUTTON
      const deleteButton = makeElement(
        "button",
        "fan-delete-button",
        "Delete story"
      );

      deleteButton.type = "button";

      deleteButton.setAttribute(
        "aria-label",
        `Delete story: ${post.title}`
      );

      deleteButton.addEventListener("click", () => {
        deletePost(post.id);
      });

      header.append(category, author, deleteButton);

      // POST TITLE, STORY, AND DATE
      const title = makeElement("h4", "", post.title);

      const story = makeElement(
        "p",
        "fan-post-body",
        post.story
      );

      const date = makeElement(
        "p",
        "fan-post-date",
        post.date || "Shared by a fan"
      );

      card.append(header, title, story, date);

      // ------------------------------------
      // COMMENTS SECTION
      // ------------------------------------

      const commentsSection = makeElement(
        "div",
        "fan-comments"
      );

      const commentsTitle = makeElement(
        "h5",
        "",
        `Comments (${post.comments.length})`
      );

      commentsSection.appendChild(commentsTitle);

      // DISPLAY EXISTING COMMENTS
      post.comments.forEach((comment) => {
        const commentElement = makeElement(
          "p",
          "fan-comment"
        );

        const commentAuthor = makeElement(
          "strong",
          "",
          `${comment.name || "Fan"}: `
        );

        const commentText = document.createTextNode(
          comment.text || ""
        );

        commentElement.append(commentAuthor, commentText);
        commentsSection.appendChild(commentElement);
      });

      // ------------------------------------
      // COMMENT FORM
      // ------------------------------------

      const commentForm = makeElement(
        "form",
        "fan-comment-form"
      );

      const commentName = document.createElement("input");

      commentName.type = "text";
      commentName.name = "commentName";
      commentName.maxLength = 40;
      commentName.placeholder = "Your nickname";
      commentName.setAttribute(
        "aria-label",
        "Your nickname"
      );
      commentName.autocomplete = "nickname";
      commentName.required = true;

      const commentInput = document.createElement("input");

      commentInput.type = "text";
      commentInput.name = "commentText";
      commentInput.maxLength = 500;
      commentInput.placeholder = "Write a comment...";
      commentInput.setAttribute(
        "aria-label",
        "Write a comment"
      );
      commentInput.required = true;

      const commentButton = makeElement(
        "button",
        "",
        "Comment ↗"
      );

      commentButton.type = "submit";

      commentForm.append(
        commentName,
        commentInput,
        commentButton
      );

      // HANDLE NEW COMMENT
      commentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = commentName.value.trim();
        const text = commentInput.value.trim();

        if (!name || !text) return;

        if (post.comments.length >= MAX_COMMENTS) {
          alert("This story has reached its comment limit.");
          return;
        }

        const comment = {
          name: name,
          text: text,
          date: new Date().toISOString()
        };

        post.comments.push(comment);

        if (savePosts()) {
          renderPosts();
        } else {
          post.comments.pop();
        }
      });

      commentsSection.appendChild(commentForm);
      card.appendChild(commentsSection);

      postsContainer.appendChild(card);
    });
  }

  // ----------------------------------------
  // SHARE A NEW STORY
  // ----------------------------------------

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document
      .getElementById("fanName")
      .value.trim();

    const category = document
      .getElementById("fanCategory")
      .value;

    const title = document
      .getElementById("fanTitle")
      .value.trim();

    const story = document
      .getElementById("fanStory")
      .value.trim();

    if (!name || !category || !title || !story) {
      alert(
        "Please fill in all the fields before sharing your story."
      );
      return;
    }

    if (posts.length >= MAX_POSTS) {
      alert(
        "This browser has reached its saved story limit. " +
        "Delete an existing story before sharing another."
      );
      return;
    }

    // Create a unique ID for the new story.
    const newPost = {
      id: (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
      )
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,

      name: name,
      category: category,
      title: title,
      story: story,
      date: new Date().toLocaleString(),
      comments: []
    };

    // Place the newest story first.
    posts.unshift(newPost);

    if (!savePosts()) {
      posts.shift();
      return;
    }

    renderPosts();
    form.reset();

    // Scroll to the community feed.
    postsContainer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // ----------------------------------------
  // INITIALIZE THE FAN ZONE
  // ----------------------------------------

  renderPosts();
})();
