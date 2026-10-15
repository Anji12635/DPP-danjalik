
"use strict";

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

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
    menuToggle.textContent = "☰";
  });
});

// LIGHT / DARK THEME
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeToggle.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
});

// GALLERY LIGHTBOX
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
  if (!galleryItems.length) return;

  currentImageIndex =
    (index + galleryItems.length) % galleryItems.length;

  const item = galleryItems[currentImageIndex];
  const image = item.querySelector("img");

  // Use the existing original file, not a thumbnail or replacement.
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = image.alt;
  lightboxCounter.textContent =
    `${String(currentImageIndex + 1).padStart(2, "0")} / ` +
    `${String(galleryItems.length).padStart(2, "0")}`;
}

function openLightbox(index) {
  previousFocus = document.activeElement;
  showGalleryImage(index);

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (previousFocus) previousFocus.focus();
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
  showGalleryImage(currentImageIndex - 1);
});

lightboxNext.addEventListener("click", () => {
  showGalleryImage(currentImageIndex + 1);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") {
    showGalleryImage(currentImageIndex - 1);
  }
  if (event.key === "ArrowRight") {
    showGalleryImage(currentImageIndex + 1);
  }
});

// THREE-QUESTION FAN QUIZ
const questions = [
  {
    question: "Which film begins the trilogy?",
    options: ["Your Fault", "My Fault", "Our Fault"],
    answer: 1,
    explanation: "My Fault is the first film in the trilogy."
  },
  {
    question: "What is the title of the second film?",
    options: ["Our Fault", "My Fault", "Your Fault"],
    answer: 2,
    explanation: "Your Fault is the second chapter."
  },
  {
    question: "Which film concludes the trilogy?",
    options: ["Our Fault", "Your Fault", "My Fault"],
    answer: 0,
    explanation: "Our Fault is the third and final film."
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

function renderQuestion() {
  const question = questions[questionIndex];

  hasAnswered = false;
  questionText.textContent = question.question;
  quizProgress.textContent =
    `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / ` +
    `${String(questions.length).padStart(2, "0")}`;

  progressBar.style.width =
    `${((questionIndex + 1) / questions.length) * 100}%`;

  quizFeedback.textContent = "";
  nextQuestion.disabled = true;
  nextQuestion.textContent =
    questionIndex === questions.length - 1
      ? "See my result →"
      : "Next question →";

  quizOptions.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index));

    quizOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (hasAnswered) return;

  hasAnswered = true;

  const question = questions[questionIndex];
  const options = quizOptions.querySelectorAll(".quiz-option");
  const correct = selectedIndex === question.answer;

  if (correct) score++;

  options.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex && !correct) {
      button.classList.add("incorrect");
    }
  });

  quizFeedback.textContent = correct
    ? `Correct! ${question.explanation}`
    : `Not quite. ${question.explanation}`;

  nextQuestion.disabled = false;
}

function showQuizResult() {
  quizProgress.textContent = "QUIZ COMPLETED";
  progressBar.style.width = "100%";
  questionText.textContent =
    score === questions.length
      ? "A true trilogy expert!"
      : score >= 2
        ? "You know your trilogy!"
        : "Time for a movie marathon!";

  quizOptions.replaceChildren();

  const result = document.createElement("p");
  result.className = "quiz-feedback";
  result.textContent =
    `You scored ${score} out of ${questions.length}.`;

  quizOptions.appendChild(result);
  quizFeedback.textContent =
    "Thanks for playing. Ready to revisit your favourite chapter?";

  nextQuestion.disabled = false;
  nextQuestion.textContent = "Play again ↻";
  nextQuestion.dataset.restart = "true";
}

nextQuestion.addEventListener("click", () => {
  if (nextQuestion.dataset.restart === "true") {
    questionIndex = 0;
    score = 0;
    delete nextQuestion.dataset.restart;
    renderQuestion();
    return;
  }

  questionIndex++;

  if (questionIndex >= questions.length) {
    showQuizResult();
  } else {
    renderQuestion();
  }
});

renderQuestion();
