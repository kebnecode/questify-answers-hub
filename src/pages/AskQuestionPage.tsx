
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase later
    console.log({ title, body, tags: tags.split(" ") });
    alert("Authentication required to post a question. Please sign in.");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Ask a Question</h1>
          
          <div className="bg-brand-lightBlue/40 border border-brand-lightBlue rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-brand-blue mb-2">Writing a good question</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Summarize your problem in a one-line title</li>
              <li>Describe your problem in detail</li>
              <li>Describe what you've tried</li>
              <li>Add "tags" which help surface your question to members of the community</li>
              <li>Proofread for clarity and correctness</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-lg font-medium mb-2">
                  Title
                </label>
                <p className="text-gray-600 text-sm mb-2">
                  Be specific and imagine you're asking a question to another person
                </p>
                <Input
                  id="title"
                  placeholder="e.g. How to implement authentication with Supabase in React?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <Separator />
              
              <div>
                <label htmlFor="body" className="block text-lg font-medium mb-2">
                  Body
                </label>
                <p className="text-gray-600 text-sm mb-2">
                  Include all the information someone would need to answer your question
                </p>
                <Textarea
                  id="body"
                  placeholder="Describe your problem in detail..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  className="min-h-[300px] w-full"
                />
              </div>
              
              <Separator />
              
              <div>
                <label htmlFor="tags" className="block text-lg font-medium mb-2">
                  Tags
                </label>
                <p className="text-gray-600 text-sm mb-2">
                  Add up to 5 tags to describe what your question is about
                </p>
                <Input
                  id="tags"
                  placeholder="e.g. react supabase authentication"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                  className="w-full"
                />
                <p className="text-gray-500 text-xs mt-2">
                  Separate tags with spaces, like: javascript react css
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300"
                  asChild
                >
                  <Link to="/questions">Discard</Link>
                </Button>
                
                <div className="space-x-3">
                  <Button
                    type="submit"
                    disabled={!title || !body || !tags}
                    className="bg-brand-darkBlue hover:bg-brand-blue"
                  >
                    Post Your Question
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AskQuestionPage;
