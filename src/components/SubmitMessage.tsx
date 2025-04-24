interface SubmitMessageProps {
   textColor: string;
   messageText: string;
}

export function SubmitMessage({ textColor, messageText }: SubmitMessageProps) {
   return (
      <div className='w-full max-w-3xl bg-orange-100 px-6 py-2 text-center'>
         <p className={`${textColor} text-md font-medium px-1`}>{messageText}</p>
      </div>
   );
}
