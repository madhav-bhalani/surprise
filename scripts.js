// DOM Elements
const titleScreen = document.getElementById("title-screen");
const scene = document.getElementById("scene");
const helloKitty = document.getElementById("hello-kitty");
const cinnamoroll = document.getElementById("cinnamoroll");
const kittySpeech = document.getElementById("kitty-speech");
const cinnamorollSpeech = document.getElementById("cinnamoroll-speech");
const polaroidSlider = document.getElementById("polaroid-slider");
const navButtons = document.querySelector(".nav-buttons");
const polaroidImages = document.querySelectorAll(".polaroid");

let currentIndex = 0; // Track the current conversation index
let polaroidIndex = 0; // Track the current Polaroid to display
let clickHereButton; // Declare the "Click Here" button globally
let feelingsButton; // Declare the "Click Here" button for feelings text
let promptDisplayed = false; // Flag to ensure the prompt is shown only once

// Conversations
const conversations = [
  {
    kitty: "what do you want?😒",
    cinnamoroll: "hii kitty😚😚",
  },

  {
    kitty: "can you just leave me alone",
    cinnamoroll: "i want YOU baby",
  },
  {
    kitty: "jeez no im not. just go away now, i need some space.",
    cinnamoroll: "babe are you okay?",
  },
  {
    kitty: "no it's you madhav",
    cinnamoroll: "is it the adietya guy again?",
  },

  {
    kitty: "yeah now you're sorry huh. do you know how much you hurt me",
    cinnamoroll: "okay im sorry",
  },

  { kitty: "it feels like you don't even value me", cinnamoroll: "" },

  {
    kitty: "okay so you're just gonna stand there. say something idiot",
    cinnamoroll: "",
  },

  {
    kitty: "",
    cinnamoroll:
      "okay im really sorry saima that i made you feel like that. i would never do anything to hurt you ever again.",
  },

  {
    kitty: "ohh so you can't express huh? what are you a robot?😒",
    cinnamoroll: "and i do value you. it's just i can't express my feelings.",
  },

  {
    kitty: "yes please",
    cinnamoroll: "so you wanna see how i express my feelings for someone?",
  },

  {
    kitty: "no wonder there's another woman? who's that bitch?",
    cinnamoroll: "okay there is this is girl who means the world to me",
  },
  {
    kitty: "are you hurting me because of her?",
    cinnamoroll: "",
  },

  {
    kitty: "",
    cinnamoroll:
      "ok ok baby stop if you would just click the button below you will find out who's she",
  },
];

// Start Title Screen
document.getElementById("start-btn").addEventListener("click", () => {
  titleScreen.style.display = "none";
  scene.style.display = "flex";
  animateCharacters();
  showConversation(0);
});

// Animate Characters
function animateCharacters() {
  gsap.from(cinnamoroll, { x: "-100%", duration: 1 });
  gsap.from(helloKitty, { x: "100%", duration: 1 });
}

// Show Conversation
function showConversation(index) {
  if (index >= conversations.length) return; // Prevent overflow

  currentIndex = index;
  const convo = conversations[index];
  kittySpeech.textContent = convo.kitty || "";
  cinnamorollSpeech.textContent = convo.cinnamoroll || "";

  gsap.to(kittySpeech, { display: "block", opacity: 1, duration: 0.5 });
  gsap.to(cinnamorollSpeech, {
    display: "block",
    opacity: 1,
    duration: 0.5,
    delay: 0.5,
  });

  handleSurprise(convo);
}

// Handle "Click Here" button visibility and event
function handleSurprise(conversation) {
  if (
    conversation.cinnamoroll ===
    "ok ok baby stop if you would just click the button below you will find out who's she"
  ) {
    if (!clickHereButton) {
      // Create the "Click Here" button dynamically
      clickHereButton = document.createElement("button");
      clickHereButton.id = "click-here-btn";
      clickHereButton.textContent = "Click Here";
      clickHereButton.style.position = "absolute";
      clickHereButton.style.bottom = "10%";
      clickHereButton.style.left = "40%";
      clickHereButton.style.transform = "translateX(-50%)";
      clickHereButton.style.padding = "10px 20px";
      clickHereButton.style.fontSize = "1.2rem";
      clickHereButton.style.backgroundColor = "#ff4980";
      clickHereButton.style.color = "white";
      clickHereButton.style.border = "none";
      clickHereButton.style.borderRadius = "5px";
      clickHereButton.style.cursor = "pointer";
      clickHereButton.style.zIndex = "10";

      // Add event listener to show Polaroid slider
      clickHereButton.addEventListener("click", () => {
        clickHereButton.style.display = "none"; // Hide the button
        showPolaroidSlider(); // Show the Polaroid slider
      });

      scene.appendChild(clickHereButton); // Add button to the scene
    }
    clickHereButton.style.display = "block"; // Ensure the button is visible
  } else if (clickHereButton) {
    clickHereButton.style.display = "none"; // Hide the button for other conversations
  }
}

// Show Polaroid Slider and hide characters and buttons
function showPolaroidSlider() {
  // Hide unnecessary elements
  helloKitty.style.display = "none";
  cinnamoroll.style.display = "none";
  navButtons.style.display = "none";
  kittySpeech.style.display = "none";
  cinnamorollSpeech.style.display = "none";

  // Attach event listener to display Polaroids one by one
  document.addEventListener("click", showNextPolaroid);
}

// Display Polaroids one by one on mouse click
function showNextPolaroid() {
  if (polaroidIndex < polaroidImages.length) {
    const currentPolaroid = polaroidImages[polaroidIndex];
    currentPolaroid.style.display = "block"; // Show the current Polaroid
    gsap.from(currentPolaroid, { opacity: 0, y: 50, duration: 0.8 }); // Animate its entry
    polaroidIndex++; // Move to the next Polaroid
  }

  // If it's the last Polaroid, show the prompt and button
  if (polaroidIndex === polaroidImages.length) {
    setTimeout(showFeelingsPrompt, 1000); // Delay to show the feelings prompt
  }
}

// Show feelings prompt after last Polaroid
function showFeelingsPrompt() {
  if (promptDisplayed) return; // Prevent showing the prompt multiple times

  const promptText = document.createElement("div");
  promptText.id = "feelings-prompt";
  promptText.textContent = "DO YOU WANNA KNOW HOW MUCH SHE MEANS TO ME?";
  promptText.style.textAlign = "center";
  promptText.style.fontSize = "1.5rem";
  promptText.style.marginTop = "20px";
  promptText.style.color = "#ff4980";

  feelingsButton = createButton("Click Here", displayFeelings);
  polaroidSlider.appendChild(promptText);
  polaroidSlider.appendChild(feelingsButton);

  promptDisplayed = true; // Flag set to prevent re-triggering
}

// Display feelings text (float around and disappear)
function displayFeelings() {
  feelingsButton.style.display = "none"; // Hide the button

  const feelings = [
    "I love the way you smile.",
    "You make every moment feel better.",
    "You’re my favorite person to cuddle with.",
    "In your presence, I find a silence that speaks louder than words.",
    "You inspire me to be better.",
    "Your heart is a universe, where even the stars find peace.",
    "With every little fight we have, I keep falling more for you slowly, steadily, perfectly.",
    "In the storm, you are my calm.",
    "You're my favourite catto.",
    "My no.1 girl.",
    "Thank you for being you❤️",
  ];

  let timeline = gsap.timeline();

  feelings.forEach((text, index) => {
    const feelingText = document.createElement("div");
    feelingText.textContent = text;
    feelingText.className = "floating-text";
    feelingText.style.position = "absolute";
    feelingText.style.fontSize = "1.5rem";
    feelingText.style.color = "black";
    feelingText.style.padding = "10px 20px";
    feelingText.style.backgroundColor = "rgb(255, 236, 236, 0.6)";
    feelingText.style.borderRadius = "5px";
    feelingText.style.fontFamily = "'Vibur', cursive";
    feelingText.style.fontWeight = "400";
    feelingText.style.fontStyle = "normal";

    // Randomize the initial position from different corners/sides but within viewport
    feelingText.style.left = `${Math.random() * 70 + 10}%`; // Ensures it's within bounds
    feelingText.style.top = `${Math.random() * 50 + 10}%`; // Ensures it's within bounds

    document.body.appendChild(feelingText);

    // Create the animation for this text
    timeline
      .from(feelingText, {
        opacity: 0,
        x: Math.random() * 300 - 150, // Random movement within screen bounds
        y: Math.random() * 300 - 150, // Random movement within screen bounds
        duration: 2, // Slower movement
        ease: "power1.out",
      })
      .to(feelingText, {
        opacity: 0,
        duration: 2,
        delay: 2, // Stay visible for 2 seconds
        onComplete: () => feelingText.remove(),
      });
  });

  // Once all the floating texts have been displayed, we can re-show the prompt
  timeline.add(() => {
    setTimeout(() => {
      showFeelingsPrompt();
    }, 3000); // Wait until all texts disappear before showing the prompt again
  });
}

// Helper function to create buttons
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.padding = "10px 20px";
  button.style.fontSize = "1rem";
  button.style.backgroundColor = "#ff4980";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.marginTop = "20px";
  button.addEventListener("click", onClick);
  return button;
}

// Navigation Buttons
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) showConversation(currentIndex - 1);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < conversations.length - 1)
    showConversation(currentIndex + 1);
});
