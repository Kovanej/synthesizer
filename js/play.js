const PI = 3.1415926535;

var phase_1 = 0;

const vibrato_rate = 0.00;

var audioContext = new AudioContext();
var bufferSource = audioContext.createBufferSource();
var scriptProcessor = audioContext.createScriptProcessor(4096, 0, 1);
scriptProcessor.onaudioprocess = function(audioProcessingEvent)
{
  getBuffer(audioProcessingEvent.outputBuffer, scriptProcessor.wave);
}

function getBuffer(outputBuffer, wave)
{

  var delta_1 = 440.0 * 2 * PI / outputBuffer.sampleRate;
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

function playTriangle()
{
  scriptProcessor.wave = "triangle";
  bufferSource.connect(scriptProcessor);  
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();
}

function playSine(){
  scriptProcessor.wave = "sine";
  bufferSource.connect(scriptProcessor);  
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();
}

function playSquare(){
  scriptProcessor.wave = "square";
  bufferSource.connect(scriptProcessor);  
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();
}

function playWhiteNoise(){
  scriptProcessor.wave = "white noise";
  bufferSource.connect(scriptProcessor);  
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();
}