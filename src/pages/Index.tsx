
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for recently asked questions
const RECENT_QUESTIONS = [
  {
    id: "1",
    title: "How to implement authentication with Supabase in React?",
    tags: ["react", "supabase", "authentication"]
  },
  {
    id: "2",
    title: "TypeScript type checking for React props with optional values",
    tags: ["typescript", "react", "props"]
  },
  {
    id: "3",
    title: "Best practices for managing state in a large Next.js application",
    tags: ["nextjs", "react", "state-management"]
  }
];

// Mock data for popular tags
const POPULAR_TAGS = [
  { name: "javascript", count: 2458 },
  { name: "react", count: 1842 },
  { name: "python", count: 1253 },
  { name: "typescript", count: 987 },
  { name: "node.js", count: 876 },
  { name: "css", count: 764 },
  { name: "html", count: 659 },
  { name: "supabase", count: 543 }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-blue to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get answers to your technical questions</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Questify is a community-based platform for developers to ask questions, 
              share knowledge, and build their careers.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search for questions..."
                className="pl-10 py-6 bg-white text-gray-900 rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="bg-brand-orange hover:bg-orange-600 text-white">
                Ask a Question
              </Button>
              <Button variant="outline" className="bg-white text-brand-blue hover:bg-gray-100 border-white">
                Browse Questions
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-4xl font-bold text-brand-blue mb-2">1M+</h3>
                <p className="text-gray-600">Questions Asked</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-4xl font-bold text-brand-blue mb-2">5M+</h3>
                <p className="text-gray-600">Answers Provided</p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-4xl font-bold text-brand-blue mb-2">500K+</h3>
                <p className="text-gray-600">Registered Users</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recently Asked and Popular Tags */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recently Asked Questions */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recently Asked Questions</h2>
                  <Link to="/questions" className="text-brand-blue hover:text-brand-darkBlue">
                    View all
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {RECENT_QUESTIONS.map((question) => (
                    <div key={question.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <Link to={`/questions/${question.id}`} className="text-xl font-medium text-brand-blue hover:text-brand-darkBlue mb-3 block">
                        {question.title}
                      </Link>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <Link key={tag} to={`/tags/${tag}`} className="bg-brand-lightBlue text-brand-blue text-xs px-2 py-1 rounded">
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-lightBlue">
                    <Link to="/questions">Browse All Questions</Link>
                  </Button>
                </div>
              </div>
              
              {/* Popular Tags */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h2>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap gap-3">
                    {POPULAR_TAGS.map((tag) => (
                      <Link 
                        key={tag.name} 
                        to={`/tags/${tag.name}`}
                        className="bg-brand-lightBlue text-brand-blue px-3 py-1.5 rounded-md text-sm hover:bg-brand-lightBlue/80 flex items-center"
                      >
                        <span>{tag.name}</span>
                        <span className="ml-2 bg-brand-blue text-white text-xs px-1.5 py-0.5 rounded-full">
                          {tag.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button asChild variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-lightBlue">
                      <Link to="/tags">Browse All Tags</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-brand-darkGray text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get your questions answered?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of developers and tech enthusiasts to find solutions to your problems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-brand-orange hover:bg-orange-600 text-white">
                Sign Up for Free
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-darkGray">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
