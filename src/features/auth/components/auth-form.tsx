"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { Facebook, Mail, ArrowRight, User, Lock, Chrome, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { authService } from "../services/auth-service";
import { MailCheck } from "lucide-react";
import { useAuthStore } from "../stores/auth-store";

export const AuthForm = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await authService.login({
          email: formData.email,
          password: formData.password
        });
        login(response.user, response.access_token);
        toast.success(`Welcome back, ${response.user.username || "Traveler"}!`);

        router.refresh(); 

        setTimeout(() => {
            if (response.user.role === 'ADMIN') { 
                router.push('/admin');
            } else {
                router.push('/');
            }
        }, 100);

      } else {
        await authService.register({
          email: formData.email,
          password: formData.password,
          username: formData.username
        });
        setIsRegisterSuccess(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isRegisterSuccess) {
    return (
      <div className="w-full max-w-md mx-auto text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MailCheck size={40} className="text-forest" />
        </div>
        <h2 className="font-serif text-3xl text-forest mb-4">Verify your email</h2>
        <p className="text-jet/70 mb-8 leading-relaxed">
          We've sent a verification link to <span className="font-bold text-jet">{formData.email}</span>.<br />
          Please check your inbox (and spam folder) to activate your account.
        </p>

        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => window.open('https://gmail.com', '_blank')}
            className="w-full border-forest text-forest hover:bg-forest hover:text-sand h-12"
          >
            Open Gmail
          </Button>
          <button
            onClick={() => {
              setIsRegisterSuccess(false); // Quay lại form
              setIsLogin(true); // Chuyển sang tab Login
            }}
            className="text-sm text-jet/50 hover:text-terracotta underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center md:text-left">
        <h1 className="font-serif text-4xl text-forest mb-2">
          {isLogin ? "Welcome Back" : "Join the Journey"}
        </h1>
        <p className="text-jet/60 font-light">
          {isLogin
            ? "Tiếp tục hành trình khám phá những miền đất lạ."
            : "Tạo tài khoản để bắt đầu thiết kế chuyến đi của riêng bạn."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <AnimatePresence mode="popLayout" initial={false}>
          {!isLogin && (
            <motion.div
              key="username"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 overflow-hidden"
            >
              <Label className="text-xs font-bold uppercase tracking-widest text-jet/50">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-jet/30" size={18} />
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  required={!isLogin}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-sand-light border border-forest/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 transition-all text-jet disabled:opacity-50"
                />
              </div>
            </motion.div>
          )}

          <motion.div key="email" layout className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-jet/50">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-jet/30" size={18} />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="name@example.com"
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-sand-light border border-forest/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 transition-all text-jet disabled:opacity-50"
              />
            </div>
          </motion.div>

          <motion.div key="password" layout className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-bold uppercase tracking-widest text-jet/50">Password</Label>
              {isLogin && (
                <Link href="#" className="text-xs text-terracotta hover:underline">Forgot?</Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-jet/30" size={18} />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-sand-light border border-forest/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/50 transition-all text-jet disabled:opacity-50"
              />
            </div>
          </motion.div>

          <motion.div key="submit-btn" layout>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-forest hover:bg-forest/90 text-sand h-12 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </div>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </motion.div>

          <motion.div key="divider" layout className="relative text-center pt-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-jet/10"></div></div>
            <span className="relative bg-sand px-4 text-xs text-jet/40 uppercase tracking-widest">Or continue with</span>
          </motion.div>

          <motion.div key="socials" layout className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" disabled={isLoading} className="border-jet/10 hover:bg-white hover:border-terracotta text-jet/70 h-12">
              <Chrome size={20} className="mr-2" /> Google
            </Button>
            <Button type="button" variant="outline" disabled={isLoading} className="border-jet/10 hover:bg-white hover:border-terracotta text-jet/70 h-12">
              <Facebook size={20} className="mr-2" /> Facebook
            </Button>
          </motion.div>

        </AnimatePresence>

      </form>

      <div className="mt-8 text-center text-sm text-jet/60">
        {isLogin ? "Don't have an account yet? " : "Already have an account? "}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setIsLogin(!isLogin);
            setFormData({ username: "", email: "", password: "" });
          }}
          className="text-terracotta font-bold hover:underline ml-1 focus:outline-none disabled:opacity-50"
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>

    </div>
  );
};