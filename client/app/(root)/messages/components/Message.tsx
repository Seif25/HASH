import moment from "moment";

interface MessageProps {
  position: string;
  color: string;
  message: string;
  timestamp: Date;
  length: number;
  index: number;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function Message({
  position,
  color,
  message,
  timestamp,
  length,
  index,
  messagesEndRef,
}: MessageProps) {
  return (
    <div className={`flex flex-col justify-center w-full ${position}`}>
      <p className={`rounded-2xl text-accent1 w-auto max-w-80 p-2 ${color}`}>
        {message}
      </p>
      <span className="text-[10px] font-light text-accent1/50 px-2">
        {moment(timestamp).isSame(moment(), "day")
          ? moment(timestamp).format("hh:mm A")
          : moment(timestamp).format("ddd - hh:mm A")}
      </span>
      {length - 1 === index && <div ref={messagesEndRef} />}
    </div>
  );
}
