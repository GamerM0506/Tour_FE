"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { authService } from "@/features/auth/services/auth-service";
import { Button } from "@/core/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

// Component con để xử lý logic lấy param (Bắt buộc bọc trong Suspense)
const VerifyContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(res.message || "Your email has been successfully verified! You can log in now");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Verification failed. The link may be expired.");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-sand-light text-center">
      
      {/* 1. TRẠNG THÁI LOADING */}
      {status === "loading" && (
        <div className="py-10">
          <Loader2 size={48} className="animate-spin text-terracotta mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-forest">Verifying...</h2>
          <p className="text-jet/60 mt-2">Please wait while we activate your account.</p>
        </div>
      )}

      {/* 2. TRẠNG THÁI THÀNH CÔNG (SUCCESS) */}
      {status === "success" && (
        <div className="py-6 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="font-serif text-2xl text-forest mb-2">Verified!</h2>
          
          {/* 👇 Hiển thị dòng JSON message của bạn ở đây */}
          <p className="text-jet/70 mb-8 px-4 font-medium">
            "{message}"
          </p>

          <Link href="/auth">
            <Button className="w-full bg-forest hover:bg-forest/90 text-sand h-12 rounded-lg font-bold uppercase tracking-wider">
              Log In Now
            </Button>
          </Link>
        </div>
      )}

      {/* 3. TRẠNG THÁI LỖI (ERROR) */}
      {status === "error" && (
        <div className="py-6 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={36} />
          </div>
          <h2 className="font-serif text-2xl text-red-700 mb-2">Verification Failed</h2>
          <p className="text-jet/60 mb-8">{message}</p>
          
          <Link href="/auth">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

// Trang chính (Wrapper)
export default function VerifyPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-sand px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-forest/5 rounded-full blur-[100px]"></div>
         <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-terracotta/5 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Suspense là bắt buộc khi dùng useSearchParams trong Next.js App Router */}
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}