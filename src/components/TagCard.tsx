
import { Link } from "react-router-dom";

interface TagCardProps {
  name: string;
  count: number;
  description: string;
}

const TagCard = ({ name, count, description }: TagCardProps) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
      <Link to={`/tags/${name}`} className="inline-block mb-2">
        <span className="bg-brand-lightBlue text-brand-blue px-2 py-1 rounded-md text-sm hover:bg-brand-lightBlue/80">
          {name}
        </span>
      </Link>
      <p className="text-gray-600 mb-3 text-sm line-clamp-2">{description}</p>
      <div className="text-sm text-gray-500">
        {count.toLocaleString()} {count === 1 ? 'question' : 'questions'}
      </div>
    </div>
  );
};

export default TagCard;
