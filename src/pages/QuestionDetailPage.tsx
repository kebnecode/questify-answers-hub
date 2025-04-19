
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown, MessageSquare, Flag, Bookmark, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnswerCard from "@/components/AnswerCard";

// Mock question data
const QUESTION = {
  id: "1",
  title: "How to implement authentication with Supabase in React?",
  content: `<p>I'm building a React application and want to use Supabase for authentication. What's the best approach to implement sign-up, login, and session management?</p>
    <p>I've looked at the documentation but I'm still unclear about:</p>
    <ul>
      <li>How to properly store and manage auth state in React</li>
      <li>The best practices for protected routes</li>
      <li>How to handle token refresh</li>
    </ul>
    <p>Has anyone implemented this recently who can share their approach?</p>`,
  votes: 15,
  views: 230,
  tags: ["react", "supabase", "authentication"],
  author: {
    name: "JaneDev",
    avatar: "https://i.pravatar.cc/150?img=1",
    reputation: 1250,
  },
  createdAt: new Date(2023, 11, 15),
  answers: [
    {
      id: "a1",
      content: `<p>I've recently implemented Supabase auth in a React app. Here's my approach:</p>
        <h3>1. Set up Supabase Client</h3>
        <pre><code>
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
        </code></pre>
        
        <h3>2. Create an Auth Context</h3>
        <pre><code>
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get session from Supabase
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null)
        }
      )

      return () => subscription.unsubscribe()
    }

    getSession()
  }, [])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
        </code></pre>
        
        <h3>3. Protected Routes</h3>
        <pre><code>
function PrivateRoute({ children }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
  if (!user) {
    return null
  }
  
  return children
}
        </code></pre>
        
        <p>For token refresh, Supabase handles this automatically as long as you've initialized the client correctly.</p>
        <p>Hope this helps get you started!</p>`,
      votes: 8,
      author: {
        name: "SupabaseExpert",
        avatar: "https://i.pravatar.cc/150?img=6",
        reputation: 3250,
      },
      createdAt: new Date(2023, 11, 16),
      isAccepted: true,
    },
    {
      id: "a2",
      content: `<p>Building on SupabaseExpert's answer, I'd like to add a few considerations:</p>
        <h3>Error Handling</h3>
        <p>Always include proper error handling in your auth flows:</p>
        <pre><code>
try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  
  // Success - user is logged in
} catch (error) {
  console.error('Error signing in:', error.message)
  // Show user-friendly error message
}
        </code></pre>
        
        <h3>Persistent Sessions</h3>
        <p>Supabase stores the session in localStorage by default. If you want to customize this behavior, you can provide a custom storage provider when creating the client:</p>
        <pre><code>
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: customStorageProvider,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
})
        </code></pre>
        
        <p>Also, don't forget to set up RLS (Row Level Security) in your Supabase database to properly secure your data!</p>`,
      votes: 5,
      author: {
        name: "ReactDeveloper",
        avatar: "https://i.pravatar.cc/150?img=7",
        reputation: 2100,
      },
      createdAt: new Date(2023, 11, 17),
      isAccepted: false,
    },
  ],
};

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [voteCount, setVoteCount] = useState(QUESTION.votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // This would typically fetch data based on the ID
  const question = QUESTION;

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

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase later
    console.log('New answer:', newAnswer);
    setNewAnswer("");
    alert("Authentication required to post an answer. Please sign in.");
  };

  const handleBookmark = () => {
    // This will be connected to Supabase later
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleReport = () => {
    // Implement report functionality
    alert("Thank you for reporting this question. Our moderators will review it.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Question header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{question.title}</h1>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-lightBlue">
                <Link to="/questions/ask">Ask Question</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-6">
            <div>Asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}</div>
            <div>•</div>
            <div>Viewed {question.views} times</div>
          </div>
          
          {/* Question content */}
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
              <button
                onClick={handleBookmark}
                className={`p-2 mt-4 rounded-full ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 mt-2 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label="Share"
                title="Share"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={handleReport}
                className="p-2 mt-2 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label="Report"
                title="Report"
              >
                <Flag size={20} />
              </button>
            </div>
            
            {/* Question body */}
            <div className="flex-1">
              <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: question.content }} />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-brand-lightBlue hover:bg-brand-lightBlue/80 text-brand-blue">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Question footer */}
              <div className="flex justify-end">
                <div className="flex items-center bg-brand-lightOrange p-2 rounded-md">
                  <div className="flex items-center mr-2">
                    {question.author.avatar ? (
                      <img 
                        src={question.author.avatar} 
                        alt={question.author.name}
                        className="w-8 h-8 rounded-full mr-2" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-brand-blue">{question.author.name}</div>
                      <div className="text-xs text-gray-500">{question.author.reputation.toLocaleString()} reputation</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Answers section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold mr-2">
              {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
            </h2>
            <MessageSquare className="text-gray-500" size={20} />
          </div>
          
          {question.answers.map((answer) => (
            <AnswerCard
              key={answer.id}
              id={answer.id}
              content={answer.content}
              votes={answer.votes}
              author={answer.author}
              createdAt={answer.createdAt}
              isAccepted={answer.isAccepted}
              isQuestionAuthor={false} // Would be determined based on user authentication
            />
          ))}
        </div>
        
        {/* Post your answer section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <Textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here... You can use Markdown for formatting."
              className="min-h-[200px] mb-4"
            />
            <Button 
              type="submit" 
              className="bg-brand-darkBlue hover:bg-brand-blue"
              disabled={newAnswer.trim() === ""}
            >
              Post Your Answer
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuestionDetailPage;
