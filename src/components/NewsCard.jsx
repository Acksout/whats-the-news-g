import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NewsCard = ({ article }) => {
  return (
    <Card className="max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={article.image}
            alt={article.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {article.description}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Source:{" "}
          <a href={article.source.url} className="hover:underline">
            {article.source.name}
          </a>
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
          {article.content}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
