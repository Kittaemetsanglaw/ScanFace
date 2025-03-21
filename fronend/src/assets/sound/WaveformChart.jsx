// WaveformChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';

const WaveformChart = ({ audioFile }) => {
  const [audioData, setAudioData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const loadAudioData = async () => {
      try {
        const response = await fetch(audioFile);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = audioRef.current || new (window.AudioContext || window.webkitAudioContext)();
        audioRef.current = audioContext;


        

        await audioContext.resume(); // resume AudioContext
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const channelData = audioBuffer.getChannelData(0);
        setAudioData(Array.from(channelData));
      } catch (error) {
        console.error("Error loading audio data:", error);
      }
    };

    loadAudioData();
  }, [audioFile]);

  const chartData = {
    labels: audioData.map((_, index) => index),
    datasets: [
      {
        label: 'Waveform',
        data: audioData,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Audio Waveform</h2>
      <Line data={chartData} ref={chartRef} />
    </div>
  );
};

export default WaveformChart;