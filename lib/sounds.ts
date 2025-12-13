export const playSound = (soundType: "wordFound" | "puzzleComplete") => {
  if (typeof window === "undefined") return;

  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (soundType === "wordFound") {
    // Happy "ding" sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1200,
      audioContext.currentTime + 0.1
    );
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (soundType === "puzzleComplete") {
    // Victory fanfare
    const times = [0, 0.15, 0.3];
    const frequencies = [523, 659, 784]; // C, E, G (major chord)

    times.forEach((time, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.setValueAtTime(
        frequencies[index],
        audioContext.currentTime + time
      );
      gain.gain.setValueAtTime(0.2, audioContext.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + time + 0.3
      );

      osc.start(audioContext.currentTime + time);
      osc.stop(audioContext.currentTime + time + 0.3);
    });
  }
};
