
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export interface QuestionCardProps {
  id: string;
  title: string;
  excerpt: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  hasAcceptedAnswer?: boolean;
}

const QuestionCard = ({
  id,
  title,
  excerpt,
  votes,
  answers,
  views,
  tags,
  author,
  createdAt,
  hasAcceptedAnswer = false,
}: QuestionCardProps) => {
  return (
    <div className="border-b border-gray-200 py-6 px-4 hover:bg-brand-gray transition-colors">
      <div className="flex flex-col md:flex-row">
        {/* Stats column */}
        <div className="flex mb-4 md:mb-0 md:flex-col md:w-24 md:mr-4 text-sm text-gray-600 space-x-4 md:space-x-0 md:space-y-2 md:text-center">
          <div className={`flex items-center md:block ${votes > 0 ? 'text-gray-700 font-medium' : ''}`}>
            <span className="md:block">{votes}</span>
            <span className="ml-1 md:ml-0 md:block">votes</span>
          </div>
          <div className={`flex items-center md:block ${hasAcceptedAnswer ? 'text-green-600 border rounded-md border-green-600 px-1' : answers > 0 ? 'text-brand-orange font-medium' : ''}`}>
            <span className="md:block">{answers}</span>
            <span className="ml-1 md:ml-0 md:block">answers</span>
          </div>
          <div className="flex items-center md:block">
            <span className="md:block">{views}</span>
            <span className="ml-1 md:ml-0 md:block">views</span>
          </div>
        </div>
        
        {/* Question content */}
        <div className="flex-1">
          <h3 className="text-xl font-medium mb-2">
            <Link to={`/questions/${id}`} className="text-brand-blue hover:text-brand-darkBlue">
              {title}
            </Link>
          </h3>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-brand-lightBlue hover:bg-brand-lightBlue/80 text-brand-blue">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <div className="flex items-center">
                {author.avatar ? (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-6 h-6 rounded-full mr-2" 
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2" />
                )}
                <span className="mr-1 text-brand-blue">{author.name}</span>
              </div>
              <span className="mx-1">asked</span>
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
