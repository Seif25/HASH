import Link from "next/link";

interface FormattedWordProps {
  text: string;
  index: number;
}

function FormattedWord({ text, index }: FormattedWordProps) {
  const word = text.trim();
  if (word.startsWith("#")) {
    return (
      <span>
        {index > 0 && <span>&nbsp;</span>}
        <span
          key={index}
          className="text-[#CBCCFF] hover:underline text-base-semibold cursor-pointer italic font-light"
        >
          {word}
        </span>
      </span>
    );
  } else if (word.startsWith("@")) {
    return (
      <span>
        {index > 0 && <span>&nbsp;</span>}
        <Link href={`/profile/${word.substring(1)}`}>
          <span
            key={index}
            className="text-[#CBCCFF] hover:underline text-base-semibold cursor-pointer"
          >
            {word}
          </span>
        </Link>
      </span>
    );
  } else if (word.startsWith("http://") || word.startsWith("https://")) {
    const truncatedUrl = word.replace(/^(https?:\/\/)/, "");
    return (
      <span>
        {index > 0 && <span>&nbsp;</span>}
        <a
          key={index}
          href={word}
          className="text-[#CBCCFF] underline hover:font-extrabold text-base-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          {index > 0 && ` ${truncatedUrl}`}
        </a>
      </span>
    );
  } else {
    return (
      <span key={index} className="text-base-semibold text-light-1">
        {index > 0 && <span>&nbsp;</span>}
        {word}
      </span>
    );
  }
}

export default FormattedWord;
