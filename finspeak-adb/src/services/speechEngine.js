// Speech Engine Service for FinSpeak ADB
// Handles Web Speech API (STT & TTS), Web Audio API Waveform Visualizer, and Mic Audio Recording/Playback

export class SpeechEngine {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis || null;
    this.audioContext = null;
    this.analyser = null;
    this.mediaStream = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.latestAudioBlob = null;
    this.latestAudioUrl = null;
    this.isListening = false;
    this.onTranscriptUpdate = null;
    this.onError = null;

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        if (this.onTranscriptUpdate) {
          this.onTranscriptUpdate(currentTranscript.trim(), event.results[event.results.length - 1].isFinal);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (this.onError) this.onError(event.error);
      };
    } else {
      console.log('Web SpeechRecognition API not supported natively in this browser window. Simulation mode available.');
    }
  }

  async startListening(onUpdate, onError) {
    this.onTranscriptUpdate = onUpdate;
    this.onError = onError;
    this.isListening = true;
    this.audioChunks = [];

    // Start Web Audio API Analyzer & MediaRecorder for Live Audio Playback
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);

        // Record audio stream
        if (window.MediaRecorder) {
          this.mediaRecorder = new MediaRecorder(this.mediaStream);
          this.mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              this.audioChunks.push(e.data);
            }
          };
          this.mediaRecorder.start(250);
        }
      }
    } catch (err) {
      console.warn('Microphone access denied or unavailable. Visualizer running in simulated audio mode.', err);
    }

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Recognition start caught:', e);
      }
    }
  }

  stopListening(onRecordedCallback) {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Recognition stop error:', e);
      }
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        if (this.audioChunks.length > 0) {
          this.latestAudioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.latestAudioUrl = URL.createObjectURL(this.latestAudioBlob);
          if (onRecordedCallback) onRecordedCallback(this.latestAudioUrl, this.latestAudioBlob);
        }
      };
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  speakText(text, voiceSetting = { pitch: 1.0, rate: 1.0 }, onEnd = null) {
    if (!this.synthesis) {
      console.warn('Speech Synthesis not supported');
      if (onEnd) setTimeout(onEnd, 2000);
      return;
    }

    // Cancel active speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = voiceSetting.pitch || 1.0;
    utterance.rate = voiceSetting.rate || 1.0;
    utterance.lang = 'en-GB'; // Preferred executive British/English voice accent

    const voices = this.synthesis.getVoices();
    if (voices.length > 0) {
      const prefVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('UK') || v.name.includes('Male') || v.name.includes('Google')));
      if (prefVoice) utterance.voice = prefVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Utterance error:', e);
      if (onEnd) onEnd();
    };

    this.synthesis.speak(utterance);
  }

  getAudioFrequencyData() {
    if (!this.analyser) return null;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const speechEngineSingleton = new SpeechEngine();
