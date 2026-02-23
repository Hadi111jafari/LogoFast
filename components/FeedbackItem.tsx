import Image from 'next/image';

function FeedbackItem({ image, feedback }: { image: string; feedback: string }) {
  return (
    <div className="flex items-center py-5 gap-3">
      <Image
        src={image}
        width={50}
        height={50}
        alt="user image"
        className="rounded-full"
      />
      <p>{feedback}</p>
    </div>
  );
}

export default FeedbackItem;
