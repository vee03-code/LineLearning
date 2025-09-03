<template>
  <div class="mac-style-container">
    <!-- The 3 Mac-like window controls -->
    <div class="mac-window-controls">
      <span class="mac-dot dot-red"></span>
      <span class="mac-dot dot-yellow"></span>
      <span class="mac-dot dot-green"></span>
    </div>

    <!-- Logo in the top-right -->
    <img src="@/assets/logo.png" alt="LineLearning Logo" class="mac-logo" />

    <!-- Content -->
    <div class="pam-content">
      <h1>Learn More About PAM4‑100 Gbps in Ethernet</h1>

      <h2>Introduction to Multilevel Line Coding</h2>
      <p>
        A <strong>multilevel (M‑ary) line code</strong> encodes digital data by mapping each group of
        <code>log₂ M</code> input bits onto one of <code>M</code> distinct signal levels in the time domain waveform, transmitting <code>log₂M</code> bits per symbol instead of just
        1 bit as in binary schemes. Unlike binary (two‑level) line codes, multilevel schemes use
        three or more discrete voltage (or current) states to represent multiple bits at once,
        which reduces the required symbol rate for a given bit rate and improves spectral
        (bandwidth) efficiency.
      </p>

      <h2>PAM4 (Pulse Amplitude Modulation 4)</h2>
      <p>
        <strong>PAM4</strong> uses four distinct amplitude levels to encode 2 bits per symbol
        (<code>00, 01, 10, 11</code>), using four voltage or optical power levels, which effectively
        doubles the data rate relative to Non‑Return‑to‑Zero (NRZ) binary modulation.
      </p>

      <h3>Key Differences from Basic PAM4</h3>
      <table class="parameter-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>PAM4 100 Gbps</th>
            <th>Basic PAM4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bit Period</td>
            <td>Fixed by symbol rate ( 9.4 ps)</td>
            <td>Variable by application </td>
          </tr>
          <tr>
            <td>FEC</td>
            <td>Mandatory RS(544,514,15) with 4‑way interleaving</td>
            <td>Optional or mandatory vendor‑specific error correction</td>
          </tr>
          
          <tr>
            <td>PCS Processing</td>
            <td>Mandatory 64B/66B encoding, scrambling, alignment</td>
            <td>Not standardized</td>
          </tr>
        </tbody>
      </table>

      <h2>PAM4 in Fast Ethernet</h2>
      <p>
        PAM4 is pivotal in modern Ethernet standards (e.g., IEEE 802.3bs ) enabling faster
        data rates with fewer lanes compared to NRZ.
      </p>

      <h2>PAM4‑100 Gbps Overview</h2>
      <ul>
        <li><strong>Signaling rate</strong>: 53.125 GBd symbol rate → 106.25 Gb/s raw (2 bits/symbol)</li>
        <li><strong>Bit period</strong>: ≈ 9.4 ps per bit (1 / (53.125 GHz × 2))</li>
        <li><strong>Aggregate rates</strong>: 200 Gb/s (2 lanes), 400 Gb/s (4 lanes), 800 Gb/s (8 lanes)</li>
        <li>
          <strong>Voltage levels</strong>:
          <ul>
            <li>Copper: 00 = ‑5 mV, 01 = ‑1.5 mV, 10 = +1.5 mV, 11 = +5 mV</li>
            <li>Optical: expressed as power ratios (e.g., ‑3 dBm to +3 dBm)</li>
          </ul>
        </li>
      </ul>

      <h2>Signal to Noise Ratio (SNR) and PAM4 Challenges</h2>
      <p>
        The use of four signal levels in PAM4 reduces the minimum symbol distance compared to
        NRZ, leading to an intrinsic SNR degradation of roughly 9.5 dB for achieving the same BER.
      </p>
      <p>
        To combat this SNR penalty and achieve the strict BER ≤ 10<sup>‑13</sup> required by IEEE 802.3df,
        robust Forward Error Correction (FEC) is mandatory, typically implemented via Reed‑Solomon (RS)
        codes with 4‑way interleaving.
      </p>

      
      <h2>PAM4 100 Gbps: The Building Block of IEEE 802.3df</h2>
      <p>
       PAM4 at 100 Gb/s per lane is the modulation scheme that enables IEEE 802.3df to reach 800 Gb/s (8×100G) and 1.6 Tb/s (16×100G) Ethernet. By encoding 2 bits per symbol at 53.125 GBd, PAM4 supports very high data rates while still operating over electrical and optical channels designed for high-speed Ethernet.
      </p>
      <p>
        Before the signal is modulated into PAM4 in the PMD, the digital data stream undergoes a series of standardized PCS/PMA processing steps to ensure reliable transmission:
      </p>
      <ol>
        <li><strong>64B/66B Encoding</strong>: Adds synchronization headers to maintain bit alignment and DC balance with overhead.</li>
        <li><strong>256B/257B Transcoding</strong>: Converts data into a more efficient format to reduce overhead for long‑haul optical links.</li>
        <li><strong>Scrambling</strong>: Applies polynomial‑based data randomization to avoid repetitive patterns and assist clock recovery.</li>
        <li><strong>Alignment Marker Insertion</strong>: Inserts markers to help the receiver align the data and prevent errors.</li>
        <li><strong>Forward Error Correction (FEC)</strong>: Uses RS codes to correct up to 15 symbol errors per codeword, with 4‑way interleaving to spread burst errors and improve SNR by ≈ 1 dB.</li>
        <li><strong>4:1 Bit Multiplexing</strong>: Distributes bits across lanes, reducing burst error impact and balancing load.</li>
      </ol>

      <h2>Implementation in IEEE 802.3df for 800 Gbps Ethernet</h2>
      <p>
        The 802.3df standard uses PAM4 100 Gbps lanes aggregated for 200 Gb/s, 400 Gb/s, and 800 Gb/s Ethernet:
      </p>
      <ul>
        <li>800 Gbps is achieved by aggregating eight 100 Gbps PAM4 lanes.</li>
        <li>Each lane uses a symbol rate of 53.125 GBd, encoding two bits per symbol.</li>
        <li>Robust PCS architecture manages parallelization, FEC, interleaving, and lane alignment.</li>
        <li>Physical media-dependent voltage levels and optical power ensure compatibility with copper and fiber.</li>
      </ul>

      <h2>Summary of Technical Parameters</h2>
      <table class="parameter-table">
        <thead>
          <tr><th>Parameter</th><th>Value / Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Symbol Rate</td><td>53.125 GBd per lane</td></tr>
          <tr><td>Bits per Symbol</td><td>2 (4 levels)</td></tr>
          <tr><td>Raw Data Rate</td><td>106.25 Gb/s per lane</td></tr>
          <tr><td>Bit Period</td><td>≈ 9.4 ps</td></tr>
          <tr><td>Voltage Levels (Copper)</td><td>‑5 mV, ‑1.5 mV, +1.5 mV, +5 mV</td></tr>
          <tr><td>Optical Power Levels</td><td>≈ ‑3 dBm to +3 dBm</td></tr>
          <tr><td>SNR Penalty</td><td>≈ 9.5 dB vs. NRZ</td></tr>
          <tr><td>BER Target</td><td>≤ 10<sup>‑13</sup></td></tr>
          <tr><td>FEC</td><td>RS(544,514,15) with 4‑way interleaving</td></tr>
          <tr><td>PCS Encoding</td><td>64B/66B, 256B/257B, Scrambling, Alignment Markers</td></tr>
          <tr><td>Lane Configuration</td><td>2 lanes (200 G), 4 lanes (400 G), 8 lanes (800 G)</td></tr>
        </tbody>
      </table>

      <h2>Real-World Applications of IEEE 802.3df</h2>
      <p>
        Building on the original IEEE Std 802.3 standard first published in 1985, the IEEE Std 802.3df
        project is specifically engineered to address the needs of emerging hyperscale data centers
        and Large Language Model (LLM) machine-learning (ML) applications, promising significant
        improvements in performance and scalability.
      </p>

      <router-link to="/" class="go-home-link">Go Back</router-link>

      <!-- Consider extracting references to an external JSON or Markdown for maintainability -->
      <h2>References</h2>
      <ol class="references">
        <li>IEEE 802.3df Task Force (2024). Standard for Ethernet – Amendment: Physical Layer Specifications and Management Parameters for 200 Gb/s, 400 Gb/s, and 800 Gb/s Operation and 100 Gb/s per Lane Operation.</li>
        <li>IEEE 802.3 (2022). Ethernet Standards and Protocols Overview.</li>
        <li>Traverso, M., Mazzini, M., Gupta, A., & Palkert, T. (2016). Experimental results on single wavelength 100Gbps PAM4 modulation, IEEE 802.3cd. [PDF]</li>
        <li>Forghieri, F., Tkach, R. W., & Chraplyvy, A. R. (1997). Fiber Nonlinearities and Their Impact on Transmission Systems, Optical Fiber Telecommunications IIIA, Academic Press.</li>
        <li>IEEE P802.3bs Task Force (2017). 400 Gigabit Ethernet Standard.</li>
        <li>IEEE P802.3df Task Force (2022). Standardization of 800 Gbit/s and 1.6 Tbit/s Ethernet.</li>
        <li>IEEE 802.3df Working Draft and Comment database (2023). PAM-4 with Standard-Specific Enhancements.</li>
        <li><a href="https://grouper.ieee.org/groups/802/3/B400G/email/pdfgmTVD_tlb3.pdf">IEEE 400G PMD email archive</a></li>
        <li><a href="https://assets.ctfassets.net/wcxs9ap8i19s/1nYPQQP4xvguDKLz8ssiIb/6c703b961d303df1e5107be2062d72e2/FEC-for-Ethernet_Whitepaper.pdf">FEC for Ethernet Whitepaper</a></li>
        <li><a href="https://www.electronicdesign.com/technologies/communications/wired/ethernet/article/55267242/ethernet-alliance-how-emerging-ethernet-standards-will-propel-hyperscale-data-centers-and-ml-apps">Ethernet Alliance Hyperscale & ML Applications</a></li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pam4Page'
}
</script>

<style scoped>
.mac-style-container {
  position: relative;
  background-color: #cbd9c7;
  border: 10px solid #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  width: 90%;
  margin: 2rem auto;
}

.mac-window-controls {
  position: absolute;
  top: 1rem; left: 1rem;
  display: flex; gap: 0.5rem;
}

.mac-dot { width:14px; height:14px; border-radius:50%; display:inline-block; }
.dot-red { background:#ff5f57; }
.dot-yellow { background:#ffbd2e; }
.dot-green { background:#28c940; }

.mac-logo {
  position: absolute;
  top: 1.2rem; right: 1.2rem;
  width: 300px; height: auto; object-fit: contain;
}

.pam-content {
  margin-top: 3rem;
  line-height: 1.5;
}

.pam-content h1,
.pam-content h2 { margin-top: 1.5rem; }

.parameter-table {
  width: 100%; border-collapse: collapse; margin: 1rem 0;
}
.parameter-table th,
.parameter-table td { border: 1px solid #aaa; padding: 0.5rem; text-align: left; }

.references { margin-left: 1rem; font-size: 0.9rem; }

@media (max-width: 850px) {
  .mac-logo { width: 80px; top: 0.5rem; right: 0.5rem; }
  .pam-content { font-size: 0.9rem; }
}
</style>
