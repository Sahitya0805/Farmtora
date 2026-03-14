'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Leaf, CloudRain, ShieldAlert, Search, ArrowRight, Zap, Target, Cpu, Globe } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { useLenis } from 'lenis/react';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const lenis = useLenis();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary/30">

      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-farm-emerald/20 via-background to-background dark:opacity-100 opacity-0 transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-farm-green/10 via-[#fcfdfa] to-white dark:opacity-0 opacity-100 transition-opacity duration-1000" />

        {/* Animated Blobs with farming colors */}
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-farm-emerald/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob dark:bg-farm-emerald/30 transform-gpu will-change-transform pointer-events-none" />
        <div className="absolute top-20 -right-20 w-[600px] h-[600px] bg-farm-sun/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 dark:bg-farm-sun/30 transform-gpu will-change-transform pointer-events-none" />
        <div className="absolute -bottom-40 left-1/2 w-[900px] h-[900px] bg-farm-sky/20 rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-4000 dark:bg-farm-sky/30 transform-gpu will-change-transform pointer-events-none" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">

        {/* HERO SECTION */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-32 pb-24"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none z-0 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <source src="https://cdn.pixabay.com/video/2016/06/07/3394-170707743_large.mp4" type="video/mp4" />
          </video>

          {/* Organic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-0 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">

            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-farm-emerald/30 text-farm-emerald font-black text-xs uppercase tracking-[0.2em] mb-12 animate-float-slow shadow-[0_0_25px_rgba(16,185,129,0.4)] bg-white/5"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Modern Agriculture AI Ecosystem</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-7xl md:text-[10rem] font-black tracking-[-0.05em] mb-10 leading-[0.85] text-foreground"
            >
              Agri<span className="text-farm-emerald brightness-110 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">vent</span> <br />
              <span className="text-gradient from-farm-emerald via-farm-sun to-farm-sky animate-shimmer bg-[length:200%_auto] tracking-[-0.02em]">
                Intelligent.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-xl md:text-3xl text-muted-foreground font-bold leading-tight mb-16 tracking-tight opacity-80"
            >
              The ultimate high-performance AI platform for modern farming. <span className="text-foreground">Deterministic diagnostics</span> & actionable regional intelligence.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-2xl mx-auto"
            >
              <button
                onClick={() => {
                  lenis?.scrollTo('#features');
                }}
                className="group relative px-12 py-7 w-full sm:w-auto bg-farm-emerald text-black rounded-3xl font-black text-2xl transition-all duration-500 hover:scale-105 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_30px_60px_-10px_rgba(16,185,129,0.7)] flex items-center justify-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Explore Platform
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                className="px-10 py-6 w-full sm:w-auto glass border-white/20 text-foreground rounded-3xl font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Target className="w-5 h-5" />
                Our Impact
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* COMPREHENSIVE PLATFORM OVERVIEW */}
        <motion.section
          id="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full py-32 relative overflow-hidden bg-background"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-24 relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-xl bg-farm-emerald/10 text-farm-emerald font-black text-[10px] uppercase tracking-widest mb-6 border border-farm-emerald/20">
                Core Capabilities
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-black">
                Unified Intelligence
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                Experience the next generation of precision farming through our integrated AI pillars.
              </p>
            </motion.div>

            {/* BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  title: 'Weather Analytics',
                  desc: 'Hyper-local climate modeling with serverless predictive algorithms.',
                  icon: <CloudRain className="w-10 h-10 text-farm-sky group-hover:animate-float-fast" />,
                  color: 'from-farm-sky/30 to-blue-500/10',
                  glow: 'hover:shadow-[0_30px_60px_-15px_rgba(56,189,248,0.4)]',
                  route: '/weather',
                  border: 'hover:border-farm-sky/40'
                },
                {
                  title: 'Crop Diagnostics',
                  desc: 'Visual transformer models for millisecond crop disease identification.',
                  icon: <Leaf className="w-10 h-10 text-farm-emerald group-hover:animate-spin-slow" />,
                  color: 'from-farm-emerald/30 to-green-500/10',
                  glow: 'hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)]',
                  route: '/crops',
                  border: 'hover:border-farm-emerald/40'
                },
                {
                  title: 'Livestock Monitoring',
                  desc: 'Deterministic computer vision for breed classification & health alerts.',
                  icon: <ShieldAlert className="w-10 h-10 text-rose-500 group-hover:animate-pulse-slow" />,
                  color: 'from-rose-500/30 to-red-500/10',
                  glow: 'hover:shadow-[0_30px_60px_-15px_rgba(244,63,94,0.4)]',
                  route: '/cattle',
                  border: 'hover:border-rose-400/40'
                },
                {
                  title: 'Soil Optimization',
                  desc: 'Deep sub-surface quality analytics for optimized crop scheduling.',
                  icon: <Search className="w-10 h-10 text-farm-sun group-hover:scale-110 transition-transform duration-500" />,
                  color: 'from-farm-sun/30 to-orange-500/10',
                  glow: 'hover:shadow-[0_30px_60px_-15px_rgba(251,191,36,0.4)]',
                  route: '/soil',
                  border: 'hover:border-farm-sun/40'
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  onClick={() => router.push(feature.route)}
                  className={`
                    group cursor-pointer rounded-[3rem] p-10 glass-card
                    transition-all duration-700 hover:-translate-y-5 relative overflow-hidden backdrop-blur-3xl
                    border-2 border-white/10 ${feature.border} ${feature.glow}
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />

                  <div className="relative z-10 h-full flex flex-col justify-start">
                    <div className="p-5 rounded-[2rem] glass w-fit mb-8 border-2 border-white/20 group-hover:bg-white/10 transition-all duration-500 group-hover:rotate-[5deg]">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:text-foreground transition-all leading-tight">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-bold text-lg group-hover:text-foreground/90 transition-colors flex-grow">
                      {feature.desc}
                    </p>

                    <div className="mt-10 flex items-center text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-all">
                      Access Module <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* WHY CHOOSE AGRIVENT */}
        <section className="w-full py-40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="inline-flex py-2 px-4 rounded-xl bg-farm-emerald/10 text-farm-emerald border border-farm-emerald/20 font-black uppercase tracking-[0.3em] text-[10px]">
                  Precision Infrastructure
                </div>
                <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                  Engineered for <br /><span className="text-gradient from-farm-emerald via-farm-green to-farm-sky">Extreme Yield.</span>
                </h2>
                <p className="text-2xl text-muted-foreground leading-relaxed font-bold opacity-80 max-w-xl">
                  Leveraging serverless edge computing and neural-network diagnostics to deliver instantaneous, deterministic agricultural intelligence.
                </p>

                <div className="grid grid-cols-1 gap-6 pt-6">
                  {[
                    { title: "Edge-First AI", desc: "No latency. High accuracy. Local processing.", icon: <Cpu className="text-farm-sky w-6 h-6" /> },
                    { title: "Global Scale", desc: "Multi-language support for diverse regions.", icon: <Globe className="text-farm-green w-6 h-6" /> },
                    { title: "100% Deterministic", desc: "Consistency you can bet your harvest on.", icon: <Target className="text-farm-emerald w-6 h-6" /> }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-6 glass p-6 rounded-[2.5rem] bg-card/10 border-white/10 hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-4 bg-background rounded-2xl shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                      <div>
                        <h4 className="font-black text-xl mb-1">{item.title}</h4>
                        <p className="text-base text-muted-foreground font-bold">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[700px] w-full rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] group flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-farm-emerald/40 via-background/40 to-farm-sky/40 pointer-events-none z-10 mix-blend-overlay" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute w-[180%] h-[180%] object-cover opacity-40 mix-blend-screen grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] z-0 pointer-events-none"
                >
                  <source src="https://joy.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4" type="video/mp4" />
                </video>
                <div className="relative z-20 flex flex-col items-center justify-center p-12 bg-black/60 backdrop-blur-2xl rounded-[3rem] border-2 border-white/20 shadow-2xl animate-float-medium max-w-sm mx-auto">
                  <div className="w-32 h-32 rounded-full bg-farm-emerald/20 flex items-center justify-center mb-8 pulse-slow border border-farm-emerald/40">
                    <Leaf className="w-16 h-16 text-farm-emerald drop-shadow-[0_0_20px_rgba(16,185,129,1)]" />
                  </div>
                  <h3 className="text-4xl font-black text-white text-center leading-tight">Data-Driven <br />Agriculture</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full py-40 mb-20 relative"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden border-2 border-farm-emerald/30 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.3)] bg-gradient-to-br from-farm-emerald/10 via-background to-farm-sky/10">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-farm-emerald/20 rounded-full blur-[100px] -z-10 animate-blob" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-farm-sky/20 rounded-full blur-[100px] -z-10 animate-blob animation-delay-4000" />

              <div className="relative z-10">
                <h2 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter leading-[0.9] py-4">
                  Start Your <br />
                  <span className="text-farm-emerald drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">Intelligence.</span>
                </h2>
                <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-3xl mx-auto font-bold opacity-80">
                  Join the elite circle of modern farmers leveraging the world's most advanced agricultural AI ecosystem.
                </p>
                <button
                  onClick={() => router.push('/weather')}
                  className="group px-12 py-6 bg-farm-emerald text-black rounded-[2rem] font-black text-2xl transition-all duration-500 hover:scale-110 shadow-[0_30px_60px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_40px_80px_-10px_rgba(16,185,129,0.8)] flex items-center justify-center gap-6 mx-auto"
                >
                  Launch App
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
