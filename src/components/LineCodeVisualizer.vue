<template>
  <div class="page">
    <!-- SLIDESHOW CONTAINER -->
    <div class="slideshow-container">
      <!-- Mac-style top-left circles -->
      <div class="mac-window-controls">
        <span class="mac-dot dot-red"></span>
        <span class="mac-dot dot-yellow"></span>
        <span class="mac-dot dot-green"></span>
      </div>
      <!-- Slide 1: Unipolar -->
      <div class="mySlides fade" :style="{ display: currentSlide === 0 ? 'block' : 'none' }">
        <div class="numbertext">1 / 4</div>
        <div class="slide-content">
          <div class="logoTitle">
            <h2>Unipolar</h2>
            <div class="slide-header">
              <img src="@/assets/logo.png" alt="LineLearning Logo" class="slide-logo" />
            </div>
          </div>
          <p>
            Unipolar line coding uses only one voltage level for bit=1 (e.g., +V)
            and 0V for bit=0. This can cause a DC component and poor synchronization
            if there are long runs of identical bits.
          </p>
          <p><strong>Example:</strong> NRZ</p>
        </div>
      </div>
      <!-- Slide 2: Polar -->
      <div class="mySlides fade" :style="{ display: currentSlide === 1 ? 'block' : 'none' }">
        <div class="numbertext">2 / 4</div>
        <div class="slide-content">
          <div class="logoTitle">
            <h2>Polar</h2>
            <div class="slide-header">
              <img src="@/assets/logo.png" alt="LineLearning Logo" class="slide-logo" />
            </div>
          </div>
          <p>
            Polar line coding uses two levels (+V and -V). Polar schemes avoid a DC
            component but often need higher bandwidth.
          </p>
          <p><strong>Examples:</strong> NRZ-L, NRZ-I, RZ, Manchester, Differential Manchester</p>
        </div>
      </div>
      <!-- Slide 3: Bipolar -->
      <div class="mySlides fade" :style="{ display: currentSlide === 2 ? 'block' : 'none' }">
        <div class="numbertext">3 / 4</div>
        <div class="slide-content">
          <div class="logoTitle">
            <h2>Bipolar</h2>
            <div class="slide-header">
              <img src="@/assets/logo.png" alt="LineLearning Logo" class="slide-logo" />
            </div>
          </div>
          <p>
            Bipolar line coding uses three levels (+V, -V, and 0). Binary 0 is typically
            0V, while 1s alternate between +V and -V to remove DC offset.
          </p>
          <p><strong>Example:</strong> AMI, Pseudoternary</p>
        </div>
      </div>
      <!-- Slide 4: Multilevel (PAM-4) -->  
   <div class="mySlides fade" :style="{ display: currentSlide === 3 ? 'block' : 'none' }">  
      <div class="numbertext">4 / 4</div>  
      <div class="slide-content">  
        <div class="logoTitle">  
          <h2>Multilevel</h2>  
          <div class="slide-header">  
            <img src="@/assets/logo.png" alt="LineLearning Logo" class="slide-logo" />  
          </div>  
        </div>  
        <p>
          Multilevel line coding uses more than two amplitude levels per symbol.
          for example , PAM4 uses 4 levels.
        </p>
        <p><strong>Example:</strong> PAM-4 (100Gbps per lane)</p> 
      </div>  
    </div>  
      <!-- Next and previous arrows -->
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br />
    <!-- The dots/circles -->
    <div style="text-align: center">
      <span class="dot" :class="{ active: currentSlide === 0 }" @click="currentSlide = 0"></span>
      <span class="dot" :class="{ active: currentSlide === 1 }" @click="currentSlide = 1"></span>
      <span class="dot" :class="{ active: currentSlide === 2 }" @click="currentSlide = 2"></span>
      <span class="dot" :class="{ active: currentSlide === 3 }" @click="currentSlide = 3"></span>  

    </div>

    <!-- VISUALIZER SECTION -->
    <div class="visualizer">
      <h1>Line Coding Techniques Visualizer</h1>
      <div class="top-controls">
       <div class="input-group">
  <!-- Label container -->
  <label for="binaryData" class="binary-label">Enter binary data</label>
  <!-- Input and button container -->
  <div class="binary-input-group">
    <input v-model="binaryData" id="binaryData" placeholder="Enter binary data (e.g., 101010)" />
    <button class="ui-btn" @click="generateWaveform"><span>Generate</span></button>
  </div>
</div>

        <!-- Settings: Method, Bit Period, Voltage -->
        <div class="settings-group">
          <div class="input-item">
            <label for="method">Select Method:</label>
            <select v-model="method" id="method">
              <option value="NRZ">NRZ</option>
              <option value="RZ">RZ</option>
              <option value="Manchester">Manchester</option>
              <option value="AMI">AMI</option>
              <option value="Differential Manchester">Differential Manchester</option>
              <option value="PAM4">PAM‑4 (100Gbps)</option>  
            </select>
          </div>
          <div class="input-item">
            <label for="bitPeriod">
       {{ method === 'PAM4' ? 'Bit Period (ps)' : 'Bit Period 1-1000 (ms)' }}
      </label> 
           <input
       id="bitPeriod"
        v-model.number="bitPeriod"
        type="number"
        :min="method === 'PAM4' ? 9.4 : 0.1"
        :max="method === 'PAM4' ? 9.4 : 1000"
        :step="method === 'PAM4' ? 0 : 0.1"
        :disabled="disableBitPeriodInput"
      />
          </div>
          <div class="input-item">
<label for="voltage">
  {{ method === 'PAM4' ? 'Voltage (mV)' : 'Voltage 0.5-5 (V)' }}
</label>
            <input
    id="voltage"
    v-model.number="voltage"
    type="number"
    :min="method === 'PAM4' ? 5 : 0.5"
    :max="method === 'PAM4' ? 5 : 5"
    :step="method === 'PAM4' ? 0 : 0.5"
    :disabled="disableVoltageInput"
  />
        </div>
      </div>

      <!-- Teaching Information -->
      <div v-if="teaching">
        <h2>About {{ currentMethod }}</h2>
        <p>{{ teaching.description }}</p>
        <h3>Key Features:</h3>
        <ul>
          <li v-for="feature in teaching.keyFeatures" :key="feature">{{ feature }}</li>
          <li>
            <!-- Router links based on current method -->
            <router-link v-if="currentMethod === 'NRZ'" to="/nrz">Learn More about NRZ</router-link>
            <router-link v-else-if="currentMethod === 'RZ'" to="/rz">Learn More about RZ</router-link>
            <router-link v-else-if="currentMethod === 'AMI'" to="/ami">Learn More about AMI</router-link>
            <router-link v-else-if="currentMethod === 'Manchester'" to="/manchester">Learn More about Manchester</router-link>
            <router-link v-else-if="currentMethod === 'Differential Manchester'" to="/differential-manchester">Learn More about Differential Manchester</router-link>
            <router-link v-else-if="currentMethod === 'PAM4'" to="/PAM4">Learn More about PAM‑4 100Gbps</router-link>  

          </li>
        </ul>
      </div>

      <div v-if="bandwidth">
        <p><strong>Minimum Bandwidth required:</strong> {{ bandwidth }}</p>
      </div>

      <!-- Canvas for the waveform -->
      <div class="waveform-container">
        <canvas ref="canvas" height="400" width="900"></canvas>
      </div>
      <br />

      <!-- Download Buttons -->
      <div class="downloadBtn">
        <button class="button" v-if="waveform.length" @click="downloadData('csv')" type="button">
          <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" height="40" width="40" class="button__icon" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 11l5 5l5 -5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
          <span class="button__text">Download as CSV</span>
        </button>
        <button class="button" v-if="waveform.length" @click="downloadData('json')" type="button">
          <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" height="40" width="40" class="button__icon" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 11l5 5l5 -5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
          <span class="button__text">Download as JSON</span>
        </button>
        <button class="button" v-if="waveform.length" @click="downloadData('pdf')" type="button">
          <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" height="40" width="40" class="button__icon" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 11l5 5l5 -5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
          <span class="button__text">Download as PDF</span>
        </button>
      </div>

      <!-- PDF Page Size Popup -->
      <div v-if="showPdfDialog" class="pdf-dialog-overlay">
        <div class="pdf-dialog">
          <div class="mac-window-controls">
            <span class="mac-dot dot-red"></span>
            <span class="mac-dot dot-yellow"></span>
            <span class="mac-dot dot-green"></span>
          </div>
          <h3>Select PDF Page Size</h3>
          <p>Please choose one of the following:</p>
          <button @click="choosePdfSize('a4')">A4 </button>
          <button @click="choosePdfSize('a3')">A3 </button>
          <button @click="closePdfDialog">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Comparison Section -->
    <div class="comparison-section">
      <h2>Compare Two Line Coding Methods</h2>
      <div class="compare-selectors">
        <div>
          <label>Method 1 : </label>
          <select v-model="selectedMethod1">
            <option v-for="opt in compareOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
        <div>
          <label>Method 2 : </label>
          <select v-model="selectedMethod2">
            <option v-for="opt in compareOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>
      
      <table class="compare-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>{{ selectedMethod1 }}</th>
            <th>{{ selectedMethod2 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Polarity</td>
            <td>{{ compareData[selectedMethod1].polarity }}</td>
            <td>{{ compareData[selectedMethod2].polarity }}</td>
          </tr>
          <tr>
            <td>Brief Description</td>
            <td>{{ compareData[selectedMethod1].description }}</td>
            <td>{{ compareData[selectedMethod2].description }}</td>
          </tr>
          <tr>
            <td>Bandwidth</td>
            <td>{{ compareData[selectedMethod1].bandwidth }}</td>
            <td>{{ compareData[selectedMethod2].bandwidth }}</td>
          </tr>
          <tr>
            <td>Advantages</td>
            <td>
              <ul>
                <li v-for="(adv, idx) in compareData[selectedMethod1].advantages" :key="'adv1-' + idx">
                  {{ adv }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(adv, idx) in compareData[selectedMethod2].advantages" :key="'adv2-' + idx">
                  {{ adv }}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Disadvantages</td>
            <td>
              <ul>
                <li v-for="(dis, idx) in compareData[selectedMethod1].disadvantages" :key="'dis1-' + idx">
                  {{ dis }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(dis, idx) in compareData[selectedMethod2].disadvantages" :key="'dis2-' + idx">
                  {{ dis }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
  data() {
    return {
      currentSlide: 0,
      binaryData: "",
      method: "NRZ",
      currentMethod: "NRZ",
      bitPeriod: 1, // in ms
      voltage: 5,
      waveform: [],
      teaching: null,
      bandwidth: "",
      defaultBitPeriod: 1,   // 1 ms
    defaultVoltage:    5,  // 5 V
    disableBitPeriodInput: false,
    disableVoltageInput:   false, 
      // Teaching content from backend (replicated)
      teachingContent: {
        NRZ: {
          description:
            "Unipolar NRZ uses a single polarity: typically +V for bit=1 and 0V for bit=0. This simplicity can cause a DC component and poor synchronization if long runs of identical bits occur.",
          keyFeatures: [
            "Unipolar scheme (bit=1 → +V, bit=0 → 0V)",
            "Simple but can have DC component",
            "Poor noise immunity & baseline wander",
            "Easy to implement, low cost",
          ],
        },
        RZ: {
          description:
            "Polar RZ (returns to zero) within each bit. It uses +V or -V for half the bit and 0 for the other half, improving synchronization but requiring more bandwidth.",
          keyFeatures: [
            "Polar scheme (uses +V, -V, then 0 mid-bit)",
            "Better synchronization than NRZ",
            "Two signal changes per bit → higher bandwidth",
            "Rarely used today (often replaced by Manchester)",
          ],
        },
        Manchester: {
          description:
            "Manchester encoding is a polar scheme with a guaranteed transition in the middle of each bit. A negative-to-positive transition often represents a 1, and positive-to-negative a 0. It has no DC component but doubles the bandwidth.",
          keyFeatures: [
            "Polar scheme with mid-bit transition",
            "Self-clocking, no DC component",
            "Requires 2× the bandwidth of NRZ",
            "Used in Ethernet, other communication standards",
          ],
        },
        AMI: {
          description:
            "Bipolar AMI uses three levels: +V, 0, and -V. Binary 0 is 0V, while 1s alternate between +V and -V. This removes the DC component and helps with noise immunity.",
          keyFeatures: [
            "Bipolar scheme: +V, 0, -V",
            "No DC component (1s alternate polarity)",
            "Same base bandwidth as NRZ (1× bit rate)",
            "Complex receiver circuitry",
          ],
        },
        "Differential Manchester": {
          description:
            "Differential Manchester is a polar scheme where a mid-bit transition always occurs, and the presence or absence of a transition at the bit start encodes 0 or 1.",
          keyFeatures: [
            "Polar scheme with mid-bit transition always",
            "Start-of-bit transition indicates bit=0, no start transition indicates bit=1",
            "Self-clocking, no DC component, robust to polarity inversions",
            "Requires 2× the bandwidth of NRZ",
          ],
        },
        PAM4: {  
          description:  
            "PAM-4 100Gbps uses four amplitude levels per symbol (–5 mV, –1.5 mV, +1.5 mV, +5 mV) to encode 2 bits/symbol at 53.125 GBd to use it in IEEE 802.3df.",  
          keyFeatures: [  
            "Fixed bit period = 9.4 ps; symbol period = 18.8 ps",  
            "Bandwidth ≈ 0.5 × symbol rate → 26.6 GHz per lane",  
            "Doubles data rate vs NRZ at same baud rate",  
            "Adds SNR penalty (~9.5 dB) vs NRZ"  
          ],  
        },  
      },
      // Comparison data and options for comparison section:
      selectedMethod1: "NRZ",
      selectedMethod2: "RZ",
      compareOptions: [
        { value: "NRZ", label: "NRZ (Unipolar)" },
        { value: "RZ", label: "RZ (Polar)" },
        { value: "Manchester", label: "Manchester (Polar)" },
        { value: "Differential Manchester", label: "Diff Manchester (Polar)" },
        { value: "AMI", label: "AMI (Bipolar)" },
        { value: "PAM4", label: "PAM‑4 (Multilevel)" }  
      ],
      compareData: {
        NRZ: {
          polarity: "Unipolar",
          description: "Uses (+V) for bit=1, 0V for bit=0. Simple, but can have DC component.",
          bandwidth: "Low (~1× bit rate)",
          advantages: [
            "Very simple implementation",
            "Low cost, easy to detect",
          ],
          disadvantages: [
            "Poor noise immunity",
            "DC component and baseline wander if many 1s occur",
            "Sync issues with long runs of identical bits",
          ],
        },
        RZ: {
          polarity: "Polar",
          description: "Returns to zero mid-bit (+V or -V, then 0). Better sync but higher bandwidth usage.",
          bandwidth: "Medium (~2× bit rate)",
          advantages: [
            "Improved synchronization vs NRZ",
            "Zero-crossing helps clock recovery",
            "Low DC component",
          ],
          disadvantages: [
            "Requires more bandwidth",
            "Rarely used today",
          ],
        },
        Manchester: {
          polarity: "Polar",
          description: "Transition in the middle of each bit. Self-clocking, no DC component, but 2× bandwidth.",
          bandwidth: "High (~2× bit rate)",
          advantages: [
            "Self-clocking (transition each bit)",
            "No DC component",
            "Robust synchronization",
          ],
          disadvantages: [
            "Requires double the bandwidth of NRZ",
          ],
        },

        "Differential Manchester": {
          polarity: "Polar",
          description: "Always a mid-bit transition; presence/absence of transition at start indicates bit=0 or 1.",
          bandwidth: "High (~2× bit rate)",
          advantages: [
            "Self-clocking",
            "Robust to polarity inversion",
            "No DC component",
          ],
          disadvantages: [
            "More complex decoding",
            "Requires 2× bandwidth of NRZ",
          ],
        },
        AMI: {
          polarity: "Bipolar",
          description: "Three levels (+V, -V, 0). 0 = 0V, 1 alternates +V / -V. Eliminates DC offset, but more complex.",
          bandwidth: "Low (~1× bit rate), no DC",
          advantages: [
            "No DC component (alternating polarity)",
            "Error detection possible with bipolar violations",
          ],
          disadvantages: [
            "Complex receiver circuitry",
            "Sync can fail if consecutive zeros are too long",
          ],
        },
     
      PAM4: {  
         polarity: "Multilevel (4 levels)",  
          description:  
            "PAM-4 100Gbps (IEEE 802.3df) encodes 2 bits/symbol using ±5 mV & ±1.5 mV levels.",  
          bandwidth: "0.5 × (1/(2×9.4 ps)) ≈ 26.56 GHz",  
          advantages: [  
            "100 Gb/s per lane → 800 Gb/s with 8 lanes",  
            "Doubles data throughput at same baud rate",  
            "Supported by robust FEC (RS codes)"  
          ],  
          disadvantages: [  
            "≈9.5 dB SNR penalty vs NRZ",  
            "Complex transmitter/receiver design",  
            "Higher power & signal integrity demands"  
          ]  
        },  
      },
      showPdfDialog: false,
    };
  },
  mounted() {
    const saved = JSON.parse(localStorage.getItem("lineCodingData") || "{}");
    if (saved.binaryData) {
      this.binaryData = saved.binaryData;
      this.method = saved.method;
      this.bitPeriod = saved.bitPeriod;
      this.voltage = saved.voltage;
      this.generateWaveform();
    }
  },
  watch: {
    binaryData() {
      this.saveData();
    },method(newM) {  
      this.saveData();
    if (newM === "PAM4") {  
      this.bitPeriod=9.4
      this.voltage=5
      this.disableBitPeriodInput = true;  
        this.disableVoltageInput = true;  
      } else {  
        this.bitPeriod = this.defaultBitPeriod;  
        this.voltage = this.defaultVoltage
        this.disableBitPeriodInput = false;  
        this.disableVoltageInput = false;  
      } },
    bitPeriod() {
      this.saveData();
    },
    voltage() {
      this.saveData();
    },
  },
  methods: {
    computeSamplesPerBit() {
      let baseSamples = 100;
      if (this.binaryData.length > 10 && this.bitPeriod > 300) {
        baseSamples = 20;
        if (this.binaryData.length > 50 && this.bitPeriod > 300) {
          baseSamples = 10;
        }
      }
      return Math.round(baseSamples * this.bitPeriod);
    },
    generateLineCode(binaryData, method, bitPeriod, samplesPerBit) {
      const halfSamples = Math.round(samplesPerBit / 2);
      const data = binaryData.split("").map(Number);
      const waveform = [];
      if (method === "NRZ") {
        data.forEach((bit) => {
          const value = bit === 1 ? 1 : 0;
          for (let i = 0; i < samplesPerBit; i++) {
            waveform.push(value);
          }
        });
      } else if (method === "RZ") {
        data.forEach((bit) => {
          const value = bit === 1 ? 1 : -1;
          for (let i = 0; i < halfSamples; i++) {
            waveform.push(value);
          }
          for (let i = 0; i < samplesPerBit - halfSamples; i++) {
            waveform.push(0);
          }
        });
      } else if (method === "Manchester") {
        data.forEach((bit) => {
          const firstHalf = (bit === 1) ? -1 : +1;
          const secondHalf = (bit === 1) ? +1 : -1;
          for (let i = 0; i < halfSamples; i++) {
            waveform.push(firstHalf);
          }
          for (let i = 0; i < samplesPerBit - halfSamples; i++) {
            waveform.push(secondHalf);
          }
        });
      } else if (method === "AMI") {
        let lastMark = -1;
        data.forEach((bit) => {
          if (bit === 1) {
            lastMark *= -1;
            for (let i = 0; i < samplesPerBit; i++) {
              waveform.push(lastMark);
            }
          } else {
            for (let i = 0; i < samplesPerBit; i++) {
              waveform.push(0);
            }
          }
        });
      } else if (method === "Differential Manchester") {
        let currentLevel = 1;
        data.forEach((bit) => {
          if (bit === 1) {
            for (let i = 0; i < halfSamples; i++) {
              waveform.push(currentLevel);
            }
            currentLevel = -currentLevel;
            for (let i = 0; i < samplesPerBit - halfSamples; i++) {
              waveform.push(currentLevel);
            }
          } else {
            currentLevel = -currentLevel;
            for (let i = 0; i < halfSamples; i++) {
              waveform.push(currentLevel);
            }
            currentLevel = -currentLevel;
            for (let i = 0; i < samplesPerBit - halfSamples; i++) {
              waveform.push(currentLevel);
            }
          }
        });
      }
      else if (method === "PAM4") {
    // 1) pad to even length
    if (binaryData.length % 2 !== 0) {
      binaryData+="0";
    }
    // 2) symbol→mV mapping
    const levels = {
      "00": -5,
      "01": -1.5,
      "10":  1.5,
      "11":  5
    };
    // 3) how many raw samples per symbol?
    const samplesPerSymbol = Math.max(1, Math.round(samplesPerBit * 2));
    // 4) build waveform
    for (let i = 0; i < binaryData.length; i += 2) {
      const sym = binaryData[i] + binaryData[i+1];
      const mv  = levels[sym] ?? 0;
      // push that mV value samplesPerSymbol times
      for (let k = 0; k < samplesPerSymbol; k++) {
        waveform.push(mv);
      }
    }

  } 
 
      return waveform;  
    },
    calculateBandwidth(bitPeriod, method) {
      const bitRate = 1000 / bitPeriod;
      let bandwidthValue;
      if (method === "NRZ" || method === "AMI") {
        bandwidthValue = bitRate/2;
        return `${bandwidthValue.toFixed(2)} Hz (Low)`;
      } else if (method === "RZ") {
        bandwidthValue = bitRate * 2/2;
        return `${bandwidthValue.toFixed(2)} Hz `;
      } else if (method === "Manchester" || method === "Differential Manchester") {
        bandwidthValue = bitRate * 2/2;
        return `${bandwidthValue.toFixed(2)} Hz `;
      }else if (method === "PAM4") {  
        const symbolRate = 1 / (2 * (bitPeriod/1000000000000));  
        return `${(0.5 * symbolRate).toExponential(2)} Hz   ( 26.56 GHz )`;  
      }  
    },
    plusSlides(n) {
      const total = 4;
      this.currentSlide = (this.currentSlide + n + total) % total;
    },
    saveData() {
      const data = {
        binaryData: this.binaryData,
        method: this.method,
        bitPeriod: this.bitPeriod,
        voltage: this.voltage,
      };
      localStorage.setItem("lineCodingData", JSON.stringify(data));
    },
    async generateWaveform() {
      if (!/^[01]+$/.test(this.binaryData)) {
        alert("Binary data must contain only '0' and '1'. Please correct your input.");
        return;
      }
      if (this.method !== 'PAM4') {
      if (isNaN(this.bitPeriod) || this.bitPeriod < 1 || this.bitPeriod > 1000) {
        alert("Bit Period must be a number between 1 and 1000 (ms).");
        return;
      }
      if (isNaN(this.voltage) || this.voltage < 0.5 || this.voltage > 5) {
        alert("Voltage must be a number between 0.5 and 5 (V).");
        return;
      }
    }
      const samplesPerBit = this.computeSamplesPerBit();
      this.waveform = this.generateLineCode(this.binaryData, this.method, this.bitPeriod, samplesPerBit);
      this.bandwidth = this.calculateBandwidth(this.bitPeriod, this.method);
      // Update teaching content based on current method
      this.teaching = this.teachingContent[this.method] || { description: "", keyFeatures: [] };
      this.currentMethod = this.method;
      this.drawWaveform();
    },
    
   drawWaveform() {
    const canvas = this.$refs.canvas;
    const ctx    = canvas.getContext('2d');
    const isPAM4 = this.method === 'PAM4';

    //--- resize & margins ---
    const baseWidth = 900;
    const extraWidth = this.binaryData.length > 10
      ? (this.binaryData.length - 10) * 80
      : 0;
    canvas.width  = baseWidth + extraWidth;
    canvas.height = 400;
    canvas.style.width  = canvas.width  + 'px';
    canvas.style.height = canvas.height + 'px';

    const leftM   = 80;
    const rightM  = 50;
    const topM    = 20;
    const botM    = 50;
    const wDrawable = canvas.width  - leftM - rightM;
    const hDrawable = canvas.height - topM  - botM;
    const yCenter   = topM + hDrawable / 2;

    //--- units & scales ---
    const unitY = isPAM4 ? 'mV' : 'V';
    const unitX = isPAM4 ? 'ps' : 'ms';
    const durPerSymbol = isPAM4
      ? this.bitPeriod * 2
      : this.bitPeriod;
    const symbolCount = isPAM4
      ? Math.ceil(this.binaryData.length / 2)
      : this.binaryData.length;

    const pixelsPerUnit = 30;  // same vertical density for all
    const xScale = wDrawable / (symbolCount * durPerSymbol);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //--- horizontal grid & voltage ticks ---
ctx.font        = '12px Arial';
ctx.strokeStyle = '#ddd';
ctx.fillStyle   = '#000';

// choose different tick arrays for PAM‑4 vs everything else
const yTicks = isPAM4
  ? [-5,-3, -1.5, 0, +1.5,+3, +5]
  : // linear ticks from –voltage to +voltage
    Array.from(
      {length: 5},
      (_, i) => -this.voltage + (i * 2*this.voltage/4)
    );

yTicks.forEach(v => {
  const y = yCenter - v * pixelsPerUnit;
  // grid line
  ctx.beginPath();
  ctx.moveTo(leftM,       y);
  ctx.lineTo(canvas.width - rightM, y);
  ctx.stroke();
  // tick label
    const extraShift = isPAM4 ? 10 : 0;

  ctx.fillText(`${v.toFixed(2)} ${unitY}`, leftM - 40-extraShift, y + 4);
});

    //--- vertical grid & time ticks ---
    for (let i = 0; i <= symbolCount; i++) {
      const x = leftM + i * durPerSymbol * xScale;
      ctx.beginPath();
      ctx.moveTo(x, topM);
      ctx.lineTo(x, canvas.height - botM);
      ctx.stroke();
      ctx.fillText(
        `${(i * durPerSymbol).toFixed(2)} ${unitX}`,
        x - 15,
        canvas.height - botM + 18
      );
    }

    //--- axes lines ---
    ctx.strokeStyle = '#000';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(leftM, topM);
    ctx.lineTo(leftM, canvas.height - botM);
    ctx.lineTo(canvas.width - rightM, canvas.height - botM);
    ctx.stroke();

    //--- axis labels ---
    // Y
    ctx.save();
    ctx.translate(leftM - 60, topM + hDrawable / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.font      = '14px Arial';
    ctx.fillText(`Voltage (${unitY})`, 0, 0);
    ctx.restore();
    // X
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font      = '14px Arial';
    ctx.fillText(
      `Time (${unitX})`,
      leftM + wDrawable / 2,
      canvas.height - 10
    );
    ctx.restore();

    //--- waveform itself ---
    ctx.beginPath();
    // how many samples per symbol
    const samplesPerSymbol = this.waveform.length / symbolCount;
    this.waveform.forEach((level, idx) => {
      // time in your human units
      const t = (idx / samplesPerSymbol) * durPerSymbol;
      const x = leftM + t * xScale;
   
      const y = yCenter
        - (this.method === 'PAM4'
            ? level   // level already in mV
            : level * this.voltage
          )
        * pixelsPerUnit;

      idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#000';
    ctx.lineWidth   = 2;
    ctx.stroke();
  }

      
    ,
    openPdfDialog() {
      this.showPdfDialog = true;
    },
    closePdfDialog() {
      this.showPdfDialog = false;
    },
    choosePdfSize(pageSize) {
      this.showPdfDialog = false;
      this.generatePdf(pageSize);
    },
    generatePdf(pageSize) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: pageSize,
      });
      doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("LineLearning", 10, 15);
  doc.setFont("helvetica", "normal");
  if (this.logoData) { // assuming you have defined "logoData" in your component's data
    // Adjust the width and height of the logo (e.g., 30mm by 30mm)
    doc.addImage(this.logoData, "PNG", 160, 5, 30, 30);
  }
  doc.setFontSize(14);
  doc.text("Your Result", 10, 30);
      doc.setFontSize(12);
  let currentY = 40;
  doc.text(`Binary Data: ${this.binaryData}`, 10, currentY);
  currentY += 5;
  doc.text(`Method: ${this.method}`, 10, currentY);
  currentY += 5;
  if (this.method === 'PAM4') {
  // For PAM‑4 we treat bitPeriod as picoseconds and voltage as millivolts
  doc.text(`Bit Period: ${this.bitPeriod} ps`, 10, currentY);
  currentY += 5;
  doc.text(`Voltage: ${this.voltage} mV`, 10, currentY);
} else {
  // Everything else stays in ms and V
  doc.text(`Bit Period: ${this.bitPeriod} ms`, 10, currentY);
  currentY += 5;
  doc.text(`Voltage: ${this.voltage} V`, 10, currentY);
}
  currentY += 5;
  doc.text(`Bandwidth: ${this.bandwidth}`, 10, currentY);
  currentY += 5;
      const canvas = this.$refs.canvas;
      const imageData = canvas.toDataURL("image/png");
      let imgWidth, imgHeight;
      if (pageSize === "a4") {
        imgWidth = 270;
        imgHeight = 140;
      } else {
        imgWidth = 390;
        imgHeight = 180;
      }
      doc.addImage(imageData, "PNG", 10, currentY, imgWidth, imgHeight);
      doc.save("waveform.pdf");
    },
    downloadData(format) {
      const data = {
        binaryData: this.binaryData,
        method: this.method,
        bitPeriod: this.bitPeriod,
        voltage: this.voltage,
        waveform: this.waveform,
        bandwidth: this.bandwidth,
      };
      if (format === "csv") {
        const csvContent =
          `Binary Data,Method,Bit Period (ms),Voltage,Waveform,Bandwidth\n` +
          `${this.binaryData},${this.method},${this.bitPeriod},${this.voltage},"${this.waveform.join(",")}",${this.bandwidth}`;
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "waveform.csv";
        link.click();
      } else if (format === "json") {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "waveform.json";
        link.click();
      } else if (format === "pdf") {
        this.openPdfDialog();
      }
    },
  },
};
</script>

<style scoped>
.visualizer {
  text-align:left;
  margin: 20px;
  font-family: Arial, sans-serif;
}

canvas {
  border: 1px solid #ccc;
  
  margin-top: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-group {
  display:flex;
  flex-direction:column;
  align-items: baseline;
  justify-content:space-between
}
button{
  padding: 3px;
  width:fit-content;
  padding-left: 2px;
  padding-right: 2px;
}
.input-group input {
  width: 300px; /* Make binary input wider */
}
.input-group button {
  margin-top: 5px; /* Adds spacing between input and button */
}
.settings-group {
  display: flex;
  justify-content: space-between;
  gap: 15%;
}
.input-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1; /* Ensures equal spacing */
}
.input-item select,
.input-item input {
  width: 100%; /* Makes input fields stretch evenly */
}
.top-controls{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
  padding: 20px;

}
.binaryData{
  display: flex;
  flex-direction: row;
  gap: 20px;
}
#binaryData{
  width: 435px;
  height: 100%;
}
.downloadBtn{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
}
/* Target only inputs and selects when they are focused */
.input-item input:focus,
.input-item select:focus {
  outline: none;              /* Remove the default focus outline (blue glow) */
  border: 2px solid #4caf50;  /* Make the border 2px green */
  /* Optional: a subtle glow/shadow to emphasize focus */
  box-shadow: 0 0 2px 1px rgba(76, 175, 80, 0.5);
}
#binaryData:focus {
  outline: none;               /* Remove default blue outline */
  border: 2px solid #4caf50;   /* Green border */
  box-shadow: 0 0 2px 1px rgba(76, 175, 80, 0.5);
}
.waveform-container {
  width: 100%;
  overflow-x: auto; /* horizontal scroll if needed */
  margin-top: 20px;
  /* border: 1px solid #ccc;  */
  /* optional, just to see the container boundary */
}
.pdf-dialog-overlay {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5); /* semi-transparent overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.pdf-dialog {
  /* Make it look like your slideshow container */
  position: relative;
  background-color: #cbd9c7;  /* same pastel green as slideshow */
  border: 4px solid #fff;     /* white border */
  border-radius: 12px;
  padding: 2rem;
  width: 320px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  /* Center text & make it white inside */
  text-align: center;
  color: #000000; /* all text inside is white by default */
}
/* Mac window controls inside the pdf-dialog */
.pdf-dialog .mac-window-controls {
  position: absolute;
  top: 1rem;   /* offset from top */
  left: 1rem;  /* offset from left */
  display: flex;
  gap: 0.5rem; /* spacing between dots */
}
.pdf-dialog .mac-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
}
/* Mac dot colors: red, yellow, green */
.pdf-dialog .dot-red {
  background-color: #ff5f57;
}
.pdf-dialog .dot-yellow {
  background-color: #ffbd2e;
}
.pdf-dialog .dot-green {
  background-color: #28c940;
}
.pdf-dialog h3 {
  margin-top: 2rem;  /* so text doesn’t overlap dots */
  margin-bottom: 10px;
}
.pdf-dialog p {
  margin-bottom: 15px;
}
/* Style the A4 / A3 / Cancel buttons: 
   same green gradient as your "Generate" button */
.pdf-dialog button {
  background: linear-gradient(90deg, #4caf50 0%, #2e7d32 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}
/* Hover effect for those buttons */
.pdf-dialog button:hover {
  background: linear-gradient(90deg, #43a047 0%, #255d28 100%);
}
.slideshow-container {
  position: relative;
  width: 95%;       /* or 90%, or a fixed width like 800px */
  margin: 0 auto;   /* center in the page */
 background-color: #cbd9c7;
 border: 4px solid #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.mac-window-controls {
  position: absolute;
  top: 1rem;   /* move them 1rem from the top edge */
  left: 1rem;  /* move them 1rem from the left edge */
  display: flex;
  gap: 0.5rem; /* spacing between dots */
}

.mac-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  /* Just in case you want a border around them: */
  /* border: 1px solid rgba(0,0,0,0.1); */
}

/* The three colors: red, yellow, green (slightly vibrant) */
.dot-red {
  background-color: #ff5f57; /* typical mac close button color */
}

.dot-yellow {
  background-color: #ffbd2e; /* typical mac minimize color */
}

.dot-green {
  background-color: #28c940; /* typical mac maximize color */
}

/* Hide .mySlides by default */
.mySlides {
  display: none;
}
.slide-content {
  padding: 10px;
}

/* Next & previous arrows */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 16px;
  color: rgba(255, 255, 255, 0.882);
  font-weight: bold;
  font-size: 18px;
  user-select: none;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  margin-top: -22px;
}
.prev {
  left: 0;
  border-radius: 3px 0 0 3px;
}
/* Position next button to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add black background with some transparency */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Number text (1/3, 2/3, etc.) */
.numbertext {
  color: #000000;
  font-size: 12px;
  position: absolute;
  top: 0;
  right:0;
  padding: 8px 12px;
}

/* The dots/circles at the bottom */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fading animation for .fade class */
.fade {
  animation-name: fade;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@keyframes fade {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

.slide-content{
  padding: 30px;
}
.comparison-section {
  /* background-color: #e9ffe3; */
  margin-top: 80px;
  border: 2px solid #aaa;
  padding: 20px;
}

.compare-selectors {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 20px;
}
.compare-selectors select:focus {
  outline: none;
  border: 2px solid #4caf50; /* same green as your input focus */
  box-shadow: 0 0 2px 1px rgba(76, 175, 80, 0.5);
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  /* background-color: #cbd9c7; */
}
.compare-table th,
.compare-table td {
  border: 1px solid #ccc;
  padding: 8px;
  vertical-align: top;
  text-align: left;
}
.compare-table thead tr {
  background-color: #cbd9c7; /* header row background */
}


.slide-header {
  display: flex;        /* So the logo + heading appear side-by-side */
  align-items: center;  /* Vertically center them */
  gap: 10px;  
            /* Space between logo and text */
  /* margin-bottom: 10px;   */
}

.slide-logo {
  width: 200px;          /*  any small size  */
  height: auto;         /* Keep aspect ratio */
  object-fit: contain;  /* If you want to ensure no distortion */
}
.logoTitle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size:1.7rem;
}
 
/* generate btn */
/* 1) Button variables & default settings */
.ui-btn {
  --btn-default-bg:  linear-gradient(
    90deg,
    #ffff 0%,
    #cbd9c7 100%
  );;
  --btn-padding: 10px 15px;
  --btn-hover-bg: #45a049;
  --btn-transition: .3s;
  --btn-letter-spacing: .1rem;
  --btn-animation-duration: 1.2s;
  --btn-shadow-color: rgba(0, 0, 0, 0.137);
  --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
  --hover-btn-color: #175524;
  --default-btn-color: #000000;
  --font-size: 20px;
  --font-weight: 400;
  --font-family: Menlo,Roboto Mono,monospace;
}
/* 2) Base .ui-btn style */
.ui-btn {
  box-sizing: border-box;
  padding: var(--btn-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--default-btn-color);
  font: var(--font-weight) var(--font-size) var(--font-family);
  background: var(--btn-default-bg);
  border: none;
  cursor: pointer;
  transition: var(--btn-transition);
  overflow: hidden;
  box-shadow: var(--btn-shadow);
}
/* 3) Inner text (span) styling */
.ui-btn span {
  letter-spacing: var(--btn-letter-spacing);
  transition: var(--btn-transition);
  box-sizing: border-box;
  position: relative;
  background: inherit;
}
.ui-btn span::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  background: inherit;
}
/* 4) Hover effects */
.ui-btn:hover, .ui-btn:focus {
  background: var(--btn-hover-bg);
}
.ui-btn:hover span, .ui-btn:focus span {
  color: var(--hover-btn-color);
}
.ui-btn:hover span::before, .ui-btn:focus span::before {
  animation: chitchat linear both var(--btn-animation-duration);
}
/* 5) Keyframe animation */
@keyframes chitchat {
  0% { content: "#"; }
  5% { content: "."; }
  10% { content: "^{"; }
  15% { content: "-!"; }
  20% { content: "#$_"; }
  25% { content: "№:0"; }
  30% { content: "#{+."; }
  35% { content: "@}-?"; }
  40% { content: "?{4@%"; }
  60% { content: "?{%:%"; }
  80% { content: "{0%"; }
  100% { content: ""; }
}

/* download buttons */
.button {
  line-height: 1;
  /* same shape & layout as before */
  display: flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.7em 0.8em;
  padding-right: 1.2em;
  /* text color + font */
  color: #000000;
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  /* plain green gradient */
  background: linear-gradient(
    90deg,
    #ffff 0%,
    #cbd9c7 100%
  );
}
.button__icon {
  width: 1.3em;
  height: 1.3em;
}
.button:hover {
  background: linear-gradient(
    90deg,
    
    #43a047 0%,
    #2c6f30 100%
  );
}
.button:active {
  background: linear-gradient(
    90deg,
    #388e3c 0%,
    #1b5123 100%
  );
}
.binary-label {
  /* Desktop: keep it inline if needed; you can adjust as desired */
  margin-right: 10px;
}

.binary-input-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}




@media (max-width: 768px) {
   .ui-btn {
    font-size: 14px;         
    padding: 8px 12px;  
  }
  /* If you want the canvas narrower */
  .waveform-container canvas {
    width: 100% !important;    /* fill container’s width */
    height: auto !important;   /* keep aspect ratio */
  }
  .slideshow-container {
    width: 95%;
    padding: 0.8rem;
  }

  .slide-logo {
    width: 80px; /* reduce the logo size */
  }

  .logoTitle h2 {
    font-size: 1rem; /* smaller heading text */
  }

  .slide-content p {
    font-size: 0.8rem; /* smaller paragraph text */
  }

  .numbertext {
    font-size: 10px;
    padding: 4px 8px;
  }

  .prev, .next {
    top: 40%;
    font-size: 14px;
    padding: 10px;
  }
  .prev:hover,
  .next:hover,
  .prev:active,
  .next:active {
    background-color: transparent !important;
    transform: none !important;
  }


  /* Make the input narrower so the button can fit on the same line */
  .input-group input {
    width: 150px;  
  }

  #binaryData {
    width: 150px; 
  }
  .settings-group {
    flex-direction: column;
    gap: 10px;
  }
  .compare-table {
    font-size: 0.9rem;
    /* Or allow horizontal scroll if table is too wide */
    overflow-x: auto;
  }

  .comparison-section {
    margin-top: 40px;  /* less top margin on small screens */
    padding: 10px;
  }
  .mac-dot {
    width: 8px; /* reduce from 14px */
    height: 8px; /* reduce from 14px */
    margin-bottom: 4px;
  }
  .downloadBtn {
    /* Option 1: Keep the buttons in a row with extra spacing */
    flex-direction: row;
    justify-content: space-between;
    gap: 13px; 
  }
  
  .downloadBtn .button {
    font-size: 0.7rem;       /* smaller font size */
    padding: 4px 6px;        /* smaller padding */
    flex: 1;                 /* allow buttons to grow evenly */
    margin: 0 5px;           /* add a small horizontal margin */
  }
}

/* Even smaller screens (e.g., max-width: 480px) */
@media (max-width: 480px) {
  .slide-content {
    padding: 0.1rem;
  }
  .input-group input {
    width: 120px;
  }
  .compare-table {
    font-size: 0.8rem;
  }
  .ui-btn {
    font-size: 12px;      
    padding: 6px 10px;
  }
  .waveform-container canvas {
    width: 100% !important;
    height: auto !important;
  }
  .comparison-section{
    width: fit-content;
  }
}
</style>
