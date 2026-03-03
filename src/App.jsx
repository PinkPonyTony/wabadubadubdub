import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, Terminal, CheckCircle2, Circle, MapPin, Mail, Phone } from 'lucide-react';
import { biasesData } from './data/biases';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Micro-interaction
const MagneticButton = ({ children, className = '', onClick, ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.15,
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const commonProps = {
    ref: buttonRef,
    onClick,
    className: `group relative overflow-hidden rounded-full font-medium transition-all inline-flex ${className}`,
    ...props
  };

  const childrenContent = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 z-0 scale-y-0 transform bg-white/10 transition-transform duration-300 origin-bottom group-hover:scale-y-100 mix-blend-overlay"></span>
    </>
  );

  if (props.href) {
    return (
      <a {...commonProps}>
        {childrenContent}
      </a>
    );
  }

  return (
    <button {...commonProps}>
      {childrenContent}
    </button>
  );
};

const premiumImages = [
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1600&auto=format&fit=crop"
];

// Biases Index Subpage Component
const BiasesIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBias, setSelectedBias] = useState(null);

  const filteredBiases = biasesData.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.concept && b.concept.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (b.leverage && b.leverage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleNextBias = (e) => {
    e.stopPropagation();
    if (!selectedBias) return;
    const currentIndex = filteredBiases.findIndex(b => b.id === selectedBias.id);
    const nextIndex = (currentIndex + 1) % filteredBiases.length;
    setSelectedBias(filteredBiases[nextIndex]);
  };

  const handlePrevBias = (e) => {
    e.stopPropagation();
    if (!selectedBias) return;
    const currentIndex = filteredBiases.findIndex(b => b.id === selectedBias.id);
    const prevIndex = (currentIndex - 1 + filteredBiases.length) % filteredBiases.length;
    setSelectedBias(filteredBiases[prevIndex]);
  };

  // Helper to get a stable index for images even if ID parsing fails
  const getBiasImageIndex = (bias) => {
    if (!bias) return 0;
    const index = biasesData.findIndex(b => b.id === bias.id);
    return Math.max(0, index) % premiumImages.length;
  };

  return (
    <div className="min-h-screen bg-mid-obsidian pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 border-b border-white/10 pb-12">
          <span className="font-data text-sm text-mid-champagne tracking-widest uppercase mb-4 block">Cognitive Architecture</span>
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-mid-ivory mb-6">
            The Biases <span className="font-drama italic font-normal text-mid-champagne">Index.</span>
          </h1>
          <p className="max-w-2xl text-lg font-light text-mid-ivory/60 leading-relaxed mb-8">
            A directory of systemic heuristics and perception traps. In strategic marketing, understanding how the human brain predictably misfires is the foundation of structural leverage.
          </p>
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search 115+ architectural laws by name, symptom, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-mid-slate-light border border-white/10 rounded-full pl-6 pr-12 py-4 text-sm text-mid-ivory focus:outline-none focus:border-mid-champagne focus:ring-1 focus:ring-mid-champagne transition-all"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mid-ivory/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBiases.map((bias, i) => (
            <div
              key={bias.id || i}
              onClick={() => setSelectedBias(bias)}
              className="flex flex-col cursor-pointer rounded-2xl bg-glass border border-white/5 p-8 hover:border-mid-champagne/30 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="font-data text-xs text-mid-champagne/70 mb-4 block group-hover:text-mid-champagne">
                {bias.id ? bias.id.toUpperCase() : `B.${String(i + 1).padStart(3, '0')}`}
              </span>
              <h3 className="font-sans text-xl font-bold text-mid-ivory mb-3">{bias.name}</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-mid-ivory/60 flex-1">{bias.query}</p>
            </div>
          ))}
          {filteredBiases.length === 0 && (
            <div className="col-span-full py-24 text-center font-data text-sm text-mid-ivory/40">
              No architectural flaws found matching your query.
            </div>
          )}
        </div>
      </div>

      {/* Bias Detail Modal */}
      {selectedBias && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-mid-obsidian/95 backdrop-blur-2xl" onClick={() => setSelectedBias(null)}></div>

          <div className="relative w-full max-w-3xl max-h-full overflow-y-auto rounded-3xl bg-glass border border-white/10 shadow-2xl animate-fade-in-up flex flex-col">
            {/* Modal Controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
              <button onClick={handlePrevBias} className="p-2 bg-mid-obsidian/70 rounded-full backdrop-blur-xl text-mid-ivory hover:text-white hover:bg-mid-champagne/30 transition-all cursor-pointer border border-white/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button onClick={handleNextBias} className="p-2 bg-mid-obsidian/70 rounded-full backdrop-blur-xl text-mid-ivory hover:text-white hover:bg-mid-champagne/30 transition-all cursor-pointer border border-white/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
              <button onClick={() => setSelectedBias(null)} className="p-2 bg-mid-obsidian/70 rounded-full backdrop-blur-xl text-mid-ivory hover:text-white hover:bg-mid-champagne/30 transition-all cursor-pointer border border-white/10 ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Modal Hero Image */}
            <div className="w-full h-64 md:h-80 relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-mid-obsidian via-mid-obsidian/40 to-transparent z-10"></div>
              <img
                key={selectedBias.id} // Force re-render of image on change for animation
                src={premiumImages[getBiasImageIndex(selectedBias)]}
                alt={selectedBias.name}
                className="w-full h-full object-cover object-center mix-blend-luminosity opacity-80 animate-fade-in-up"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12 -mt-24 relative z-20">
              <span className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-4 block drop-shadow-md">
                {selectedBias.id ? selectedBias.id.toUpperCase() : 'COGNITIVE ARCHITECTURE'}
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-bold text-mid-ivory mb-6 leading-tight drop-shadow-md">{selectedBias.name}</h3>
              <p className="font-drama italic text-2xl text-mid-champagne/90 mb-12 border-b border-white/10 pb-8">{selectedBias.query}</p>

              <div className="space-y-12">
                {selectedBias.concept ? (
                  <>
                    <section>
                      <h4 className="flex items-center gap-3 font-data text-sm tracking-widest text-mid-ivory/50 uppercase mb-4">
                        <Activity className="w-4 h-4 text-mid-champagne" /> The Concept
                      </h4>
                      <p className="font-light text-mid-ivory/90 leading-relaxed text-lg">{selectedBias.concept}</p>
                    </section>

                    <section>
                      <h4 className="flex items-center gap-3 font-data text-sm tracking-widest text-mid-ivory/50 uppercase mb-4">
                        <Terminal className="w-4 h-4 text-mid-champagne" /> Field Expose
                      </h4>
                      <p className="font-light text-mid-ivory/70 leading-relaxed text-lg border-l-2 border-mid-champagne/30 pl-6 italic">{selectedBias.example}</p>
                    </section>

                    <section>
                      <h4 className="flex items-center gap-3 font-data text-sm tracking-widest text-mid-ivory/50 uppercase mb-4">
                        <CheckCircle2 className="w-4 h-4 text-mid-champagne" /> Architectural Leverage
                      </h4>
                      <p className="font-light text-mid-ivory/90 leading-relaxed text-lg">{selectedBias.leverage}</p>
                    </section>
                  </>
                ) : (
                  <p className="font-light text-mid-ivory/70 leading-relaxed text-lg">
                    {selectedBias.story || "Protocol classified. Awaiting architectural expansion."}
                  </p>
                )}
              </div>

              <button onClick={() => setSelectedBias(null)} className="mt-16 w-full border border-white/10 text-mid-ivory font-bold py-5 rounded-xl hover:bg-white/5 hover:border-mid-champagne/50 transition-all tracking-widest">
                CLOSE PROTOCOL
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Navbar: "The Floating Island"
const Navbar = ({ onOpenModal, currentView, setView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-6 z-50 px-4 pointer-events-none">
      <div className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-4 pointer-events-auto transition-all duration-500 overflow-hidden transform-gpu ${scrolled || currentView !== 'home' ? 'bg-glass shadow-2xl scale-100' : 'bg-transparent scale-105'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
          <span className="text-3xl font-signature tracking-tight text-mid-ivory drop-shadow-md">Tarik O.<span className="text-mid-champagne"></span></span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-mid-ivory/70">
          <li onClick={() => { setView('home'); window.scrollTo(0, 0); }} className={`${currentView === 'home' ? 'text-mid-ivory' : ''} hover:text-mid-champagne transition-colors cursor-pointer hover:-translate-y-[1px]`}>Approach</li>
          <li onClick={() => { setView('biases'); window.scrollTo(0, 0); }} className={`${currentView === 'biases' ? 'text-mid-ivory' : ''} hover:text-mid-champagne transition-colors cursor-pointer hover:-translate-y-[1px]`}>Biases</li>
          <li onClick={() => { setView('blog'); window.scrollTo(0, 0); }} className={`${currentView === 'blog' ? 'text-mid-ivory' : ''} hover:text-mid-champagne transition-colors cursor-pointer hover:-translate-y-[1px]`}>Blog</li>
        </ul>

        <div className="flex items-center gap-4">
          <MagneticButton onClick={onOpenModal} className="bg-mid-champagne text-mid-obsidian px-5 py-2 text-sm font-semibold hover:bg-mid-champagne-dark">
            Bring Me the Problem
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
};

// Live Telemetry Ticker
const LiveTelemetry = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clone the content for seamless infinite scrolling
      const content = tickerRef.current.innerHTML;
      tickerRef.current.innerHTML = content + content;

      gsap.to(tickerRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "linear",
      });
    }, tickerRef);
    return () => ctx.revert();
  }, []);

  const items = [
    "SYS.STATUS: OPERATIONAL",
    "115+ PERCEPTION TRAPS MAPPED",
    "SIGNAL-TO-NOISE RATIO: MAXIMUM",
    "AUTHORITY ACQUISITION: ACTIVE",
    "ATTENTION DENSITY: CRITICAL",
    "MARKET LEVERAGE: SECURED"
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full border-t border-white/5 bg-mid-obsidian/80 backdrop-blur-md overflow-hidden py-3 z-20">
      <div className="flex whitespace-nowrap font-data text-xs text-mid-champagne/80 tracking-widest uppercase" ref={tickerRef}>
        {items.map((item, i) => (
          <div key={`tick-${i}`} className="flex items-center gap-6 px-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mid-champagne opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mid-champagne"></span>
            </span>
            {item}
            <span className="text-mid-ivory/20 ml-6">//</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Section: "The Opening Shot"
const Hero = ({ onOpenModal, setView }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.from('.hero-bg', { scale: 1.05, opacity: 0, duration: 2 })
        .from('.hero-text-1', { y: 40, opacity: 0 }, "-=1.4")
        .from('.hero-text-2', { y: 60, opacity: 0 }, "-=1.2")
        .from('.hero-cta', { y: 30, opacity: 0 }, "-=1.0");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Using a dark marble/luxury architecture image for Midnight Luxe
  const bgImage = "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2940&auto=format&fit=crop";

  return (
    <section ref={containerRef} className="relative flex h-[100dvh] w-full items-center p-6 md:p-12 lg:p-24 overflow-hidden pt-24">
      {/* Background with heavy primary-to-black gradient */}
      <div
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-mid-obsidian via-mid-obsidian/90 to-mid-obsidian/40"></div>
        {/* Aggressive vignette */}
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl pb-12 mt-12">
        <div className="hero-text-1 mb-6 inline-flex items-center gap-3 rounded-full border border-mid-champagne/20 bg-mid-champagne/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-data text-xs font-bold tracking-widest text-mid-champagne uppercase">Critical Market Deficit Detected</span>
        </div>

        <h1 className="flex flex-col gap-2">
          <span className="hero-text-1 text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-mid-ivory/90 leading-tight">
            While your competitors burn capital on noise,
          </span>
          <span className="hero-text-2 font-drama text-6xl md:text-8xl lg:text-[10rem] italic leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-mid-champagne via-[#E5D3A1] to-mid-champagne drop-shadow-2xl mt-[-10px]">
            I Architect Authority.
          </span>
        </h1>

        <p className="hero-text-1 mt-8 max-w-2xl text-lg md:text-xl font-sans font-light leading-relaxed text-mid-ivory/60 border-l-2 border-mid-champagne/30 pl-6">
          I design field-tested marketing systems that exploit cognitive biases and structural leverage. This isn't branding. This is the calculated acquisition of profound market dominance.
        </p>

        <div className="hero-cta mt-12 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <MagneticButton onClick={onOpenModal} className="bg-mid-ivory text-mid-obsidian px-8 py-4 text-lg font-bold hover:bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
              Apply for Deployment <ArrowRight className="ml-2 inline h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <div className="font-data text-xs text-mid-ivory/40 uppercase tracking-widest flex flex-col gap-1">
              <span>Only accepting strategic engagements.</span>
              <span className="text-mid-champagne">Capacity: Limited</span>
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button onClick={() => { setView('biases'); window.scrollTo(0, 0); }} className="px-6 py-3 border border-white/10 bg-white/5 rounded-full text-sm font-semibold text-mid-ivory hover:bg-white/10 hover:border-mid-champagne/50 transition-all">
              Explore the Biases Index
            </button>
            <button onClick={() => { setView('blog'); window.scrollTo(0, 0); }} className="px-6 py-3 border border-white/10 bg-white/5 rounded-full text-sm font-semibold text-mid-ivory hover:bg-white/10 hover:border-mid-champagne/50 transition-all">
              Read Latest Dispatches
            </button>
          </div>
        </div>
      </div>

      <LiveTelemetry />
    </section>
  );
};

// Card 1: Diagnostic Shuffler
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Sales Floor Telemetry', data: 'Pressure Test: Pass' },
    { id: 2, 'title': 'Conversion Variables', data: 'Friction: Minimal' },
    { id: 3, title: 'Market Response', data: 'Signal: Strong' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="absolute inset-x-0 mx-auto w-full max-w-[280px] rounded-2xl bg-mid-slate-light p-6 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-white/5"
          style={{
            top: `${index * 12}px`,
            scale: 1 - index * 0.05,
            opacity: 1 - index * 0.2,
            zIndex: cards.length - index,
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <Activity className="h-5 w-5 text-mid-champagne" />
            <span className="font-data text-xs text-mid-ivory/50">NODE {card.id}</span>
          </div>
          <h4 className="font-sans font-bold text-mid-ivory">{card.title}</h4>
          <p className="mt-2 font-data text-xs text-mid-champagne">{card.data}</p>
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-1">
            <span className="h-1 flex-1 bg-mid-champagne/40 rounded-full"></span>
            <span className="h-1 flex-1 bg-mid-champagne/40 rounded-full w-2/3"></span>
            <span className="h-1 flex-1 bg-mid-champagne/10 rounded-full w-1/3"></span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Card 2: Telemetry Typewriter
const TelemetryTypewriter = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);

  const sequence = [
    { text: "> Initializing perception architecture...", delay: 800 },
    { text: "> Connecting to brand nodes [OK]", delay: 400 },
    { text: "> Analyzing market leverage vectors...", delay: 1200 },
    { text: "> SIGNAL FOUND: Authority deficit detected.", color: 'text-red-400', delay: 800 },
    { text: "> Deploying authority positioning signals...", color: 'text-mid-champagne', delay: 1500 },
    { text: "> System status: Optimal leverage achieved.", delay: 3000 }
  ];

  useEffect(() => {
    let isActive = true;
    let step = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (!isActive) return;

      const currentConfig = sequence[step];
      if (!currentConfig) {
        // Restart sequence after delay
        setTimeout(() => {
          if (isActive) {
            setLines([]);
            setCurrentLine('');
            step = 0;
            charIndex = 0;
            typeNextChar();
          }
        }, 3000);
        return;
      }

      if (charIndex < currentConfig.text.length) {
        setCurrentLine(currentConfig.text.substring(0, charIndex + 1));
        charIndex++;
        // Randomize typing speed slightly for realism
        setTimeout(typeNextChar, Math.random() * 30 + 20);
      } else {
        // Line finished
        setLines(prev => [...prev, { text: currentConfig.text, color: currentConfig.color }]);
        setCurrentLine('');
        step++;
        charIndex = 0;
        setTimeout(typeNextChar, currentConfig.delay);
      }
    };

    // Start typing
    setTimeout(typeNextChar, 1000);

    // Cursor blink interval
    const blinkInterval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530);

    return () => {
      isActive = false;
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="flex h-64 w-full flex-col rounded-2xl bg-mid-obsidian border border-white/10 p-6 overflow-hidden shadow-inner font-data text-xs">
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">Live Telemetry</span>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col justify-end">
        <div className="space-y-1.5 transition-all duration-300">
          {lines.slice(-4).map((line, i) => (
            <div key={i} className={`${line.color || 'text-mid-ivory/70'} break-all`}>
              {line.text}
            </div>
          ))}
          <div className="text-mid-champagne break-all flex items-center min-h-[1.25rem]">
            {currentLine}
            <span className={`inline-block w-2 h-3 ml-1 bg-mid-champagne ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler
const ProtocolScheduler = ({ onOpenModal }) => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.to(cursorRef.current, { x: 40, y: 30, duration: 1, ease: "power2.inOut" })
        .to('.day-T', { scale: 0.95, backgroundColor: 'rgba(201,168,76,0.2)', duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-T', { borderColor: '#C9A84C', color: '#C9A84C', duration: 0.2 })
        .to(cursorRef.current, { x: 120, y: 90, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to('.day-T', { borderColor: 'rgba(255,255,255,0.05)', color: 'inherit', duration: 0.5, delay: 1 })
        .set(cursorRef.current, { x: -20, y: -20, opacity: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-64 w-full rounded-2xl bg-mid-slate p-6 border border-white/5 overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <span className="font-sans text-sm font-semibold text-mid-ivory">Equity Path</span>
        <span className="font-data text-xs text-mid-ivory/50">Q4</span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((day, i) => (
          <div key={i} className={`day-${day} flex aspect-square items-center justify-center rounded-lg border border-white/5 bg-mid-obsidian/50 text-xs font-data transition-colors`}>
            {day}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end mt-4 z-20 relative">
        <div className="flex flex-col gap-1">
          <span className="font-data text-[10px] text-mid-ivory/30 uppercase">Deployment Sequence</span>
          <span className="h-1 w-12 bg-mid-champagne rounded-full"></span>
        </div>
        <button onClick={onOpenModal} className="save-btn rounded-full bg-white/5 hover:bg-mid-champagne hover:text-mid-obsidian px-5 py-2 text-xs font-bold border border-white/10 text-mid-ivory hover:border-mid-champagne transition-all shadow-lg cursor-pointer">INITIATE DEPLOYMENT</button>
      </div>

      <svg ref={cursorRef} className="absolute top-0 left-0 w-6 h-6 z-10 drop-shadow-lg text-mid-ivory" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 11.6-7.7 2.1-3 6.3-5.3-20z" />
      </svg>
    </div>
  );
};

// Authority Data Module
const AuthorityDataModule = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation logic
      const counters = gsap.utils.toArray('.data-counter');
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;

        gsap.to(counter, {
          innerHTML: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: isDecimal ? 0.1 : 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          onUpdate: function () {
            if (isDecimal) {
              counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
            }
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 bg-mid-obsidian border-y border-white/5 py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background grid texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-data text-xs text-mid-champagne tracking-widest uppercase block mb-2">SYSTEM METRICS</span>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-mid-ivory">Operational Dominance.</h2>
          </div>
          <p className="font-sans text-sm font-light text-mid-ivory/50 max-w-sm text-left md:text-right">
            The architecture is only as valuable as the leverage it produces. I do not deal in hypotheticals; I deal in hard, measurable reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 relative">

          <div className="flex flex-col border-l-2 border-mid-champagne/20 pl-6 group hover:border-mid-champagne transition-colors">
            <span className="font-data text-xs text-mid-ivory/40 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity className="w-3 h-3 text-mid-champagne" /> Cognitive Laws Mapped</span>
            <div className="flex items-baseline gap-1">
              <span className="font-drama text-6xl md:text-7xl font-bold text-mid-champagne data-counter leading-none" data-target="115">0</span>
              <span className="font-sans text-2xl text-mid-champagne/50">+</span>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-mid-champagne/20 pl-6 group hover:border-mid-champagne transition-colors">
            <span className="font-data text-xs text-mid-ivory/40 uppercase tracking-widest mb-4 flex items-center gap-2"><Terminal className="w-3 h-3 text-mid-champagne" /> Minimum ROI Mandate</span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-3xl text-mid-champagne/50"></span>
              <span className="font-drama text-6xl md:text-7xl font-bold text-mid-champagne data-counter leading-none" data-target="3.5">0.0</span>
              <span className="font-sans text-4xl text-mid-champagne/80 font-bold ml-1">X</span>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-mid-champagne/20 pl-6 group hover:border-mid-champagne transition-colors">
            <span className="font-data text-xs text-mid-ivory/40 uppercase tracking-widest mb-4 flex items-center gap-2"><Circle className="w-3 h-3 text-mid-champagne" /> Tolerance for Fluff</span>
            <div className="flex items-baseline gap-1">
              <span className="font-drama text-6xl md:text-7xl font-bold text-mid-champagne data-counter leading-none" data-target="0">99</span>
              <span className="font-sans text-3xl text-mid-champagne/50">%</span>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-mid-champagne/20 pl-6 group hover:border-mid-champagne transition-colors">
            <span className="font-data text-xs text-mid-ivory/40 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-mid-champagne" /> System Reliability</span>
            <div className="flex items-baseline gap-1">
              <span className="font-drama text-6xl md:text-7xl font-bold text-mid-ivory data-counter leading-none" data-target="99.9">0.0</span>
              <span className="font-sans text-3xl text-mid-ivory/50 font-bold ml-1">%</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Features Section wrapper
const Features = ({ onOpenModal }) => {
  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-24 pb-24 bg-mid-obsidian">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Feature 1 */}
        <div className="feature-card flex flex-col rounded-3xl bg-glass border border-white/5 p-8 shadow-2xl hover:border-mid-champagne/20 transition-all group">
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-mid-champagne/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <DiagnosticShuffler />
          </div>
          <span className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-3 block">01 // Forensic Audit</span>
          <h3 className="font-sans text-3xl font-bold tracking-tight text-mid-ivory mb-4">Strategic Diagnostics</h3>
          <ul className="space-y-3 font-sans font-light text-mid-ivory/60 text-sm mb-6 flex-1">
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Extracting leverage from operational data.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Identifying critical conversion friction points.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Pressure-testing brand positioning.</li>
          </ul>
        </div>

        {/* Feature 2 */}
        <div className="feature-card flex flex-col rounded-3xl bg-glass border border-white/5 p-8 shadow-2xl hover:border-mid-champagne/20 transition-all group">
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-mid-champagne/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <TelemetryTypewriter />
          </div>
          <span className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-3 block">02 // Structural Design</span>
          <h3 className="font-sans text-3xl font-bold tracking-tight text-mid-ivory mb-4">Authority Architecture</h3>
          <ul className="space-y-3 font-sans font-light text-mid-ivory/60 text-sm mb-6 flex-1">
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Engineering perception vs fighting for attention.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Deploying high-fidelity market signals.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Eliminating the need to compete on price.</li>
          </ul>
        </div>

        {/* Feature 3 */}
        <div className="feature-card flex flex-col rounded-3xl bg-glass border border-white/5 p-8 shadow-2xl hover:border-mid-champagne/20 transition-all group">
          <div className="mb-10 relative pointer-events-auto">
            <div className="absolute inset-0 bg-mid-champagne/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <ProtocolScheduler onOpenModal={onOpenModal} />
          </div>
          <span className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-3 block">03 // Execution Engine</span>
          <h3 className="font-sans text-3xl font-bold tracking-tight text-mid-ivory mb-4">Enduring Campaigns</h3>
          <ul className="space-y-3 font-sans font-light text-mid-ivory/60 text-sm mb-6 flex-1">
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Launching assets that build compounding equity.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Overriding short-term competitor noise.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-mid-champagne mt-0.5 shrink-0" /> Securing permanent market leverage.</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

// Philosophy Section: "The Manifesto"
const Philosophy = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to('.philosophy-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal
      gsap.from('.philosophy-word', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const bgImage = "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2000&auto=format&fit=crop";

  const smallText = "Most strategic marketing focuses on:";
  const smallTextHighlight = "short-term noise and visible names.";

  const bigTextWords = "I focus on:".split(' ');

  return (
    <section ref={containerRef} className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-mid-obsidian py-32 ring-1 ring-white/5">
      <div
        className="philosophy-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-mid-obsidian via-transparent to-mid-obsidian"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center" ref={textRef}>
        <p className="mb-8 font-sans text-xl md:text-2xl font-light tracking-wide text-mid-ivory/60">
          {smallText} <span className="text-mid-ivory/40 line-through">{smallTextHighlight}</span>
        </p>
        <h2 className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-mid-ivory">
          {bigTextWords.map((word, i) => (
            <span key={i} className="philosophy-word block">{word}</span>
          ))}
          <span className="philosophy-word block font-drama italic text-mid-champagne mt-4 w-full text-6xl md:text-8xl lg:text-9xl">
            Architecting Authority.
          </span>
        </h2>
      </div>
    </section>
  );
};

// Opportunity Catcher Micro-Game
const OpportunityCatcher = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);

  const spawnTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const idCounterRef = useRef(0);

  const scheduleNext = () => {
    // CRITICAL: Clear any existing timeouts to prevent multiple game loops from overlapping
    clearTimeout(spawnTimeoutRef.current);
    clearTimeout(hideTimeoutRef.current);

    // Wait ~1s before spawning
    spawnTimeoutRef.current = setTimeout(() => {
      const isFast = Math.random() < 0.3; // 30% chance for 0.9s
      const lifetime = isFast ? 900 : 1800;

      const newOpp = {
        id: idCounterRef.current++,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 15 + 45, // 45px to 60px
      };

      setOpportunities([newOpp]);

      hideTimeoutRef.current = setTimeout(() => {
        setOpportunities([]); // Node missed
        scheduleNext();       // Schedule next spawn
      }, lifetime);

    }, 800 + Math.random() * 600);
  };

  useEffect(() => {
    scheduleNext(); // Start game loop

    return () => {
      clearTimeout(spawnTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const catchOpportunity = (id, e) => {
    e.stopPropagation();

    // Prevent double-clicks on the same node
    if (opportunities.length === 0) return;

    setScore(s => s + 1);

    // Clear the active node immediately
    setOpportunities([]);

    // Schedule the next spawn (which now safely clears all previous timeouts)
    scheduleNext();

    // Burst effect
    const burst = document.createElement('div');
    burst.className = 'absolute w-16 h-16 bg-mid-champagne rounded-full mix-blend-screen pointer-events-none animate-ping opacity-70';
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    burst.style.left = `${x - 32}px`;
    burst.style.top = `${y - 32}px`;
    if (containerRef.current) {
      containerRef.current.appendChild(burst);
      setTimeout(() => burst.remove(), 1000);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-mid-obsidian rounded-2xl overflow-hidden cursor-crosshair group/game shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-auto">
      {/* Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full border border-mid-champagne/30 animate-[spin_8s_linear_infinite]">
          <div className="w-1/2 h-full border-r border-mid-champagne/50"></div>
        </div>
        <div className="absolute w-3/4 h-3/4 rounded-full border border-mid-champagne/20"></div>
        <div className="absolute w-1/2 h-1/2 rounded-full border border-mid-champagne/10"></div>
      </div>

      {/* Score HUD */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="font-data text-[10px] text-mid-champagne tracking-widest uppercase block mb-1">Leverage Captured</span>
        <span className="font-sans text-3xl font-bold text-mid-ivory leading-none">{score}</span>
      </div>

      {/* Interactive Targets */}
      {opportunities.map(opp => (
        <button
          key={opp.id}
          className="absolute rounded-full bg-mid-champagne/20 border border-mid-champagne text-mid-obsidian flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.6)] hover:bg-mid-champagne transition-all duration-300 pointer-events-auto z-20 hover:scale-110 active:scale-90"
          style={{
            left: `${opp.x}%`,
            top: `${opp.y}%`,
            width: opp.size,
            height: opp.size,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={(e) => catchOpportunity(opp.id, e)}
        >
          <div className="w-2 h-2 rounded-full bg-mid-champagne transition-colors pointer-events-none"></div>
        </button>
      ))}

      {/* UI Status overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <span className="font-data text-[10px] text-mid-ivory/50 tracking-widest uppercase flex items-center justify-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
          </span>
          Click nodes to extract leverage
        </span>
      </div>
    </div>
  );
};

// Protocol Section: "Sticky Stacking Archive"
const Protocol = () => {
  const containerRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'Strategic Diagnostics',
      desc: 'I do not guess. I extract the exact cognitive and operational friction points from your market data, isolating the precise vectors where your competitors are bleeding capital.',
      watermark: 'PHASE.01'
    },
    {
      num: '02',
      title: 'Perception Architecture',
      desc: 'I construct irrefutable authority signals. By engineering the structural environment your prospects interact with, I force them to naturally conclude you are the only viable option.',
      watermark: 'SYS.SYNC'
    },
    {
      num: '03',
      title: 'Enduring Deployment',
      desc: 'I launch campaigns designed as compounding psychological assets. While competitors burn resources on short-term noise, I secure permanent, unshakeable market leverage.',
      watermark: 'LOCKED'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top", // Transitions natively over the height of the screen
              scrub: true,
            }
          });
        }
      });

      // Animations for SVG graphics inside each card
      gsap.to('.rotating-ring', { rotation: 360, duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center' });
      gsap.to('.scanning-laser', { y: 150, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.pulsing-wave', { strokeDashoffset: 0, duration: 3, repeat: -1, ease: 'linear' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-mid-obsidian border-b border-white/5 flex flex-col">
      {steps.map((step, index) => (
        <section
          key={index}
          className="protocol-card flex h-[100dvh] w-full items-center justify-center p-6 md:p-12 lg:p-24 sticky top-0 overflow-hidden pointer-events-none"
          style={{ paddingTop: `${index * 2}rem` }} // Slight offset so they stack visibly
        >
          {/* Typographical Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-drama text-[15rem] md:text-[25rem] text-white/[0.02] whitespace-nowrap z-0 select-none pointer-events-none italic font-bold">
            {step.watermark}
          </div>

          <div className="flex w-full max-w-6xl flex-col md:flex-row items-center gap-12 rounded-3xl bg-glass border border-white/10 p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative z-10 overflow-hidden group hover:border-mid-champagne/30 transition-all duration-700 pointer-events-auto">
            {/* Ambient glow behind visual */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-mid-champagne/5 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Visual Column */}
            <div className={`flex aspect-square w-full max-w-md items-center justify-center rounded-2xl bg-mid-obsidian border border-white/10 ${index === 2 ? 'p-1 pointer-events-none' : 'p-8'} relative overflow-hidden shadow-inner`}>
              {index === 0 && (
                <svg className="w-full h-full text-mid-champagne mix-blend-screen drop-shadow-[0_0_15px_rgba(201,168,76,0.5)]" viewBox="0 0 200 200">
                  <circle className="rotating-ring" cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 12" />
                  <circle className="rotating-ring absolute" cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 15" style={{ animationDirection: 'reverse' }} />
                  <circle className="rotating-ring absolute" cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                  <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.8" className="animate-pulse" />
                </svg>
              )}
              {index === 1 && (
                <svg className="w-full h-full text-mid-champagne mix-blend-screen" viewBox="0 0 200 200">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#grid)" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  <line className="scanning-laser" x1="0" y1="25" x2="200" y2="25" stroke="#C9A84C" strokeWidth="3" filter="drop-shadow(0 0 12px #C9A84C)" opacity="0.9" />
                </svg>
              )}
              {index === 2 && (
                <OpportunityCatcher />
              )}
            </div>

            {/* Content Column */}
            <div className="flex w-full flex-col justify-center relative z-10">
              <span className="mb-4 font-data text-xl text-mid-champagne tracking-widest font-bold">SYS.{step.num} //</span>
              <h2 className="mb-6 font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-mid-ivory">
                {step.title}
              </h2>
              <p className="max-w-lg font-sans text-lg font-light leading-relaxed text-mid-ivory/60">
                {step.desc}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

// Final CTA Section
const FinalCTA = ({ onOpenModal }) => {
  return (
    <section className="relative w-full bg-mid-obsidian px-6 pt-12 pb-24 md:pt-16 md:pb-32 lg:px-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center rounded-3xl bg-mid-slate-light p-12 md:p-24 shadow-2xl border border-white/5 relative overflow-hidden group">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mid-champagne/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-mid-champagne/10 transition-colors duration-1000"></div>

        <div className="relative z-10 w-full flex justify-between items-center mb-12 border-b border-white/10 pb-4">
          <span className="font-data text-xs text-mid-champagne tracking-widest uppercase">END OF LINE</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-data text-xs text-mid-ivory/50 uppercase tracking-widest">SYSTEM AWAITING INPUT</span>
          </div>
        </div>

        <h2 className="relative z-10 font-sans text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-mid-ivory mb-6">
          Ready to Architect <br />
          <span className="font-drama italic text-mid-champagne font-normal text-6xl md:text-7xl lg:text-8xl w-full block mt-2">Unfair Leverage?</span>
        </h2>
        <p className="relative z-10 font-sans text-lg font-light text-mid-ivory/60 max-w-2xl mx-auto mb-16">
          Stop competing on visible names and short-term noise. Start commanding the market with undeniable authority. I design the environment; you collect the outcome.
        </p>

        <div className="relative z-10 flex flex-col items-center">
          <MagneticButton onClick={onOpenModal} className="bg-mid-ivory text-mid-obsidian px-10 py-5 text-xl font-bold hover:bg-white shadow-[0_0_40px_rgba(255,255,255,0.1)] group transition-all">
            Application for Deployment <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <div className="mt-6 flex flex-col gap-1 text-center">
            <span className="font-data text-xs text-mid-ivory/40 uppercase tracking-widest">Only accepting strategic engagements.</span>
            <span className="font-data text-xs text-mid-champagne uppercase tracking-widest">Capacity: Highly Limited.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Generic Text Modal for Privacy/Terms
const TextModal = ({ isOpen, onClose, type }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.text-modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo('.text-modal-content', { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const content = type === 'privacy' ? {
    title: "Privacy Architecture //",
    text: "We do not deal in the unnecessary extraction of data. Information transmitted through our network (contact inquiries, analytics) is utilized strictly for the execution of strategic operations and maintaining seamless communication.\n\nWe do not sell, rent, or distribute data to third-party entities. Security and confidentiality form the baseline of our infrastructure. By navigating this architecture, you acknowledge the standard operational data processing required to deliver high-fidelity experiences."
  } : {
    title: "Terms of Engagement //",
    text: "Access to this platform implies agreement with the established Terms of Engagement. All strategic models, visual frameworks, and intellectual capital displayed here remain the exclusive property of Tarik Omerović.\n\nDuplication or unauthorized deployment of these proprietary assets is prohibited. Engagements initiated through this platform are subject to individual contractual agreements tailored to the specific operational requirements of the client. We reserve the right to modify these terms as our infrastructure evolves."
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="text-modal-backdrop absolute inset-0 bg-mid-obsidian/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="text-modal-content relative w-full max-w-lg rounded-3xl bg-mid-slate-light border border-white/10 p-8 md:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6 text-mid-ivory/50 hover:text-mid-ivory transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="text-2xl font-sans font-bold text-mid-champagne mb-8">{content.title}</h3>

        <div className="space-y-6 text-sm md:text-base text-mid-ivory/80 font-light leading-relaxed">
          {content.text.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

// Footer Layer
const Footer = ({ setView, onOpenContactModal, onOpenTextModal }) => {
  return (
    <footer className="w-full bg-mid-slate-light px-6 pb-12 pt-24 md:px-12 lg:px-24 rounded-t-[4rem] relative z-20 mt-[-4rem]">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12 font-sans mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
            <span className="text-3xl font-signature tracking-tight text-mid-ivory drop-shadow-md mb-4 block">Tarik O.<span className="text-mid-champagne"></span></span>
          </div>
          <p className="text-mid-ivory/50 max-w-xs text-sm leading-relaxed mb-8">
            Strategic Marketing & Perception Architecture. Designing field-tested systems that turn brands into authority positions.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-data text-xs text-mid-ivory/50 uppercase tracking-widest">System Operational</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-mid-ivory text-sm uppercase tracking-wider mb-2">Architecture</h4>
          <span onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="text-sm text-mid-ivory/60 hover:text-mid-champagne transition-colors w-fit cursor-pointer">Approach</span>
          <span onClick={() => { setView('biases'); window.scrollTo(0, 0); }} className="text-sm text-mid-ivory/60 hover:text-mid-champagne transition-colors w-fit cursor-pointer">Biases</span>
          <span onClick={() => { setView('blog'); window.scrollTo(0, 0); }} className="text-sm text-mid-ivory/60 hover:text-mid-champagne transition-colors w-fit cursor-pointer">Blog</span>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-mid-ivory text-sm uppercase tracking-wider mb-2">Connect</h4>
          <a href="https://www.instagram.com/bastarikomerovic/" target="_blank" rel="noopener noreferrer" className="text-sm text-mid-ivory/60 hover:text-mid-champagne transition-colors w-fit">Instagram</a>
          <span onClick={onOpenContactModal} className="text-sm text-mid-ivory/60 hover:text-mid-champagne transition-colors w-fit cursor-pointer">Contact</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-data text-xs text-mid-ivory/40">
          © {new Date().getFullYear()} Tarik Omerović. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span onClick={() => onOpenTextModal('privacy')} className="font-data text-xs text-mid-ivory/40 hover:text-mid-ivory transition-colors cursor-pointer">Privacy</span>
          <span onClick={() => onOpenTextModal('terms')} className="font-data text-xs text-mid-ivory/40 hover:text-mid-ivory transition-colors cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
};

// Contact Modal Layer
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', number: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo('.modal-content', { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      setStatus('idle'); // reset on close
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // IMPORTANT: User must replace this with their actual Web3Forms access key
          access_key: "0956583d-d0c7-4bc5-866c-796b416a87ea",
          name: formData.name,
          email: formData.email,
          phone: formData.number,
          message: formData.message,
          subject: `Strategic Architecture Inquiry - ${formData.name}`,
          from_name: "Tarik Omerović Platform"
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({ name: '', number: '', email: '', message: '' });
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="modal-backdrop absolute inset-0 bg-mid-obsidian/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="modal-content relative w-full max-w-lg rounded-3xl bg-mid-slate-light border border-white/10 p-8 shadow-2xl overflow-hidden pointer-events-auto">

        {/* Success Overlay */}
        <div className={`absolute inset-0 z-50 bg-mid-slate-light flex flex-col items-center justify-center transition-all duration-500 ${status === 'success' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className="w-16 h-16 rounded-full bg-mid-champagne/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-mid-champagne" />
          </div>
          <h3 className="text-2xl font-sans font-bold text-mid-ivory mb-2">Transmission Successful</h3>
          <p className="font-light text-mid-ivory/60 text-sm text-center px-8">The system has received your data. I will review the architecture and contact you shortly.</p>
        </div>

        <button onClick={onClose} className="absolute right-6 top-6 text-mid-ivory/50 hover:text-mid-ivory transition-colors z-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="text-2xl font-sans font-bold text-mid-ivory mb-2" id="modal-title">Initiate Protocol</h3>
        <p className="font-light text-mid-ivory/60 mb-8 text-sm text-balance">Direct line to perception architecture. Brief your situation below.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-30">
          <div className="grid grid-cols-2 gap-4">
            <input required disabled={status === 'submitting'} type="text" placeholder="Name" className="w-full bg-mid-obsidian border border-white/5 rounded-xl px-4 py-3 text-sm text-mid-ivory focus:outline-none focus:border-mid-champagne/50 transition-colors disabled:opacity-50" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input type="tel" disabled={status === 'submitting'} placeholder="Phone (Optional)" className="w-full bg-mid-obsidian border border-white/5 rounded-xl px-4 py-3 text-sm text-mid-ivory focus:outline-none focus:border-mid-champagne/50 transition-colors disabled:opacity-50" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} />
          </div>
          <input required disabled={status === 'submitting'} type="email" placeholder="Email" className="w-full bg-mid-obsidian border border-white/5 rounded-xl px-4 py-3 text-sm text-mid-ivory focus:outline-none focus:border-mid-champagne/50 transition-colors disabled:opacity-50" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <textarea required disabled={status === 'submitting'} rows="4" placeholder="The Problem / Objective" className="w-full bg-mid-obsidian border border-white/5 rounded-xl px-4 py-3 text-sm text-mid-ivory focus:outline-none focus:border-mid-champagne/50 transition-colors resize-none disabled:opacity-50" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>

          <button type="submit" disabled={status === 'submitting'} className={`mt-4 w-full font-bold py-4 rounded-xl transition-all tracking-wide ${status === 'error' ? 'bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30' : 'bg-mid-champagne text-mid-obsidian hover:bg-mid-champagne-dark'}`}>
            {status === 'submitting' ? 'TRANSMITTING...' : status === 'error' ? 'TRANSMISSION FAILED - RETRY' : 'TRANSMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};
// Blog Data (Stolen Like An Artist from The Decision Lab, rewritten for Midnight Luxe)
const blogPosts = [
  {
    id: 1,
    title: "The Gamification Trap: How Streak Creep Destroys Leverage",
    concept: "Most apps try to build habits through aggressive streaks and points. This is a fatal error. Over-gamification creates 'Streak Creep'—users become loyal to the number, not the product. When the streak breaks, the user abandons the system entirely.",
    content: "If you rely on cheap dopamine, you are building a fragile empire.\n\nNearly every modern SaaS product attempts to artificially inflate engagement metrics by plugging in generic gamification: daily login streaks, arbitrary points, and badges mapping to meaningless milestones. This is what behavioral scientists call 'Streak Creep.' It is a fundamental miscalculation of human motivation.\n\nWhen a user interacts with a platform purely to maintain a streak, cognitive attachment shifts away from the core value proposition of the product and locks entirely onto the gamified mechanic. The product is no longer a tool; it is a chore. And what happens when the chore is missed? When a 120-day streak is broken because of a weekend trip or a server outage? \n\nThe motivation instantly collapses to zero. The user doesn't just stop playing the game—they abandon the platform entirely, feeling a sense of unearned failure. \n\nTrue architectural leverage means designing systems where the action itself is intrinsically rewarding. Do not engineer chores. Engineer frictionless paths to undeniable outcomes.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
    date: "03.02.2026"
  },
  {
    id: 2,
    title: "Weaponized Truth: Engineering Malinformation for Market Dominance",
    concept: "We focus so much on fighting fake news, we ignore the real threat: Malinformation. These are factually accurate statements decoupled from context, surgically deployed to manipulate perception and destroy competitor trust.",
    content: "Lies are inefficient. They leave a trail, they can be debunked, and they require constant maintenance to stay viable. The ultimate strategic weapon is not a falsehood; it is a weaponized truth.\n\nConsider 'Malinformation': content that is 100% factually accurate but intentionally framed out of context to inflict maximum psychological damage or manipulate a target audience. In competitive market positioning, malinformation is actively deployed to reframe a competitor’s strength as an unacceptable risk.\n\nIf a competitor touts a 'massive global support team of 10,000 agents,' malinformation doesn't deny the number. Instead, it highlights that 'our competitor requires 10,000 agents just to handle the volume of their failing deployments; we require zero.' The fact remains true. The perception is completely inverted.\n\nOur brains rely on rapid heuristics (mental shortcuts) to process data. When presented with a negative framing of a true fact, we instinctively attach the negative sentiment to the entire entity. If you are not actively architecting the context around your data, your competitors will gladly architect it for you.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop",
    date: "02.18.2026"
  },
  {
    id: 3,
    title: "Sensory Framing: Why Logical Arguments Fail 90% of the Time",
    concept: "You cannot change behavior with a spreadsheet. If a product feels cheap, light, or frictionless in the wrong ways, logical arguments regarding its superiority are discarded. Perception is dictated by sensory weight, not data.",
    content: "Stop trying to convince the market with bulleted feature lists and percentage points. The human brain does not make decisions based on localized data; it makes decisions based on localized feeling, and retroactively applies the data to justify the choice.\n\nTake sustainability, for example. For a decade, companies pushed green products using moral imperatives and logical data about carbon footprints. Consumers nodded, agreed it was important, and proceeded to buy the standard competitor. Why? Because the sustainable product felt light, flimsy, and packaged like an apology. \n\nWhen you redesign sustainable packaging to be heavy, textured, and colored with deep, saturated earth tones, the purchase rate skyrockets. The logical argument hasn't changed. The sensory framing has.\n\nThis applies directly to digital spaces. If your SaaS platform solves a million-dollar problem but looks like a generic template, it will be valued like a generic template. The speed of the animation, the contrast of the typography, the 'weight' of the button click—these are not aesthetic choices. They are cognitive anchors.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    date: "01.25.2026"
  },
  {
    id: 4,
    title: "The Ethical Compliance Fallacy: Morality as a Market Advantage",
    concept: "Treating ethics or compliance as a 'box-check' is a failure of imagination. When structured correctly, transparency and ethical architecture can be weaponized as an aggressive differentiator that competitors cannot afford to copy.",
    content: "Most corporate boards treat 'Ethical AI' or 'Data Compliance' as a tax—a burdensome set of legal hoops to jump through before launching a product. This is a defensive, weak posture.\n\nStrategic architecture demands that every constraint be converted into leverage. If the market is moving toward a highly scrutinized, low-trust environment regarding AI and data privacy, you do not quietly comply. You aggressively feature your structural transparency.\n\nYou build it into the UI. You make it a core marketing pillar. You position your competitor's 'black box' solutions not just as different, but as an existential liability to their customers' businesses. \n\nWhen ethics are treated as a compliance checklist, you spend money to break even. When ethics are treated as an architectural differentiator, you attract the highest caliber of talent, drastically reduce your timeline-to-trust with enterprise clients, and force your competitors into a defensive scramble where they must fundamentally rebuild their infrastructure just to sit at the same table.",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1600&auto=format&fit=crop",
    date: "01.10.2026"
  },
  {
    id: 5,
    title: "Homogeneous Blindspots: The Danger of Studying the Same People",
    concept: "Optimizing a product based on feedback from the same narrow demographic creates a devastating blind spot. Competitors who exploit culturally diverse and unconventional insights will capture the total addressable market.",
    content: "If your user testing and market research continually source from the same narrow demographic of early adopters or industry insiders, you are not optimizing a product. You are polishing an echo chamber.\n\nBehavioral science actively warns against homogeneous sampling because human decision-making heuristics shift wildly based on cultural context, economic pressure, and lived experience. A micro-interaction that feels 'seamless' to a tech worker in San Francisco might trigger deep suspicion in a logistics manager in Ohio.\n\nWhen we only study the people who already look and act like us, we design highly specialized solutions for a fractional market. The real leverage lies in finding the friction points of the outliers. \n\nThe companies that achieve absolute market dominance are the ones that study the edge cases. They architect systems that are robust enough to handle diverse psychological frameworks. Stop looking where the light is brightest; step into the blind spots and map the terrain before your competitors realize it exists.",
    image: "https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1600&auto=format&fit=crop",
    date: "12.15.2025"
  }
];

// Blog Article Modal
const BlogArticleModal = ({ article, onClose }) => {
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.article-modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo('.article-modal-content', { y: '100%' }, { y: '0%', duration: 0.6, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
    }
  }, [article]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
      <div className="article-modal-backdrop absolute inset-0 bg-mid-obsidian/90 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="article-modal-content relative w-full h-[90vh] sm:h-[85vh] max-w-4xl bg-mid-obsidian sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/5 rounded-t-[3rem] sm:rounded-b-[3rem]">

        {/* Header Visual */}
        <div className="relative h-64 sm:h-80 w-full shrink-0">
          <button onClick={onClose} className="absolute right-6 top-6 z-20 text-mid-ivory/50 hover:text-mid-ivory transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-mid-obsidian to-transparent"></div>

          <div className="absolute bottom-6 left-8 right-8">
            <span className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-3 block">{article.date}</span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-mid-ivory leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content Scroll */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 pb-24 invisible-scrollbar selection:bg-mid-champagne/30 selection:text-mid-champagne text-lg font-light leading-relaxed text-mid-ivory/80">
          <div className="mb-12 border-l-2 border-mid-champagne pl-6 bg-mid-champagne/5 p-6 rounded-r-2xl">
            <h3 className="font-sans font-bold text-mid-ivory text-xl mb-2">Core Concept //</h3>
            <p className="font-sans text-mid-ivory/90">{article.concept}</p>
          </div>

          <div className="space-y-6">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-4">
            <Activity className="w-5 h-5 text-mid-champagne" />
            <span className="font-data text-xs uppercase tracking-widest text-mid-ivory/40">End of Transmission</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog Page & Profile Modals
const BlogIndex = ({ onOpenContactModal }) => {
  const [activeBox, setActiveBox] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  const toggleBox = (box) => {
    setActiveBox(activeBox === box ? null : box);
  };

  return (
    <div className="min-h-screen w-full bg-mid-obsidian pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">

        {/* Header Title */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-mid-ivory">
            Strategic <span className="font-drama italic text-mid-champagne font-normal">Intelligence</span>
          </h1>
          <p className="mt-4 font-sans text-lg font-light text-mid-ivory/60 max-w-2xl">
            My credentials, philosophy, and field notes on perception architecture and behavioral leverage.
          </p>
        </div>

        {/* The 3 Interactive Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">

          {/* CV Box */}
          <div
            onClick={() => toggleBox('cv')}
            className={`group flex flex-col justify-between rounded-2xl border border-white/10 bg-glass-light p-8 cursor-pointer transition-all duration-500 hover:border-mid-champagne/30 hover:bg-white/10 ${activeBox === 'cv' ? 'ring-1 ring-mid-champagne' : ''}`}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-data text-xs text-mid-champagne tracking-widest uppercase">01 // History</span>
              <ArrowRight className={`w-5 h-5 text-mid-ivory/40 transition-transform duration-500 ${activeBox === 'cv' ? 'rotate-90 text-mid-champagne' : 'group-hover:translate-x-1'}`} />
            </div>
            <h3 className="font-sans text-2xl font-bold text-mid-ivory">Curriculum Vitae</h3>
          </div>

          {/* About Me Box */}
          <div
            onClick={() => toggleBox('about')}
            className={`group flex flex-col justify-between rounded-2xl border border-white/10 bg-glass-light p-8 cursor-pointer transition-all duration-500 hover:border-mid-champagne/30 hover:bg-white/10 ${activeBox === 'about' ? 'ring-1 ring-mid-champagne' : ''}`}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-data text-xs text-mid-champagne tracking-widest uppercase">02 // Philosophy</span>
              <ArrowRight className={`w-5 h-5 text-mid-ivory/40 transition-transform duration-500 ${activeBox === 'about' ? 'rotate-90 text-mid-champagne' : 'group-hover:translate-x-1'}`} />
            </div>
            <h3 className="font-sans text-2xl font-bold text-mid-ivory">About Me</h3>
          </div>

          {/* Contact Box */}
          <div
            onClick={() => {
              // Instead of expanding, just trigger the existing modal
              onOpenContactModal();
            }}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-mid-champagne/5 p-8 cursor-pointer transition-all duration-500 hover:border-mid-champagne hover:bg-mid-champagne/10"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-data text-xs text-mid-champagne tracking-widest uppercase">03 // Network</span>
              <ArrowRight className="w-5 h-5 text-mid-champagne transition-transform duration-500 group-hover:translate-x-1" />
            </div>
            <h3 className="font-sans text-2xl font-bold text-mid-chamapgne text-mid-champagne">Contact Me</h3>
          </div>
        </div>

        {/* Expandable Content Area for CV & About */}
        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${activeBox && activeBox !== 'contact' ? 'mb-24 opacity-100' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="bg-mid-slate-light border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

            {activeBox === 'cv' && (
              <div className="animate-fade-in-up flex flex-col lg:flex-row gap-12">
                {/* Left Column: Profile & Info */}
                <div className="w-full lg:w-1/3 flex flex-col gap-8">
                  <div className="p-1 rounded-3xl bg-gradient-to-br from-mid-champagne/40 to-transparent inline-block">
                    <img src="/tarik-headshot.png" alt="Tarik Omerović" className="w-full max-w-[280px] h-auto object-cover rounded-[1.4rem] grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>

                  <div>
                    <h4 className="font-sans text-2xl font-bold text-mid-ivory">TARIK OMEROVIĆ</h4>
                    <p className="font-drama italic text-xl text-mid-champagne mt-1">Perception Architect</p>

                    <div className="mt-6 space-y-3 font-data text-xs text-mid-ivory/60">
                      <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-mid-champagne" /> Sarajevo, B&H</p>
                      <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-mid-champagne" /> 3008.tcc@gmail.com</p>
                      <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-mid-champagne" /> +387 60 35 53 153</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h5 className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-4">Core Competencies</h5>
                    <ul className="space-y-2 font-sans font-light text-sm text-mid-ivory/80">
                      <li>Strategic Communication & SMM</li>
                      <li>High-Fidelity Asset Production</li>
                      <li>UI/UX & Structural Design</li>
                      <li>Authority Architecture (Leadership)</li>
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h5 className="font-data text-xs text-mid-champagne tracking-widest uppercase mb-4">Command Languages</h5>
                    <ul className="space-y-2 font-sans font-light text-sm text-mid-ivory/80">
                      <li className="flex justify-between items-center"><span>English</span> <span className="font-data text-[10px] text-mid-champagne/50 border border-mid-champagne/20 px-2 py-0.5 rounded">FLUENT</span></li>
                      <li className="flex justify-between items-center"><span>Italian</span> <span className="font-data text-[10px] text-mid-ivory/30 border border-white/10 px-2 py-0.5 rounded">B2 TARGET</span></li>
                      <li className="flex justify-between items-center"><span>German</span> <span className="font-data text-[10px] text-mid-ivory/30 border border-white/10 px-2 py-0.5 rounded">BASIC</span></li>
                    </ul>
                  </div>
                </div>

                {/* Right Column: Timeline */}
                <div className="w-full lg:w-2/3 border-l border-white/5 pl-0 lg:pl-12">
                  <h4 className="font-drama text-4xl italic text-mid-champagne mb-12 hidden lg:block">Professional History</h4>

                  <div className="space-y-12">
                    {/* IQOS */}
                    <div className="relative">
                      <div className="absolute -left-[7px] lg:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-mid-champagne ring-4 ring-mid-obsidian"></div>
                      <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">2024 — Present</span>
                      <h5 className="font-sans text-xl font-bold text-mid-ivory mt-2">Client Success & Direct Sales Expert</h5>
                      <p className="font-sans text-mid-champagne/80 text-sm mt-1">Boreas - IQOS</p>
                      <p className="font-sans text-mid-ivory/70 mt-3 font-light leading-relaxed">
                        Architecting direct consumer perception and brand authority in high-ticket retail environments. Executing strategic communication and personalized consultations to drive rapid acquisition and product education.
                      </p>
                    </div>

                    {/* Gen Success */}
                    <div className="relative">
                      <div className="absolute -left-[7px] lg:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-mid-slate ring-4 ring-mid-obsidian"></div>
                      <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">2023 — 2024</span>
                      <h5 className="font-sans text-xl font-bold text-mid-ivory mt-2">Digital Leverage Strategist</h5>
                      <p className="font-sans text-mid-champagne/80 text-sm mt-1">Generation Success</p>
                      <p className="font-sans text-mid-ivory/70 mt-3 font-light leading-relaxed">
                        Engineered comprehensive digital distribution strategies to dominate market visibility. Managed ecosystem growth and optimized visual narratives for maximum community capture.
                      </p>
                    </div>

                    {/* Korpa */}
                    <div className="relative">
                      <div className="absolute -left-[7px] lg:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-mid-slate ring-4 ring-mid-obsidian"></div>
                      <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">2021 — 2023</span>
                      <h5 className="font-sans text-xl font-bold text-mid-ivory mt-2">Creative Architect & Visual Designer</h5>
                      <p className="font-sans text-mid-champagne/80 text-sm mt-1">Korpa.ba</p>
                      <p className="font-sans text-mid-ivory/70 mt-3 font-light leading-relaxed">
                        Designed the visual touchpoints for a leading logistics delivery platform. Maintained strict brand consistency and aesthetic authority across nationwide marketing campaigns.
                      </p>
                    </div>

                    {/* Deepware */}
                    <div className="relative">
                      <div className="absolute -left-[7px] lg:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-mid-slate ring-4 ring-mid-obsidian"></div>
                      <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">2020 — 2021</span>
                      <h5 className="font-sans text-xl font-bold text-mid-ivory mt-2">Perception Director</h5>
                      <p className="font-sans text-mid-champagne/80 text-sm mt-1">Deepware.ai</p>
                      <p className="font-sans text-mid-ivory/70 mt-3 font-light leading-relaxed">
                        Directed the structural visual identity for a high-innovation tech brand. Translated complex data models into aggressive, market-ready aesthetics.
                      </p>
                    </div>

                    {/* Geek Design */}
                    <div className="relative">
                      <div className="absolute -left-[7px] lg:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-mid-slate ring-4 ring-mid-obsidian"></div>
                      <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">2019 — 2020</span>
                      <h5 className="font-sans text-xl font-bold text-mid-ivory mt-2">Lead Visual Producer</h5>
                      <p className="font-sans text-mid-champagne/80 text-sm mt-1">Geek Design</p>
                      <p className="font-sans text-mid-ivory/70 mt-3 font-light leading-relaxed">
                        Owned end-to-end asset production, from storyboarding to post-production editing. Architected strategic visual narratives and managed client acquisition lifecycles.
                      </p>
                    </div>

                    {/* Peruso */}
                    <div className="relative">
                      <div className="absolute -left-[7px] lg:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-mid-slate ring-4 ring-mid-obsidian"></div>
                      <span className="font-data text-xs text-mid-ivory/50 tracking-widest uppercase">2016 — 2019</span>
                      <h5 className="font-sans text-xl font-bold text-mid-ivory mt-2">Marketing & Design Associate</h5>
                      <p className="font-sans text-mid-champagne/80 text-sm mt-1">Peruso - Lampica</p>
                      <p className="font-sans text-mid-ivory/70 mt-3 font-light leading-relaxed">
                        Built foundational data on consumer behavior through asset creation and rigorous campaign execution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeBox === 'about' && (
              <div className="animate-fade-in-up">
                <h4 className="font-drama text-4xl italic text-mid-champagne mb-8">The Philosophy</h4>
                <div className="text-mid-ivory/80 font-light text-lg leading-relaxed max-w-3xl space-y-6">
                  <p>
                    I do not believe in standard "marketing." Most agencies focus on noise: more posts, more ads, more visible movement. They confuse activity with leverage.
                  </p>
                  <p>
                    I operate differently. My background is in behavioral psychology and data analysis. I look at markets as systems of perception. If you want to dominate a market, you don't out-shout your competitors; you redesign the environment so that choosing anyone else feels inherently risky to the prospect.
                  </p>
                  <p>
                    We build <strong className="font-bold text-mid-ivory">Authority Positions</strong>. We map out the biases of your target audience, configure the exact signals they unconsciously trust, and deploy them systematically. The result is a frictionless sales floor where you dictate the terms.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* The "Stolen Like An Artist" Feed */}
        <div className="mt-8">
          <h2 className="font-sans text-3xl font-bold text-mid-ivory mb-12 flex items-center gap-4">
            <span className="h-px bg-white/10 flex-1"></span>
            Field Notes
            <span className="h-px bg-white/10 flex-1"></span>
          </h2>

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-white/5 bg-mid-slate-light/30 hover:bg-glass hover:border-mid-champagne/20 transition-all duration-300 cursor-pointer overflow-hidden relative"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-mid-champagne/0 via-mid-champagne/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                {/* Thumbnail */}
                <div className="w-full md:w-48 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden relative bg-mid-champagne">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-mid-obsidian/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                </div>

                {/* Summary Details */}
                <div className="flex flex-col justify-center flex-1">
                  <span className="font-data text-[10px] text-mid-champagne tracking-widest uppercase mb-2 block">{post.date}</span>
                  <h3 className="font-sans text-2xl font-bold text-mid-ivory mb-3 group-hover:text-mid-champagne transition-colors">{post.title}</h3>
                  <p className="font-sans text-sm text-mid-ivory/60 line-clamp-3">
                    {post.concept}
                  </p>

                  <div className="mt-6 flex items-center text-xs font-bold font-data text-mid-ivory/40 uppercase tracking-widest group-hover:text-mid-ivory transition-colors">
                    Read Dispatch <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlogArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
    </div>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textModalState, setTextModalState] = useState({ isOpen: false, type: null });
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'biases'

  const handleOpenModal = () => setIsModalOpen(true);
  const handleOpenTextModal = (type) => setTextModalState({ isOpen: true, type });

  return (
    <main className="min-h-screen selection:bg-mid-champagne/30 selection:text-mid-champagne">
      <Navbar onOpenModal={handleOpenModal} currentView={currentView} setView={setCurrentView} />

      {currentView === 'home' && (
        <main className="w-full relative z-10 animate-fade-in-up">
          <Hero onOpenModal={handleOpenModal} setView={setCurrentView} />
          <AuthorityDataModule />
          <div className="relative z-10 bg-mid-obsidian pb-12 pt-24 text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-mid-ivory mb-4">The Architecture.</h2>
            <p className="font-sans font-light text-mid-ivory/60 max-w-xl mx-auto">Three core structural components deployed to eliminate your competition's relevance.</p>
          </div>
          <Features onOpenModal={handleOpenModal} />
          <Philosophy />
          <Protocol />
          <FinalCTA onOpenModal={handleOpenModal} />
        </main>
      )}
      {currentView === 'biases' && <BiasesIndex />}
      {currentView === 'blog' && <BlogIndex onOpenContactModal={handleOpenModal} />}

      <Footer setView={setCurrentView} onOpenContactModal={handleOpenModal} onOpenTextModal={handleOpenTextModal} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TextModal isOpen={textModalState.isOpen} type={textModalState.type} onClose={() => setTextModalState({ isOpen: false, type: null })} />
    </main>
  );
}

export default App;
