import { Heart, Clock, MapPin } from 'lucide-react';
import { eventDetails } from '@/data/mockData';

export const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* ===== Background Video ===== */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Video */}
        <video
          className="hidden md:block w-full h-full object-cover"
          src="/a.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Mobile Video */}
        <video
          className="block md:hidden w-full h-full object-cover"
          src="/a.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-8 backdrop-blur-sm">
          <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          <span className="text-primary text-sm font-medium tracking-wide">
            {eventDetails.venue}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6">
          From <span className="text-primary italic">Strangers</span>
          <br />
          to <span className="text-blush">Soulmates</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl text-white/80">
            in 3 Hours
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-display text-xl md:text-2xl italic mb-10 text-white/80">
          {eventDetails.tagline}
        </p>

        {/* Event Details */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-white/80">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>{eventDetails.time}</span>
          </div>

          <div className="w-1.5 h-1.5 rounded-full bg-primary" />

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{eventDetails.venue}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToBooking}
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-neon text-primary-foreground font-semibold text-lg rounded-full"
        >
          <span>Reserve Your Sanctuary</span>
          <span className="font-display text-xl">
            {eventDetails.currency}{eventDetails.price.toLocaleString()}
          </span>
        </button>

      </div>
    </section>
  );
};
