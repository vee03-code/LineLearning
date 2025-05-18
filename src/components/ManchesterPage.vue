<template>
  <div class="mac-style-container">
    <!-- The 3 Mac-like window controls -->
    <div class="mac-window-controls">
      <span class="mac-dot dot-red"></span>
      <span class="mac-dot dot-yellow"></span>
      <span class="mac-dot dot-green"></span>
    </div>
    <img src="@/assets/logo.png" alt="LineLearning Logo" class="mac-logo" />

    <div class="Manchester-content">
      <h1>Manchester - Learn More</h1>
      <h2>Line coding</h2> 
      <p>Line coding converts bit sequences into digital signals for transmission.</p>
      <h3>Properties of line codes:</h3>
      <ul class="list">
      <li>No DC Component</li>
      <li>Self-clocking (synchronizing capability)</li>
      <li>Bandwidth compression</li>
      <li>Differential encoding</li>
      <li>Noise immunity</li>
      <li>Minimum crosswalk</li>
    </ul>
    <h3>These are the most important types of line coding technique:</h3>
    <ul class="\list">
      <li>Unipolar </li>
      <li>Polar such as Manchester</li>
      <li>Bipolar</li>
      <li>Multilevel</li>
    </ul>
    <h2>Polar</h2>
    <p>In polar encoding two levels of voltage amplitude are used. </p>
    <p>The DC component issue of unipolar encoding is minimized, and the average voltage level on the line is decreased.</p>
    <h2>Manchester Encoding</h2>
    <p>Polar Manchester encoding is a biphasic line coding technique where each bit period is divided into two equal halves. Unlike NRZ schemes, a transition always occurs in the middle of each bit period</p>
    <p>In Manchester encoding, the binary data is represented by the polarity of the transition:</p>
    <li>A negative-to-positive transition typically represents a binary 1.</li>
    <li>A positive-to-negative transition represents a binary 0.</li>
    <h3>Advantages</h3>
      <ul class="list">
        <li>Self-Clocking Capability: The guaranteed transition in the middle of every bit makes it easier for the receiver to synchronize its clock with the incoming data, even when long sequences of identical bits are transmitted.</li>
        <li>No DC component: With equal representation of positive and negative voltages, the average voltage over time is zero. This makes the signal suitable for transmission through media that cannot handle DC components, such as transformer-coupled circuits or optical systems.</li>
        <li>Improved Noise Immunity: The use of polar signaling and a regular transition pattern helps the receiver differentiate between actual data transitions and noise, enhancing the reliability of data recovery.</li>
        <li>Error detection: The consistent transitions provide additional reference points, making it easier to detect errors or timing drifts, which is valuable in systems where data integrity is critical.</li>
      </ul>
      <h3>Disadvantages</h3>
      <ul class="list">
        <li>Increased Bandwidth Requirement: Since each bit is encoded with two distinct halves (effectively doubling the number of transitions per bit), Polar Manchester encoding requires a minimum bandwidth that is twice that of simpler NRZ schemes. This higher bandwidth demand can be a limiting factor in high-speed or bandwidth-constrained systems.</li>
        <li>Higher Complexity in Implementation: The necessity to generate and detect precise mid-bit transitions, along with accurately differentiating between the positive and negative levels, can complicate both the transmitter and receiver circuitry. This complexity may lead to increased design and maintenance costs.</li>
        <li>Lower Spectral Efficiency: Because of the doubled bandwidth usage, Polar Manchester encoding is less spectrally efficient compared to NRZ schemes. This is particularly important in applications where spectrum resources are limited.</li>
      </ul>
      <h3>Use Cases</h3>
      <ul class="list">
        <li>Local Area Networks (LANs): Historically, Manchester encoding has been used in Ethernet and other LAN technologies because its self-clocking nature simplified synchronization in network communication.</li>
        <li>Data Communication Systems: In systems where reliable clock recovery is critical, such as in certain digital telecommunication systems, the regular transitions provided by Manchester encoding ensure robust timing recovery.</li>
        <li>Environments Sensitive to DC Bias: Applications that involve transformer coupling or require AC-coupled transmission benefit from the zero DC component of Manchester encoding.</li>
      </ul>

    </div>
    <router-link to="/" >Go Back</router-link>
 <!-- Flashcard-style Quiz Section -->
 <div class="center">
      <div class="quiz-container">
        <h2>Manchester Quiz</h2>
        <p>For each wave diagram below (encoded in Manchester), enter the corresponding 4‑bit binary sequence:</p>

        <div v-if="currentQuizIndex < quizQuestions.length" class="flashcard">
          <img :src="quizQuestions[currentQuizIndex].img" alt="Manchester Wave Diagram" class="wave-image" />
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
  name: "ManchesterPage",
  data() {
    return {
      // Quiz data for Manchester encoding
      quizQuestions: [
        { img: require("@/assets/quiz/manchester/manchester-1010.png"), answer: "1010" },
        { img: require("@/assets/quiz/manchester/manchester-0101.png"), answer: "0101" },
        { img: require("@/assets/quiz/manchester/manchester-0001.png"), answer: "0001" },
        { img: require("@/assets/quiz/manchester/manchester-1110.png"), answer: "1110" }
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
.Manchester-content {
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
</style>