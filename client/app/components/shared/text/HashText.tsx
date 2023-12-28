import HashTag from "./HashTag";
import Mention from "./Mention";
import URL from "./URL";

export default function HashText({ text }: { text: string }) {
  const nextLines = text.split(/(?=\n)/);
  let words: string[] = [];
  nextLines.forEach((line) => {
    words = [...words, ...line.split(" ")];
  });

  return (
    <div className="whitespace-pre-wrap text-pretty">
      {words.map((word) => {
        if (word.trim().startsWith("#")) {
          return <HashTag key={word}>{word}</HashTag>;
        } else if (word.trim().startsWith("@")) {
          return <Mention key={word}>{word}</Mention>;
        } else if (
          word.trim().startsWith("http") ||
          word.trim().startsWith("https")
        ) {
          return <URL key={word}>{word}</URL>;
        } else {
          return word + " ";
        }
      })}
    </div>
  );
}
