'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from '@/messages.json'
import Autoplay from 'embla-carousel-autoplay'
import { Skeleton } from "@/components/ui/skeleton"

const Home = () => {

  const [loading, setLoading]=useState(true)
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setLoading(false)

    }, 2000);
    return () => clearTimeout(timer)
  },[])
  return (
    <>
    
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
{loading ? (
   <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
) : (
  <Carousel
    plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
    className="w-full max-w-xs"
  >
    <CarouselContent>
      {messages.map((message, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            <Card>
              <CardHeader>
                <span className="text-2xl text-center font-bold">{message.title}</span>
              </CardHeader>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-lg font-semibold">{message.content}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)}

        </main>
        <footer className="bg-gray-900 text-white p-4 md:p-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} True Feedback. All rights reserved.
            </p>
          </div>
        </footer>
      </>
  )
}
export default Home