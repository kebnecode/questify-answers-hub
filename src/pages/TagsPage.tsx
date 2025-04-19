
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagCard from "@/components/TagCard";

// Mock data for tags
const TAGS = [
  {
    name: "javascript",
    count: 2458,
    description: "For questions about JavaScript, a dynamic programming language for client-side and server-side development."
  },
  {
    name: "react",
    count: 1842,
    description: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of developers."
  },
  {
    name: "python",
    count: 1253,
    description: "Python is a multi-paradigm programming language. Object-oriented programming and structured programming are fully supported."
  },
  {
    name: "typescript",
    count: 987,
    description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript and adds optional static typing to the language."
  },
  {
    name: "node.js",
    count: 876,
    description: "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser."
  },
  {
    name: "css",
    count: 764,
    description: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML."
  },
  {
    name: "html",
    count: 659,
    description: "HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications."
  },
  {
    name: "supabase",
    count: 543,
    description: "Supabase is an open source Firebase alternative providing authentication, database, and storage solutions."
  },
  {
    name: "nextjs",
    count: 512,
    description: "Next.js is a React framework that enables functionality like server-side rendering and static site generation."
  },
  {
    name: "tailwindcss",
    count: 489,
    description: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces."
  },
  {
    name: "database",
    count: 467,
    description: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system."
  },
  {
    name: "api",
    count: 432,
    description: "An API (Application Programming Interface) is a set of definitions and protocols for building and integrating application software."
  },
  {
    name: "redux",
    count: 389,
    description: "Redux is a predictable state container for JavaScript apps, often used with React for state management."
  },
  {
    name: "docker",
    count: 356,
    description: "Docker is a platform for developing, shipping, and running applications in containers."
  },
  {
    name: "aws",
    count: 321,
    description: "Amazon Web Services (AWS) is a comprehensive, evolving cloud computing platform provided by Amazon."
  },
  {
    name: "graphql",
    count: 287,
    description: "GraphQL is a query language for APIs and a runtime for executing those queries with your existing data."
  },
];

const TagsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tags based on search query
  const filteredTags = TAGS.filter((tag) => {
    if (!searchQuery) return true;
    return (
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort tags by count (most popular first)
  const sortedTags = [...filteredTags].sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tags</h1>
          <p className="text-gray-600 mb-6">
            A tag is a keyword or label that categorizes your question with other, similar questions.
            Using the right tags makes it easier for others to find and answer your question.
          </p>
          
          <div className="relative max-w-md mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Filter by tag name or description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedTags.length > 0 ? (
            sortedTags.map((tag) => (
              <TagCard
                key={tag.name}
                name={tag.name}
                count={tag.count}
                description={tag.description}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No tags found</h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TagsPage;
