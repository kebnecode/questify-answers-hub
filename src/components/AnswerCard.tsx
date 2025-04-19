
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AnswerCardProps {
  id: string;
  content: string;
  votes: number;
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  createdAt: Date;
  isAccepted?: boolean;
  isQuestionAuthor?: boolean;
}

const AnswerCard = ({
  id,
  content,
  votes,
  author,
  createdAt,
  isAccepted = false,
  isQuestionAuthor = false,
}: AnswerCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (direction: 'up' | 'down') => {
    // This will be connected to Supabase later
    if (userVote === direction) {
      setVoteCount(direction === 'up' ? voteCount - 1 : voteCount + 1);
      setUserVote(null);
    } else if (userVote) {
      setVoteCount(direction === 'up' ? voteCount + 2 : voteCount - 2);
      setUserVote(direction);
    } else {
      setVoteCount(direction === 'up' ? voteCount + 1 : voteCount - 1);
      setUserVote(direction);
    }
  };

  const handleAccept = () => {
    // This will be connected to Supabase later
    console.log('Accept answer:', id);
  };

  return (
    <div id={`answer-${id}`} className="py-6">
      <div className="flex">
        {/* Voting */}
        <div className="flex flex-col items-center mr-6">
          <button
            onClick={() => handleVote('up')}
            className={`p-2 rounded-full ${
              userVote === 'up' ? 'bg-brand-orange text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Upvote"
          >
            <ChevronUp size={24} />
          </button>
          <span className={`text-xl font-bold my-2 ${voteCount > 0 ? 'text-gray-800' : voteCount < 0 ? 'text-red-500' : 'text-gray-500'}`}>
            {voteCount}
          </span>
          <button
            onClick={() => handleVote('down')}
            className={`p-2 rounded-full ${
              userVote === 'down' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Downvote"
          >
            <ChevronDown size={24} />
          </button>
          {isAccepted && (
            <div className="mt-4 p-2 rounded-full bg-green-500 text-white" title="Accepted answer">
              <Check size={24} />
            </div>
          )}
          {isQuestionAuthor && !isAccepted && (
            <Button
              onClick={handleAccept}
              variant="ghost"
              className="mt-4 text-gray-400 hover:text-green-500 hover:bg-green-50"
              title="Accept this answer"
            >
              <Check size={24} />
            </Button>
          )}
        </div>

        {/* Answer content */}
        <div className="flex-1">
          <div className="prose max-w-none mb-4">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          <div className="flex justify-end mt-6">
            <div className="flex items-center bg-brand-lightOrange p-2 rounded-md">
              <div className="flex items-center mr-2">
                {author.avatar ? (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" />
                )}
                <div>
                  <div className="text-sm font-medium text-brand-blue">{author.name}</div>
                  <div className="text-xs text-gray-500">{author.reputation.toLocaleString()} reputation</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                answered {formatDistanceToNow(createdAt, { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-6" />
    </div>
  );
};

export default AnswerCard;
