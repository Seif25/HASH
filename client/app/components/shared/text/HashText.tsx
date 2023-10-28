import HashTag from "./HashTag";
import Mention from "./Mention";

export default function HashText({ text }: { text: string }) {
  const nextLines = text.split(/(?=\n)/);
  let words: string[] = [];
  nextLines.forEach((line) => {
    words = [...words, ...line.split(" ")];
  });

  return (
    <div className="whitespace-pre-wrap">
      {words.map((word) => {
        if (word.startsWith("#")) {
          return <HashTag key={word}>{word.trim()}</HashTag>;
        } else if (word.startsWith("@")) {
          return <Mention key={word}>{word}</Mention>;
        } else {
          return word + " ";
        }
      })}
    </div>
  );
}
