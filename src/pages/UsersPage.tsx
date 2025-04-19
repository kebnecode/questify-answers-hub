
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for users
const USERS = [
  {
    id: "1",
    name: "JaneDev",
    avatar: "https://i.pravatar.cc/150?img=1",
    reputation: 1250,
    location: "San Francisco, CA",
    answers: 15,
    questions: 8,
    tags: ["react", "javascript", "typescript"],
    memberSince: new Date(2022, 5, 12),
  },
  {
    id: "2",
    name: "DevMaster",
    avatar: "https://i.pravatar.cc/150?img=2",
    reputation: 3486,
    location: "Berlin, Germany",
    answers: 42,
    questions: 12,
    tags: ["python", "django", "api"],
    memberSince: new Date(2021, 2, 8),
  },
  {
    id: "3",
    name: "SamCoder",
    avatar: "https://i.pravatar.cc/150?img=3",
    reputation: 2750,
    location: "London, UK",
    answers: 31,
    questions: 15,
    tags: ["javascript", "node.js", "express"],
    memberSince: new Date(2021, 8, 20),
  },
  {
    id: "4",
    name: "CSSGuru",
    avatar: "https://i.pravatar.cc/150?img=4",
    reputation: 1842,
    location: "New York, NY",
    answers: 25,
    questions: 5,
    tags: ["css", "tailwind", "design"],
    memberSince: new Date(2022, 1, 15),
  },
  {
    id: "5",
    name: "QueryMaster",
    avatar: "https://i.pravatar.cc/150?img=5",
    reputation: 965,
    location: "Toronto, Canada",
    answers: 8,
    questions: 3,
    tags: ["sql", "database", "postgresql"],
    memberSince: new Date(2022, 9, 5),
  },
  {
    id: "6",
    name: "SupabaseExpert",
    avatar: "https://i.pravatar.cc/150?img=6",
    reputation: 3250,
    location: "Austin, TX",
    answers: 38,
    questions: 10,
    tags: ["supabase", "firebase", "authentication"],
    memberSince: new Date(2021, 4, 18),
  },
  {
    id: "7",
    name: "ReactDeveloper",
    avatar: "https://i.pravatar.cc/150?img=7",
    reputation: 2100,
    location: "Stockholm, Sweden",
    answers: 22,
    questions: 9,
    tags: ["react", "redux", "hooks"],
    memberSince: new Date(2021, 10, 30),
  },
  {
    id: "8",
    name: "CloudArchitect",
    avatar: "https://i.pravatar.cc/150?img=8",
    reputation: 1785,
    location: "Sydney, Australia",
    answers: 19,
    questions: 7,
    tags: ["aws", "docker", "kubernetes"],
    memberSince: new Date(2022, 3, 25),
  },
];

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("reputation");

  // Filter users based on search query
  const filteredUsers = USERS.filter((user) => {
    if (!searchQuery) return true;
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Sort users based on sort criteria
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "reputation") return b.reputation - a.reputation;
    if (sortBy === "answers") return b.answers - a.answers;
    if (sortBy === "questions") return b.questions - a.questions;
    if (sortBy === "newest") return b.memberSince.getTime() - a.memberSince.getTime();
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Users</h1>
          <p className="text-gray-600">
            Find Questify users by name, location, or interests
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search users by name, location, or tags..."
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
                <SelectItem value="reputation">Reputation</SelectItem>
                <SelectItem value="answers">Most Answers</SelectItem>
                <SelectItem value="questions">Most Questions</SelectItem>
                <SelectItem value="newest">Newest Members</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-16 h-16 rounded-full mr-4" 
                  />
                  <div>
                    <Link to={`/users/${user.id}`} className="text-lg font-medium text-brand-blue hover:text-brand-darkBlue">
                      {user.name}
                    </Link>
                    <div className="text-sm text-gray-600">{user.location}</div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-4 text-sm">
                  <div>
                    <div className="font-bold text-gray-900">{user.reputation.toLocaleString()}</div>
                    <div className="text-gray-600">reputation</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{user.answers}</div>
                    <div className="text-gray-600">answers</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{user.questions}</div>
                    <div className="text-gray-600">questions</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {user.tags.map((tag) => (
                    <Link key={tag} to={`/tags/${tag}`} className="bg-brand-lightBlue text-brand-blue text-xs px-2 py-1 rounded">
                      {tag}
                    </Link>
                  ))}
                </div>
                
                <div className="text-xs text-gray-600">
                  Member since {user.memberSince.toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UsersPage;
