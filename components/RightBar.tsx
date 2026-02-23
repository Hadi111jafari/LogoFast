import Link from 'next/link';
import FeedbackItem from './FeedbackItem';

const feedbacks = [
  {
    id: 1,
    image: '/download.jpeg',
    feedback:
      "First sale is definitely special, especially when it's your first self coded web-app.",
  },
  {
    id: 2,
    image: '/download.jpeg',
    feedback: "I've never finished Udemy courses... Marc cuts the BS",
  },
  {
    id: 3,
    image: '/download.jpeg',
    feedback: 'I built my second app in a week',
  },
  {
    id: 4,
    image: '/download.jpeg',
    feedback:
      "First sale is definitely special, especially when it's your first self coded web-app.",
  },
  {
    id: 5,
    image: '/download.jpeg',
    feedback: "I've never finished Udemy courses... Marc cuts the BS",
  },
  {
    id: 6,
    image: '/download.jpeg',
    feedback: 'I built my second app in a week',
  },
];

const RightBar = () => {
  return (
    <div className="h-full min-h-0 flex flex-col overflow-hidden rounded-md border border-border p-5 lg:rounded-none lg:border-0">
      <div className="shrink-0">
        <h1 className="pb-3 text-lg font-bold">
          Learn to code <br /> in weeks, not years
        </h1>
        <ul className="list-disc pl-5 space-y-1">
          <li>12 hours of video tutorials</li>
          <li>Build an online business</li>
          <li>1,270+ happy students</li>
        </ul>

        <Link href="#">
          <div className="mt-5 flex items-center justify-center gap-2 rounded-full border-2 border-black bg-green-400 px-8 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span className="leading-none">Get CodeFast</span>
          </div>
        </Link>
      </div>
      <div className="no-scrollbar mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {feedbacks.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            image={feedback.image}
            feedback={feedback.feedback}
          />
        ))}
      </div>
    </div>
  );
};

export default RightBar;
