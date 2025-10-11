'use client';

import { useEffect, useState } from 'react';

const EducationSection = () => {
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

    const element = document.getElementById('education');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const education = [
    {
      degree: "Kỹ sư Công nghệ Thông tin",
      school: "Đại học Công nghệ Thông tin và Truyền Thông Việt - Hàn ",
      period: "2020 - 2025",
      location: "Đà Nẵng, Việt Nam",
      description: "Chuyên ngành Công nghệ Thông tin kỹ thuật phần mềm với focus vào phát triển phần mềm và hệ thống thông tin."
    }
  ];

  const certifications = [
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
      description: "Chứng chỉ phát triển ứng dụng React từ Meta"
    },
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      description: "Chứng chỉ cơ bản về AWS Cloud"
    },
    {
      name: "TypeScript Fundamentals",
      issuer: "Microsoft",
      date: "2022",
      description: "Khóa học cơ bản về TypeScript"
    }
  ];

  return (
    <section id="education" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Học Vấn & Chứng Chỉ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hành trình học tập và các chứng chỉ đã đạt được
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Education */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Học Vấn
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {edu.degree}
                      </h4>
                      <div className="text-primary font-medium mb-2">
                        {edu.school}
                      </div>
                      <div className="text-muted-foreground text-sm mb-2">
                        {edu.period} • {edu.location}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {edu.description}
                      </p>
                    </div>
                  </div>

                  {/* Achievements */}
                  {/*<div>*/}
                  {/*  <h5 className="text-sm font-semibold text-foreground mb-2">Thành tích:</h5>*/}
                  {/*  <ul className="space-y-1">*/}
                  {/*    {edu.achievements.map((achievement, achIndex) => (*/}
                  {/*      <li key={achIndex} className="text-sm text-muted-foreground flex items-start">*/}
                  {/*        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>*/}
                  {/*        {achievement}*/}
                  {/*      </li>*/}
                  {/*    ))}*/}
                  {/*  </ul>*/}
                  {/*</div>*/}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {/*<div>*/}
          {/*  <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">*/}
          {/*    Chứng Chỉ & Khóa Học*/}
          {/*  </h3>*/}
          {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
          {/*    {certifications.map((cert, index) => (*/}
          {/*      <div key={index} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">*/}
          {/*        <div className="flex items-start space-x-4">*/}
          {/*          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">*/}
          {/*            <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
          {/*              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />*/}
          {/*            </svg>*/}
          {/*          </div>*/}
          {/*          <div className="flex-1">*/}
          {/*            <h4 className="font-semibold text-foreground mb-1">*/}
          {/*              {cert.name}*/}
          {/*            </h4>*/}
          {/*            <div className="text-primary text-sm font-medium mb-1">*/}
          {/*              {cert.issuer}*/}
          {/*            </div>*/}
          {/*            <div className="text-muted-foreground text-xs mb-2">*/}
          {/*              {cert.date}*/}
          {/*            </div>*/}
          {/*            <p className="text-muted-foreground text-sm">*/}
          {/*              {cert.description}*/}
          {/*            </p>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
