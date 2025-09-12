"use client";

import type React from "react";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Plus,
  Clock,
  Heart,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const Burl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    author:""
  });
  const [token, setToken] = useState<string | undefined>();
  const [uname, setUname] = useState<string>();
  useEffect(() => {
    const t = getCookie("token") as string | undefined;
    setToken(t);
    if (t && Burl) {
      axios
        .get(`${Burl}/user/${t}/`)
        .then((response) => {
          setUname(response.data.Uname);
        })
        .catch(() => {
        });
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${Burl}/community/post/`
        );
        console.log(response.data)
        const apiPosts = Array.isArray(response.data)
          ? response.data.map((item: any, idx: number) => ({
              id: item.id?.toString() || idx.toString(),
              title: item.Title || item.title || "Untitled",
              content: item.Content || item.content || "",
              author: item.Author || item.author || "Unknown",
              authorAvatar: "/placeholder.svg?height=40&width=40&text=U",
              category: item.Category || item.category || "General Discussion",
              upvotes: item.upvotes || 0,
              comments: item.comments || 0,
              timeAgo: item.timeAgo || "Just now",
              tags:
                typeof item.Tags === "string"
                  ? item.Tags.split(",").map((t: string) => t.trim())
                  : item.tags || [],
            }))
          : [];
        setPosts(apiPosts);
      } catch (error) {
        console.error("Failed to fetch posts from API", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        Title: newPost.title,
        Category: newPost.category,
        Content: newPost.content,
        Tags: newPost.tags,
        Author:uname
      };
      await axios.post(
        `${Burl}/community/post/`,
        payload
      );
      const post: Post = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: uname ?? "unknown",
        authorAvatar: "/placeholder.svg?height=40&width=40&text=Y",
        category: newPost.category,
        upvotes: 0,
        comments: 0,
        timeAgo: "Just now",
        tags: newPost.tags.split(",").map((tag) => tag.trim()),
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", category: "", tags: "",author:'' });
      alert("Post created successfully!");
    } catch (error) {
      alert("Failed to create post. Please try again.");
      console.error(error);
    }
  };

  const handleUpvote = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">
          Pet Community Forum
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Connect with fellow pet owners, share experiences, ask questions, and
          celebrate the joy of pet ownership
        </p>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="posts">All Posts</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                disabled={!token}>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogDescription>
                  Share your thoughts, experiences, or questions with the
                  community
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="What's your post about?"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded-md"
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Tips & Advice">Tips & Advice</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Recommendations">Recommendations</option>
                    <option value="DIY & Crafts">DIY & Crafts</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="General Discussion">
                      General Discussion
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your thoughts, experiences, or questions..."
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (optional)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., dogs, training, health (separate with commas)"
                    value={newPost.tags}
                    onChange={(e) =>
                      setNewPost({ ...newPost, tags: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Post
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="posts" className="space-y-6">
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.timeAgo}
                        </span>
                      </div>
                      <CardTitle className="text-lg hover:text-primary cursor-pointer">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={post.authorAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpvote(post.id)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {post.upvotes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="space-y-4">
            {posts
              .sort((a, b) => b.upvotes - a.upvotes)
              .map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <Badge className="bg-orange-100 text-orange-800">
                            <Heart className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={post.authorAvatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.upvotes}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-6">
          <div className="space-y-4">
            {posts
              .sort(
                (a, b) =>
                  new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime()
              )
              .map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.timeAgo}
                          </span>
                        </div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={post.authorAvatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpvote(post.id)}
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {post.upvotes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
