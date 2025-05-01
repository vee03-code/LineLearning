 <template>
    <div class="mac-style-container">
      <!-- The 3 Mac-like window controls -->
      <div class="mac-window-controls">
        <span class="mac-dot dot-red"></span>
        <span class="mac-dot dot-yellow"></span>
        <span class="mac-dot dot-green"></span>
      </div>
      <img src="@/assets/logo.png" alt="LineLearning Logo" class="mac-logo" />

      <div class="nrz-content">
        <h1>NRZ (Non-Return-to-Zero) - Learn More</h1>
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
        <li>Unipolar such as NRZ (Non-Return-to-Zero)</li>
        <li>Polar</li>
        <li>Bipolar</li>
      </ul>
      <h2>Unipolar</h2>
      <p>In Unipolar encoding, only one polarity is used i.e., bit 1 is used to represent positive voltage and bit 0 is used to represent zero voltage or idle line. 
      </p><p>It is also known as Unipolar-Non-return-to-zero. Signaling of this kind is also referred to as on-off signaling.</p>
      <h2>Non-Return-to-Zero (NRZ) </h2>
      <p>Non-Return-to-Zero (NRZ) – It is unipolar line coding scheme in which positive voltage defines bit 1 and the zero voltage defines bit 0.
       Signal does not return to zero at the middle of the bit thus it is called NRZ. </p>
      <h3>Advantages</h3>
      <ul class="list">
        <li>Simplicity of Implementation: The unipolar NRZ scheme is easy to implement both in hardware and software. The transmitter only needs to switch between a single voltage level and zero, and the receiver simply distinguishes between the presence and absence of voltage.</li>
        <li>Cost Effectiveness: Because it uses only one voltage level (apart from zero), the overall circuit design is simpler and requires fewer components. This makes unipolar NRZ an attractive option in low-cost applications.</li>
        <li>Low-complexity receiver circuit: The receiver circuit for unipolar NRZ is relatively simple, as it needs only to detect whether the incoming signal is at the designated positive voltage or at zero.</li>
      </ul>
      <h3>Disadvantages</h3>
      <ul class="list">
        <li>Baseline Wander: A major drawback of unipolar NRZ is the potential for baseline wander. In scenarios where there are long sequences of 0s (or 1s), the average signal level can drift, making it harder for the receiver to correctly interpret the bits.</li>
        <li>Self-Synchronization Issues: Without frequent transitions between voltage levels, the clock recovery becomes challenging. The receiver might struggle to maintain proper timing and synchronization when the signal remains at the same level for extended periods.</li>
        <li>High power consumption for logical 1s: Since a positive voltage is continuously applied to represent a logical 1, the scheme can consume more power than alternative methods (such as polar schemes) when transmitting data with a higher density of 1s.</li>
        <li>DC Component Issues: The constant application of a non-zero voltage for logical 1 results in a DC component in the signal. This DC bias can be problematic in transmission media or systems (like transformer-coupled channels) that are designed to pass only AC components.</li>
      </ul>
      <h3>Use Cases</h3>
      <ul class="list">
        <li>Low-Cost and Low-Speed Digital Communication: Due to its simple design and ease of implementation, unipolar NRZ is often used in low-cost digital communication systems where high data rates are not critical.</li>
        <li>Data Storage Systems: Unipolar NRZ can be found in some types of data storage and simple digital signaling applications where the simplicity of the coding scheme outweighs its limitations.</li>
        <li>Short-Distance Communication: In systems where the transmission distance is short and the impact of baseline wander is minimal, unipolar NRZ can be an effective choice.</li>
      </ul>
      </div>
     <router-link to="/" >Go Back</router-link>

    <!-- Flashcard-style Quiz Section -->
     <div class="center">
    <div class="quiz-container">
      <h2>NRZ Quiz</h2>
      <p>For each wave diagram below (encoded in NRZ), enter the corresponding 4-bit binary sequence:</p>

      <div v-if="currentQuizIndex < quizQuestions.length" class="flashcard">
          <img :src="quizQuestions[currentQuizIndex].img" alt="NRZ Wave Diagram" class="wave-image" />
          <p>Enter the 4-bit sequence:</p>
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
  name: "NrzPage",
  data() {
    return {
      // Quiz data:
      quizQuestions: [
        { img: require("@/assets/quiz/nrz/nrz-1010.png"), answer: "1010" },
        { img: require("@/assets/quiz/nrz/nrz-0101.png"), answer: "0101" },
        { img: require("@/assets/quiz/nrz/nrz-0001.png"), answer: "0001" },
        { img: require("@/assets/quiz/nrz/nrz-1110.png"), answer: "1110" }
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
      // Check the user's input against the correct answer.
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
        // Do not allow retry; move to next after a short delay.
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
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 2rem auto;
}

.mac-window-controls {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

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

.mac-logo {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 300px;
  height: auto;
  object-fit: contain;
}
@media (max-width: 850px) {
  .mac-logo {
    width: 80px;
    top: 0.5rem;
    right: 0.5rem;
  }
}

.nrz-content {
  margin-top: 2rem;
}

.go-back {
  display: inline-block;
  margin-top: 1rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
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

/* Responsive adjustments */
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
.center{
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
