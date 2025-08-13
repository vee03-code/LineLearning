<template>
  <div class="mac-style-container">
    <!-- The 3 Mac-like window controls -->
    <div class="mac-window-controls">
      <span class="mac-dot dot-red"></span>
      <span class="mac-dot dot-yellow"></span>
      <span class="mac-dot dot-green"></span>
    </div>
    <img src="@/assets/logo.png" alt="LineLearning Logo" class="mac-logo" />

    <div class="rz-content">
      <h1>RZ (Return-to-Zero) - Learn More</h1>
      <h2>Line coding</h2> 
      <p>Line coding converts bit sequences into digital signals for transmission.</p>
      <h3>Properties of line codes:</h3>
      <ul class="list">
      <li>No DC Component</li>
      <li>Self-clocking (synchronizing capability)</li>
      <li>Bandwidth compression</li>
      <li>Differential encoding</li>
      <li>Noise immunity</li>
      <li>Minimum crosstalk</li>
    </ul>
    <h3>These are the most important types of line coding technique:</h3>
    <ul class="\list">
      <li>Unipolar </li>
      <li>Polar, Example: RZ (Return-to-Zero)</li>
      <li>Bipolar</li>
      <li>Multilevel</li>
    </ul>
    <h2>Polar</h2>
    <p>In polar encoding two levels of voltage amplitude is used. </p>
    <p>The DC component issue of unipolar encoding is minimized, and the average voltage level on the line is decreased.</p>
    <h2>Return-to-Zero (RZ)</h2>
    <p>This encoding technique uses three different voltage levels to represent binary values. 
     positive voltage is used to represent bit 1, negative voltage is used to represent bit 0 . During the second half of each bit, this signal enters a resting state (zero).</p>
      <h3>Advantages</h3>
      <ul class="list">
        <li>Improved Clock Recovery: Since each bit interval includes a transition to zero, polar RZ provides inherent self-clocking. This frequent transition assists the receiver in maintaining proper synchronization, especially when long sequences of identical bits are transmitted.</li>
        <li>Low DC component: The return-to-zero behavior helps in reducing the overall DC bias in the transmitted signal. This is beneficial in transmission media that cannot handle DC components well.</li>
        <li>Error Detection: The presence of a mid-bit zero level can, in some cases, aid in error detection by providing extra transitions that highlight differences between the transmitted and received signals.</li>
      </ul>
      <h3>Disadvantages</h3>
      <ul class="list">
        <li>Increased Bandwidth Requirements: Because each bit involves two transitions (from the signal level to zero and then to the next bit’s level), polar RZ requires a wider bandwidth compared to non-return-to-zero (NRZ) schemes. This extra bandwidth is a significant trade-off in many high-speed communication systems.</li>
        <li>Complexity of circuitry: Generating and accurately detecting three distinct voltage levels (positive, negative, and zero) increases the design complexity of both the transmitter and receiver circuits. This complexity can lead to higher implementation costs and design challenges.</li>
      </ul>
      <h3>Use Cases</h3>
      <ul class="list">
        <li>Systems Requiring Reliable Synchronization: The built-in clock recovery of polar RZ makes it suitable for systems where maintaining synchronization is critical, despite the increased bandwidth cost.</li>
        <li>Environments with DC Coupling Issues: Applications that are sensitive to DC components (such as optical systems) can benefit from the low DC bias of polar RZ.</li>
        <li>Historical Applications: Although polar RZ has largely been replaced by more efficient encoding methods like Manchester and differential Manchester encoding, it may still be found in legacy systems or in niche applications where its specific properties are required.</li>
      </ul>

    </div>
    <router-link to="/" >Go Back</router-link>
<!-- Flashcard-style Quiz Section -->
<div class="center">
      <div class="quiz-container">
        <h2>RZ Quiz</h2>
        <!-- Reminder Button -->
<button class="reminder-btn" @click="showFlowchart = true">Reminder: View RZ Flowchart</button>

<!-- Modal Popup -->
<div v-if="showFlowchart" class="modal-overlay" @click.self="showFlowchart = false">
  <div class="modal-content">
    <span class="close-btn" @click="showFlowchart = false">&times;</span>
    <img src="@/assets/flowcharts/rz-flowchart.png" alt="RZ Flowchart" class="flowchart-image" />
  </div>
</div>
        <p>For each wave diagram below (encoded in RZ), enter the corresponding 4‑bit binary sequence:</p>
        
        <div v-if="currentQuizIndex < quizQuestions.length" class="flashcard">
          <img :src="quizQuestions[currentQuizIndex].img" alt="RZ Wave Diagram" class="wave-image" />
          <p>Enter the 4‑bit sequence:</p>
          <input v-model="quizInput" maxlength="4" placeholder="e.g. 1010" />
          <button @click="checkQuizAnswer">Submit</button>
          <p v-if="quizFeedback" :class="quizFeedbackClass">{{ quizFeedback }}</p>
        </div>

        <div v-else class="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>You scored {{ score }} out of {{ quizQuestions.length }}.</p>
          <p v-if="score === quizQuestions.length" class="success">Excellent! You aced it!</p>
          <p v-else class="retry">Review the content and try again.</p>
          <button @click="restartQuiz">Restart Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "RzPage",
  data() {
    return {
        showFlowchart: false,
      // Quiz data for RZ
      quizQuestions: [
        { img: require("@/assets/quiz/rz/rz-0001.png"), answer: "0001" },
        { img: require("@/assets/quiz/rz/rz-0101.png"), answer: "0101" },
        { img: require("@/assets/quiz/rz/rz-1010.png"), answer: "1010" },
        { img: require("@/assets/quiz/rz/rz-1110.png"), answer: "1110" }
      ],
      currentQuizIndex: 0,
      quizInput: "",
      quizFeedback: "",
      quizFeedbackClass: "",
      score: 0,
    };
  },
  methods: {
    checkQuizAnswer() {
      // Compare the user input with the correct answer
      if (this.quizInput === this.quizQuestions[this.currentQuizIndex].answer) {
        this.quizFeedback = "Correct!";
        this.quizFeedbackClass = "correct";
        this.score++;
        setTimeout(() => {
          this.clearAndNext();
        }, 1000);
      } else {
        this.quizFeedback = `Wrong! The correct answer is ${this.quizQuestions[this.currentQuizIndex].answer}`;
        this.quizFeedbackClass = "wrong";
        // Do not allow a retry; move to next after a short delay
        setTimeout(() => {
          this.clearAndNext();
        }, 1500);
      }
    },
    clearAndNext() {
      this.quizFeedback = "";
      this.quizInput = "";
      this.currentQuizIndex++;
    },
    restartQuiz() {
      this.currentQuizIndex = 0;
      this.quizInput = "";
      this.quizFeedback = "";
      this.score = 0;
    }
  }
};
</script>
<style scoped>
.mac-style-container {
  position: relative;
  background-color: #cbd9c7;
  border: 10px solid #fff;
  border-radius: 20px;
  /* Add some padding for the content inside */
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  /* If you want to center it or control its width: */
  width: 90%;
  margin: 2rem auto; /* center in the page, with top margin */
}

/* The 3 Mac-like window controls in the top-left corner */
.mac-window-controls {
  position: absolute;
  top: 1rem;   /* same offset as your other page */
  left: 1rem;
  display: flex;
  gap: 0.5rem; /* spacing between dots */
}
/* Dot styling (same as lineCodeVisualizer.vue) */
.mac-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
}
.dot-red {
  background-color: #ff5f57;
}
.dot-yellow {
  background-color: #ffbd2e;
}
.dot-green {
  background-color: #28c940;
}

/* Example styling for your content area inside */
.rz-content {
  margin-top: 2rem; /* push content down so it doesn't overlap dots */
  /* any other styling you want */
}
@media (max-width: 768px) {
  .mac-style-container {
    width: 95%;
    padding: 1rem;
  }
  
  .nrz-content h1 {
    font-size: 1.8rem;
  }
  
  .nrz-content h2 {
    font-size: 1.4rem;
  }
  
  .nrz-content p,
  .nrz-content li {
    font-size: 0.9rem;
  }
  
  .nrz-content ul {
    padding-left: 1.2rem;
  }
}
.mac-logo {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 300px; /* adjust as needed for a reasonable size on your pages */
  height: auto;
  object-fit: contain;
}
@media (max-width: 850px) {
  .mac-logo {
    width: 80px;       /* reduce the logo size */
    top: 0.5rem;       /* adjust vertical spacing */
    right: 0.5rem;     /* adjust horizontal spacing */
  }
  
  /* Optionally, you might want to add padding or margin to your content 
     to ensure it doesn't get overlapped */
  .rz-content {
    margin-top: 3rem;  /* push content down if needed */
  }
} 

/* Quiz Styles */
/* Quiz container styled to match the overall website vibe */
.quiz-container {
  margin-top: 3rem ;
  margin-left: 2rem;
  padding: 1rem;
  /* background: #fff; */
  /* background-color: #cbd9c7;      */
  border: 2px solid gray;         /* White border */
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: fit-content;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
    flex-wrap: wrap;
}

/* Flashcard styling */
.flashcard {
  margin-top: 1.5rem;
  padding: 0.5rem;
  /* background: #fff;               */
  border: 4px solid #cbd9c7;      /* Border matching the container background */
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  width: 80%;
  height: fit-content;
  padding: 10px;
}

/* Adjust the quiz image */
.wave-image {
  width: 100%;
  /* max-width: 600px; */
  margin-bottom: 1rem;
  background: #fff;  
}

/* Input styling for the quiz answer */
.quiz-container input {
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  width: 100px;
  border: 2px solid #cbd9c7;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}
.quiz-container input:focus {
  border-color: #4caf50; /* Green focus border */
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

/* Button styling for the quiz (using a green gradient similar to the generate button) */
.quiz-container button {
  margin-left: 10px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(90deg, #80bb82 0%, #5aa45d 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.quiz-container button:hover {
  background: linear-gradient(90deg, #43a047 0%, #2c6f30 100%);
}
.quiz-container button:active {
  transform: scale(0.98);
}

/* Feedback text styling */
.correct {
  color: #4caf50;
  font-weight: bold;
}
.wrong {
  color: #e53935;
  font-weight: bold;
}

/* Quiz result styling */
.quiz-result {
  margin-top: 2rem;
}
.success {
  color: #4caf50;
  font-weight: bold;
}
.retry {
  color: #e53935;
  font-weight: bold;
}
.center{
  display: flex;
  justify-content: center;
  align-content: center;
}
.reminder-btn {
  margin-bottom: 1rem;
  padding: 8px 14px;
  font-size: 1rem;
  background: linear-gradient(90deg, #80bb82 0%, #5aa45d 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}
.reminder-btn:hover {
  background: linear-gradient(90deg, #43a047 0%, #2c6f30 100%);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.5rem;
  cursor: pointer;
}

.flowchart-image {
  max-width: 70%;
  height: auto;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

</style>
