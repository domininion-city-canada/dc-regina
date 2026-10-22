
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SalvationForm from '@/components/SalvationForm';
import { ArrowRight, Phone, Heart, Shield, Cross, Zap, Calendar } from 'lucide-react';

const NewLifePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent-yellow selection:text-background">
            <SEO
                title="New Life"
                description="The Message That Changes Everything: Find Your True Identity, Purpose, and Power."
            />
            <Header />

            <main className="flex-grow pt-24 pb-16 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />
                <div className="absolute bottom-40 left-0 w-72 h-72 bg-accent-yellow/10 rounded-full blur-3xl -z-10 animate-pulse-glow delay-1000" />

                {/* Hero Section */}
                <section className="container mx-auto mb-16 md:mb-20 text-center">
                    <div className="inline-block mb-6 animate-fade-in-up">
                        <span className="sticker-badge sticker-badge-coral text-sm sm:text-base rotate-2">
                            The Message That Works
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight max-w-5xl mx-auto animate-fade-in-up stagger-1">
                        The Message That <span className="text-accent-coral">Changes</span> Everything
                    </h1>

                    <p className="text-xl sm:text-2xl text-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in-up stagger-2">
                        Find Your True Identity, Purpose, and Power
                    </p>

                    <div className="h-1 w-24 bg-accent-yellow mx-auto rounded-full mb-12 animate-fade-in-up stagger-3" />

                    <div className="card-brutal p-6 sm:p-12 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-500 animate-fade-in-up stagger-4">
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 mb-6">
                            Have you ever felt like you were meant for more? That deep down, you possess a strength, a calling, or a brilliance that the chaos of the world keeps covering up?
                        </p>
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/90">
                            Many people search for answers in self-help books, philosophies, or fleeting achievements, yet still feel an emptiness inside. But there is one message—a message of power, love, and ultimate purpose—that cuts through all the noise. It is <span className="font-bold text-accent-yellow">The Message That Works</span>, and it doesn't just promise change; it guarantees a radical, lasting transformation.
                        </p>
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 mt-4">
                            This message is your key to moving from feeling lost, broken, or powerless to stepping fully into your divine destiny.
                        </p>
                    </div>
                </section>

                {/* Core Content Sections */}
                <section className="container mx-auto mb-20 md:mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                        {/* Point 1 */}
                        <div className="card-brutal group border-accent-coral/20 hover:border-accent-coral/50">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-accent-coral/20 rounded-xl text-accent-coral group-hover:bg-accent-coral group-hover:text-white transition-colors duration-300">
                                    <Heart size={32} />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold pt-1">You Are God’s Masterpiece, Not an Accident</h2>
                            </div>
                            <div className="space-y-4 text-foreground/90 leading-relaxed">
                                <p>
                                    The journey begins with your origin. Forget the limitations the world has tried to place on you. The foundational truth is this: <strong>You are a deliberate masterpiece of a loving Creator.</strong>
                                </p>
                                <p>
                                    The story of creation tells us that when God made man, He didn't just create another creature; He created a creator in His own image and likeness. You were designed with the DNA of dominion, made to rule, innovate, and thrive. This is your core identity. Any sense of failure, inferiority, or confusion is simply a distraction from this magnificent truth. You were made for greatness.
                                </p>
                            </div>
                        </div>

                        {/* Point 2 */}
                        <div className="card-brutal group border-red-500/20 hover:border-red-500/50">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-red-500/20 rounded-xl text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                    <Shield size={32} />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold pt-1">The Great Distortion: Who Caused the Problem?</h2>
                            </div>
                            <div className="space-y-4 text-foreground/90 leading-relaxed">
                                <p>
                                    If you were created so perfectly, why is the world so full of pain, sickness, addiction, and disappointment?
                                </p>
                                <p>
                                    This is where the message brings clarity: God is not the source of the world’s problems, and neither is the Church. The moment God granted humanity the gift of free will—the power to choose love, not simply be a programmed robot—He took a risk.
                                </p>
                                <p>
                                    When the enemy, Satan, introduced deception and man chose rebellion, that original masterpiece design was distorted. Every problem you see today—the broken systems, the societal evils, the personal struggles—are the consequences of that initial distortion. They are the results of the enemy’s work, not God’s will.
                                </p>
                            </div>
                        </div>

                        {/* Point 3 */}
                        <div className="card-brutal group border-accent-yellow/20 hover:border-accent-yellow/50">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-accent-yellow/20 rounded-xl text-accent-yellow group-hover:bg-accent-yellow group-hover:text-background transition-colors duration-300">
                                    <Cross size={32} />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold pt-1">The Active Ingredient: Christ’s Complete Cure</h2>
                            </div>
                            <div className="space-y-4 text-foreground/90 leading-relaxed">
                                <p>
                                    The amazing news is that the Creator who saw His masterpiece broken was moved by relentless, overwhelming love. This love led to the "active ingredient" of the message: <strong>The Cross.</strong>
                                </p>
                                <p>
                                    We needed a cure, but first, we needed a diagnosis. The moment you acknowledge the emptiness, the sin, or the need for something more, you are ready for the remedy. Jesus Christ stepped in as your Substitution. He paid the ultimate price, dying on the cross to completely solve the problem of sin and restore your relationship with God.
                                </p>
                                <p>
                                    He didn’t just patch you up; He performed a complete restoration, as if the failure never happened. This finished work on the cross is the power of God unto salvation (Romans 1:16).
                                </p>
                            </div>
                        </div>

                        {/* Point 4 */}
                        <div className="card-brutal group border-accent-blue/20 hover:border-accent-blue/50">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-accent-blue/20 rounded-xl text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                                    <Zap size={32} />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold pt-1">Your Mandate: Restoration, Mission, and Power</h2>
                            </div>
                            <div className="space-y-4 text-foreground/90 leading-relaxed">
                                <p>
                                    When you receive the solution Christ offered by faith, you are not just saved; you are restored to your original mandate. You move from being a self-centered individual looking for blessings to becoming a fully equipped son or daughter of God, ready to execute your higher purpose on Earth.
                                </p>
                                <p>
                                    This is the Kingdom Gospel. The mission of Christ is now your mission: to use your platform (whether you are a doctor, student, businessperson, or artist) as a base to implement God's kingdom and transform your sphere of influence. You are no longer waiting for a miracle; you are the answer that your community, your workplace, and your family have been looking for.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Response — the page argues for a decision, so it has to
                    offer somewhere to make one. */}
                <section className="container mx-auto mb-16 md:mb-20 max-w-2xl">
                    <SalvationForm />
                </section>

                {/* CTA Section */}
                <section className="container mx-auto mb-20">
                    <div className="bg-gradient-to-br from-accent-indigo via-accent-indigo/80 to-accent-indigo/60 rounded-3xl p-6 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 relative z-10">
                            Take the Next Step Today
                        </h2>
                        <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed relative z-10">
                            The message works not only to save your soul but to reshape your entire life and destiny. If you are ready to receive this transformation—if you want to know your identity, live in your purpose, and wield the power of God in your life—your next step is simple.
                        </p>
                        <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed relative z-10">
                            The power of this message is found in community and guided discipleship. We want to welcome you home and help you move from redemption to restoration and mission.
                        </p>
                        <p className="text-base sm:text-xl font-bold text-white max-w-3xl mx-auto mb-10 leading-relaxed relative z-10">
                            Don't wait. Take the first step toward your new life right now:
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center relative z-10">
                            <Link
                                to="/next-steps"
                                className="btn-brutal btn-brutal-yellow flex w-full items-center justify-center gap-2 group sm:w-auto"
                            >
                                Take a next step
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/find-us"
                                className="btn-brutal btn-brutal-blue flex w-full items-center justify-center gap-2 group sm:w-auto"
                            >
                                <Calendar size={20} />
                                Plan Your Visit
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="mt-12 relative z-10">
                            <p className="font-bold text-xl sm:text-2xl text-accent-yellow italic">
                                "You are a master of creation. Come and learn how to master your world."
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default NewLifePage;
