import { useEffect, useState } from "react";
import { toast } from "sonner";

export function usePronounceWord() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length === 0) {
        toast.error("No voices available. Try refreshing the page.");
      }
    };

    // Ensure voices are loaded
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const pronounceWord = (word: string) => {
    const japaneseVoice = voices.find((voice) => voice.lang === "ja-JP");
    if (japaneseVoice) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = japaneseVoice;
      utterance.lang = "ja-JP"; // Japanese
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Japanese voice is not available.");
    }
  };

  return { pronounceWord };
}
