'use client';

import { useEffect, useState } from 'react';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: "Frameworks / Platforms",
      skills: [
        { name: "NextJS", level: 90 },
        { name: "NestJS", level: 75 },
        { name: "ReactJS", level: 95 },
        { name: "React Native", level: 85 },
        { name: "VueJS", level: 70 },
        { name: "Laravel", level: 80 },
        { name: "NodeJS", level: 75 }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "TypeScript", level: 90 },
        { name: "Javascript", level: 95 },
        { name: "PHP", level: 80 }
      ]
    },
    {
      title: "Tools and Technologies",
      skills: [
        { name: "Git", level: 85 },
        { name: "Github", level: 90 },
        { name: "Docker", level: 70 },
        { name: "VoIP SIP", level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kỹ Năng
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Các công nghệ và kỹ năng mà tôi đã tích lũy qua quá trình làm việc
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${skillIndex * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Kỹ Năng Bổ Sung
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Responsive Design",
                "API Integration",
                "State Management",
                "Testing",
                "Performance Optimization",
                "Code Review",
                "Agile/Scrum",
                "Problem Solving"
              ].map((skill, index) => (
                <div
                  key={index}
                  className="bg-accent text-accent-foreground p-4 rounded-lg text-center font-medium hover:bg-accent/80 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications/Achievements */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Thành Tựu & Chứng Chỉ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Frontend Development</h4>
                  <p className="text-muted-foreground text-sm">Chuyên gia React & Next.js</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Mobile Development</h4>
                  <p className="text-muted-foreground text-sm">React Native Expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Full-Stack Development</h4>
                  <p className="text-muted-foreground text-sm">Laravel & Node.js</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Performance Optimization</h4>
                  <p className="text-muted-foreground text-sm">High-performance applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
