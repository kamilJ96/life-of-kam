export const SentimentScripts = (one, two) => {
  let goodSentence = "first sentence", badSentence = "second sentence";
  if (two === one) return "Wow, you managed to write two sentences that had the same sentiment!"
  
  if (two > one) {
    goodSentence = "second sentence";
    badSentence = "first sentence";
  }

  let diff = Math.abs(one - two);
  if (diff >= 0.6) return `That was simple, your ${goodSentence} is A LOT nicer than your ${badSentence}! Dang turns out you did hurt my feelings after all.`;
  else if (diff >= 0.3) return `Hmm alright, I see that your ${goodSentence} is somewhat nicer than your ${badSentence} - not too bad!`;
  else if (diff >= 0.1) return `Upon careful deliberation, I think your ${goodSentence} is (only just) a little nicer than your ${badSentence}. That's quite mild overall!`;
  else return `Damn those two sentences are quite similar! I hazard a guess that your ${goodSentence} is overall a little nicer than your ${badSentence}`;
}