import Link from "next/link";

interface FormattedWordProps {
  text: string;
  index: number;
}

function FormattedWord({ text, index }: FormattedWordProps) {
  const word = text.trim();
  if (word.startsWith("#")) {
    return (
      <Link href={`/posts/${word.substring(1)}`} className="z-20">
        <span>
          {index > 0 && <span>&nbsp;</span>}
          <span
            key={index}
            className="text-primary hover:underline text-sm cursor-pointer italic font-light"
          >
            {word}
          </span>
        </span>
      </Link>
    );
  } else if (word.startsWith("@")) {
    return (
      <span>
        {index > 0 && <span>&nbsp;</span>}
        <Link href={`/profile/${word.substring(1)}`} className="z-20">
          <span
            key={index}
            className="text-primary hover:underline text-sm cursor-pointer"
          >
            {word}
          </span>
        </Link>
      </span>
    );
  } else if (word.startsWith("http://") || word.startsWith("https://")) {
    const truncatedUrl = word.replace(/^(https?:\/\/)/, "");
    return (
      <span className="z-20">
        {index > 0 && <span>&nbsp;</span>}
        <a
          key={index}
          href={word}
          className="text-primary underline hover:font-extrabold text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          {index > 0 && ` ${truncatedUrl}`}
        </a>
      </span>
    );
  } else {
    return (
      <span key={index} className="text-sm text-white">
        {index > 0 && <span>&nbsp;</span>}
        {word}
      </span>
    );
  }
}

export default FormattedWord;
