"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "6281235873675";
  const defaultMessage = "Halo Coollabs! Saya ingin bertanya tentang platform kolaborasi project.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip/Message Bubble */}
        {isOpen && (
          <div className="bg-card border border-border rounded-2xl shadow-lg p-4 max-w-xs animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Coollabs Support</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Ada pertanyaan? Chat dengan kami via WhatsApp!
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-center rounded-lg font-medium transition-colors text-sm"
            >
              Chat Sekarang
            </a>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="WhatsApp Support"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
          
          {/* Icon */}
          <MessageCircle className="h-6 w-6 relative z-10" />
          
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            1
          </span>
        </button>
      </div>
    </>
  );
}
