// Your script here.
 function populateVoices() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        
        if (voices.length === 0) {
            const option = document.createElement('option');
            option.textContent = 'No voices available';
            voiceSelect.appendChild(option);
            return;
        }
        
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-voice', voice.name);
            voiceSelect.appendChild(option);
        });
    }
    
    // Initial population of voices
    populateVoices();
    
    // Some browsers load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }
    
    // Update rate display value
    rateInput.addEventListener('input', function() {
        rateValue.textContent = this.value;
    });
    
    // Update pitch display value
    pitchInput.addEventListener('input', function() {
        pitchValue.textContent = this.value;
    });
    
    // Speak button handler
    speakButton.addEventListener('click', function() {
        if (!textInput.value.trim()) {
            alert('Please enter some text first');
            return;
        }
        
        if (synth.speaking) {
            synth.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(textInput.value);
        
        // Set selected voice
        const selectedVoice = voices.find(voice => 
            voice.name === voiceSelect.selectedOptions[0].getAttribute('data-voice')
        );
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
        // Set rate and pitch
        utterance.rate = parseFloat(rateInput.value);
        utterance.pitch = parseFloat(pitchInput.value);
        
        synth.speak(utterance);
    });
    
    // Stop button handler
    stopButton.addEventListener('click', function() {
        if (synth.speaking) {
            synth.cancel();
        }
    });