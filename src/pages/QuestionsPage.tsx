
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuestionCard from "@/components/QuestionCard";

// Mock data for questions
const QUESTIONS = [
  {
    id: "1",
    title: "How to implement authentication with Supabase in React?",
    excerpt: "I'm building a React application and want to use Supabase for authentication. What's the best approach to implement sign-up, login, and session management?",
    votes: 15,
    answers: 3,
    views: 230,
    tags: ["react", "supabase", "authentication"],
    author: {
      name: "JaneDev",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    createdAt: new Date(2023, 11, 15),
    hasAcceptedAnswer: true,
  },
  {
    id: "2",
    title: "TypeScript type checking for React props with optional values",
    excerpt: "I'm trying to define proper TypeScript interfaces for my React components. How can I define props that have optional values but also have default values in the component?",
    votes: 8,
    answers: 2,
    views: 187,
    tags: ["typescript", "react", "props"],
    author: {
      name: "DevMaster",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    createdAt: new Date(2023, 11, 18),
    hasAcceptedAnswer: false,
  },
  {
    id: "3",
    title: "Best practices for managing state in a large Next.js application",
    excerpt: "My Next.js application is growing in complexity and I'm looking for the best practices to manage state. Should I use Context API, Redux, Zustand, or something else?",
    votes: 23,
    answers: 5,
    views: 412,
    tags: ["nextjs", "react", "state-management"],
    author: {
      name: "SamCoder",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    createdAt: new Date(2023, 11, 10),
    hasAcceptedAnswer: true,
  },
  {
    id: "4",
    title: "How to optimize Tailwind CSS for production?",
    excerpt: "I'm using Tailwind CSS in my project and noticed that the CSS file is quite large. What are some strategies to optimize it for production?",
    votes: 12,
    answers: 2,
    views: 256,
    tags: ["tailwind", "css", "optimization"],
    author: {
      name: "CSSGuru",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    createdAt: new Date(2023, 11, 5),
    hasAcceptedAnswer: false,
  },
  {
    id: "5",
    title: "Handling API rate limits with React Query",
    excerpt: "I'm using React Query to fetch data from an API that has rate limits. How can I implement proper error handling and retries when hitting these limits?",
    votes: 9,
    answers: 1,
    views: 178,
    tags: ["react-query", "api", "error-handling"],
    author: {
      name: "QueryMaster",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    createdAt: new Date(2023, 11, 20),
    hasAcceptedAnswer: false,
  },
];

const QuestionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterTab, setFilterTab] = useState("all");

  // Filter questions based on current tab
  const filteredQuestions = QUESTIONS.filter((question) => {
    if (filterTab === "all") return true;
    if (filterTab === "answered") return question.answers > 0;
    if (filterTab === "unanswered") return question.answers === 0;
    if (filterTab === "no-accepted") return !question.hasAcceptedAnswer;
    return true;
  }).filter((question) => {
    // Apply search query if present
    if (!searchQuery) return true;
    return (
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Sort questions based on sort criteria
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "newest") return b.createdAt.getTime() - a.createdAt.getTime();
    if (sortBy === "active") return b.answers - a.answers;
    if (sortBy === "votes") return b.votes - a.votes;
    if (sortBy === "views") return b.views - a.views;
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">All Questions</h1>
          <Button asChild className="bg-brand-darkBlue hover:bg-brand-blue">
            <Link to="/questions/ask">Ask Question</Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
                <SelectItem value="votes">Most Votes</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={filterTab} onValueChange={setFilterTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="answered">Answered</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            <TabsTrigger value="no-accepted">No Accepted Answer</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mb-4 text-sm text-gray-600">
          {sortedQuestions.length} {sortedQuestions.length === 1 ? 'question' : 'questions'}
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                excerpt={question.excerpt}
                votes={question.votes}
                answers={question.answers}
                views={question.views}
                tags={question.tags}
                author={question.author}
                createdAt={question.createdAt}
                hasAcceptedAnswer={question.hasAcceptedAnswer}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No questions found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <Button asChild className="bg-brand-darkBlue hover:bg-brand-blue">
                <Link to="/questions/ask">Ask a Question</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuestionsPage;
