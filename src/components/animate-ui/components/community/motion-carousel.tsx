"use client"

import React, { useCallback, useEffect, useState } from 'react'
import {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaEventType,
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/animate-ui/components/buttons/button'

const TWEEN_FACTOR_BASE = 0.52

interface SlideItem {
  url: string;
  type?: 'image' | 'video';
}

interface MotionCarouselProps {
  slides: (string | SlideItem)[]
  options?: EmblaOptionsType
  className?: string
  onItemClick?: (item: SlideItem) => void
}

export const MotionCarousel = ({
  slides,
  options,
  className,
  onItemClick,
}: MotionCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopPoint) => {
          const target = loopPoint.target()

          if (index === loopPoint.index && target !== 0) {
            const sign = Math.sign(target)

            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress)
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          }
        })
      }

      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR_BASE)
      return Math.max(0, Math.min(1, tweenValue))
    })
    setTweenValues(styles)
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    onScroll(emblaApi)
    onSelect(emblaApi)
  }, [emblaApi, onScroll, onSelect])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const getSlideData = (slide: string | SlideItem): SlideItem => {
    if (typeof slide === 'string') {
      const type = slide.match(/\.(mp4|webm|ogg|mov)/i) ? 'video' : 'image';
      return { url: slide, type };
    }
    return slide;
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {slides.map((slide, index) => {
            const item = getSlideData(slide);
            return (
              <div
                className="flex-[0_0_80%] min-w-0 pl-4 md:flex-[0_0_60%] lg:flex-[0_0_50%]"
                key={index}
              >
                <motion.div
                  className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-zoom-in"
                  style={{
                    scale: tweenValues[index] || 0.9,
                    opacity: tweenValues[index] || 0.5,
                  }}
                  onClick={() => onItemClick?.(item)}
                >
                  {item.type === 'video' ? (
                    <>
                        <video 
                          src={item.url} 
                          className="absolute inset-0 w-full h-full object-cover" 
                          muted 
                          loop 
                          playsInline 
                          onMouseOver={e => e.currentTarget.play()}
                          onMouseOut={e => e.currentTarget.pause()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                           <div className="w-16 h-16 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm">
                               <Play className="w-8 h-8 ml-1 fill-white" />
                           </div>
                        </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={`Slide ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Pagination Dots (Pill Style) */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 transition-all duration-300 rounded-full",
                selectedIndex === index 
                  ? "w-8 bg-[var(--foreground)]" 
                  : "w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-muted)]"
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="rounded-full w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
