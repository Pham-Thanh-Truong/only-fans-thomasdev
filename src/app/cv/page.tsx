'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslationContext } from '@/components/TranslationProvider';

// Dynamic import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Đang tải PDF viewer...</p>
      </div>
    </div>
  ),
});

const CVPage = () => {
  const { t } = useTranslationContext();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t('cv.backToPortfolio')}
            </Link>
            <h1 className="text-xl font-semibold text-foreground">
              {t('cv.title')}
            </h1>
            <a
              href="/assets/thomaspham-junior-cv.pdf"
              download="Pham-Thanh-Truong-CV.pdf"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('cv.downloadCV')}
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <PDFViewer file="/assets/thomaspham-junior-cv.pdf" />
        </div>

        {/* Navigation Help */}
        <div className="mt-8 bg-muted rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Hướng dẫn xem CV
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Điều hướng:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sử dụng nút &quot;Trước/Sau&quot; để chuyển trang</li>
                <li>• Scroll để phóng to/thu nhỏ</li>
                <li>• Click và kéo để di chuyển</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Tải xuống:</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Nếu bạn muốn lưu CV về máy hoặc xem offline:
              </p>
              <a
                href="/assets/thomaspham-junior-cv.pdf"
                download="Pham-Thanh-Truong-CV.pdf"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Tải CV (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPage;
