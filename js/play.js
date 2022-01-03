const C_down = {
  keyCode: 65,
  frequency: 261.63,
  noteName: "C"
}

const C_sharp = {
  keyCode: 87,
  frequency: 277.18,
  noteName: "C_sharp"
}

const D = {
  keyCode: 83,
  frequency: 293.66,
  noteName: "D"
}

const D_sharp = {
  keyCode: 69,
  frequency: 311.13,
  noteName: "D_sharp"
}

const E = {
  keyCode: 68,
  frequency: 329.63,
  noteName: "E"
}

const F = {
  keyCode: 70,
  frequency: 349.23,
  noteName: "F"
}

const F_sharp = {
  keyCode: 84,
  frequency: 369.99,
  noteName: "F_sharp"
}

const G = {
  keyCode: 71,
  frequency: 392.00,
  noteName: "G"
}

const G_sharp = {
  keyCode: 89,
  frequency: 415.30,
  noteName: "G_sharp"
}

const A = {
  keyCode: 72,
  frequency: 440,
  noteName: "A"
}

const A_sharp = {
  keyCode: 85,
  frequency: 466.16,
  noteName: "A_sharp"
}

const B = {
  keyCode: 74,
  frequency: 493.88,
  noteName: "B"
}

const C_up = {
  keyCode: 75,
  frequency: 261.63 * 2,
  noteName: "C"
}


const PI = 3.1415926535;

var phase_1 = 0;

const vibrato_rate = 0.00;

var audioContext = new AudioContext();
var bufferSource = audioContext.createBufferSource();
var scriptProcessor = audioContext.createScriptProcessor(4096, 0, 1);
scriptProcessor.onaudioprocess = function(audioProcessingEvent)
{
  getBuffer(
    audioProcessingEvent.outputBuffer, scriptProcessor.wave, scriptProcessor.note
    );
}

/*
function handleKeyDownEvent(event) {
  console.log(event.keyCode);
}
*/

function getBuffer(outputBuffer, wave, note)
{
  // console.log(outputBuffer.length)
  console.log(note.frequency)

  var delta_1 = note["frequency"] * 2 * PI / outputBuffer.sampleRate;
  var outputData = outputBuffer.getChannelData(0);

  if (wave == "triangle"){
    for (var i = 0; i < outputBuffer.length; i++)
      {
        tone_1 = (Math.acos(Math.cos(phase_1)) -3.5);

        phase_1 += delta_1; 

        outputData[i] = 0.2 * tone_1;

      }
    }

  if (wave == "white noise"){
    for (var i = 0; i < outputBuffer.length; i++)
      {
        tone_1 = Math.random();
  
        phase_1 += delta_1; 
  
        outputData[i] = 0.2 * tone_1;
  
      }
    }

  if (wave == "sine"){
    for (var i = 0; i < outputBuffer.length; i++)
      {
        tone_1 = Math.cos(phase_1)
  
        phase_1 += delta_1; 
  
        outputData[i] = 0.2 * tone_1;
  
      }
    }

    if (wave == "square"){
      for (var i = 0; i < outputBuffer.length; i++)
        {
          tone_1 = (Math.ceil(Math.cos(phase_1)) -0.5);
  
          phase_1 += delta_1; 
  
          outputData[i] = 0.2 * tone_1;
  
        }
      }
    
  
}

function assignTheNote(keycode){
  console.log(keycode);

  switch(keycode){    
    case 75:
      return C_up;
      break;
    case 74:
      return B;
      break;
    case 65:
      return C_down;
      break;
    case 72:
      return A;
      break;
    case 83:
      return D;
      break;
    case 68:
      return E;
      break;
    case 70:
      return F;
      break;
    case 71:
      return G;
      break;
    case 87:
      return C_sharp;
      break;
    case 69:
      return D_sharp;
      break;
    case 84:
      return F_sharp;
      break;
    case 89:
      return G_sharp;
      break;
    case 85:
      return A_sharp;
      break;  
  }

}

function play(wave, keycode){

  scriptProcessor.wave = wave;
  scriptProcessor.note = assignTheNote(keycode);
  if (!scriptProcessor.note){return};
  //console.log(wave);
  // console.log(scriptProcessor.note);
  bufferSource.connect(scriptProcessor);  
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();

}


function stop(wave, keycode){

  //scriptProcessor.wave = wave;
  // scriptProcessor.note = note;
  //console.log(wave);
  //console.log(keycode);
  bufferSource.disconnect(scriptProcessor);  
  scriptProcessor.disconnect(audioContext.destination);
  bufferSource.stop();

}
