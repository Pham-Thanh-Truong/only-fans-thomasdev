'use client';

import { useEffect, useState } from 'react';

const AboutSection = () => {
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

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Về Tôi
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tìm hiểu thêm về hành trình phát triển và đam mê của tôi trong lĩnh vực công nghệ
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Chào mừng đến với portfolio của tôi!
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tôi là Pham Thanh Truong, một Front-End Developer đam mê với 3 năm kinh nghiệm 
                trong việc phát triển các ứng dụng web và mobile hiện đại. Tôi chuyên về việc 
                tạo ra những giao diện người dùng đẹp mắt, responsive và có hiệu suất cao.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Với kinh nghiệm làm việc tại Mudbath, tôi đã có cơ hội tham gia vào nhiều dự án 
                thú vị, từ việc phát triển ứng dụng web với Next.js đến việc xây dựng ứng dụng 
                mobile với React Native. Tôi cũng có kinh nghiệm với các công nghệ backend như 
                Laravel và Node.js.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Tôi luôn tìm kiếm những thách thức mới và cơ hội để học hỏi những công nghệ 
                mới nhất. Mục tiêu của tôi là tạo ra những sản phẩm chất lượng cao, mang lại 
                trải nghiệm tuyệt vời cho người dùng.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">3+ năm kinh nghiệm</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Frontend & Mobile</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">React & Next.js</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">TypeScript Expert</span>
              </div>
            </div>
          </div>

          {/* Stats/Info Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-muted-foreground">Năm kinh nghiệm</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Dự án hoàn thành</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Công nghệ chính</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Cam kết chất lượng</div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="text-lg font-semibold text-foreground mb-4">Thông tin cá nhân</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuổi:</span>
                  <span className="text-foreground">26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Địa chỉ:</span>
                  <span className="text-foreground">Đà Nẵng, Việt Nam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">thanhtruongdn@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Điện thoại:</span>
                  <span className="text-foreground">(+84) 382 848 272</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
