"use client";

import { useState } from "react";
import { Mail, Lock, User, Chrome, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation
  const passwordsMatch = password === confirmPassword;
  const showPasswordError = confirmPassword.length > 0 && !passwordsMatch;

  // Password strength validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  const passwordStrengthChecks = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
  ];
  
  const passwordStrength = passwordStrengthChecks.filter(Boolean).length;
  const isPasswordStrong = passwordStrength === 4;

  const handleSubmit = (e: React.FormEvent, type: "login" | "register") => {
    e.preventDefault();
    
    // Validate password match and strength for register
    if (type === "register") {
      if (!passwordsMatch) return;
      if (!isPasswordStrong) return;
    }
    
    // TODO: Implement actual authentication logic
    if (type === "login") {
      console.log("Login:", { email, password });
    } else {
      console.log("Register:", { email, password });
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Login with Google");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Logo Header */}
        <div className="flex justify-center pt-2 pb-4">
          {/* Light mode logo */}
          <Image
            src="/logo-white-mode.svg"
            alt="Logo"
            width={80}
            height={80}
            className="dark:hidden"
            priority
          />
          {/* Dark mode logo */}
          <Image
            src="/logo-dark-mode.svg"
            alt="Logo"
            width={80}
            height={80}
            className="hidden dark:block"
            priority
          />
        </div>

        <DialogHeader className="space-y-1 pb-4">
          <DialogTitle className="font-bold text-center">
            Selamat Datang
          </DialogTitle>
          <DialogDescription className="text-center">
            Masuk atau daftar untuk melanjutkan akses ke semua fitur kami.
          </DialogDescription>
        </DialogHeader>


        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Login & Apply
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Atau lanjutkan dengan
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Google
            </Button>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength === 1
                              ? "w-1/4 bg-red-500"
                              : passwordStrength === 2
                              ? "w-2/4 bg-orange-500"
                              : passwordStrength === 3
                              ? "w-3/4 bg-yellow-500"
                              : passwordStrength === 4
                              ? "w-full bg-green-500"
                              : "w-0"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength === 1
                            ? "text-red-500"
                            : passwordStrength === 2
                            ? "text-orange-500"
                            : passwordStrength === 3
                            ? "text-yellow-500"
                            : passwordStrength === 4
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        {passwordStrength === 1
                          ? "Lemah"
                          : passwordStrength === 2
                          ? "Sedang"
                          : passwordStrength === 3
                          ? "Bagus"
                          : passwordStrength === 4
                          ? "Kuat"
                          : ""}
                      </span>
                    </div>
                    
                    {/* Requirements Checklist */}
                    <div className="space-y-1 text-xs">
                      <div className={`flex items-center gap-2 ${hasMinLength ? "text-green-500" : "text-muted-foreground"}`}>
                        <span>{hasMinLength ? "✓" : "○"}</span>
                        <span>Minimal 8 karakter</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasUpperCase ? "text-green-500" : "text-muted-foreground"}`}>
                        <span>{hasUpperCase ? "✓" : "○"}</span>
                        <span>Huruf besar (A-Z)</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasLowerCase ? "text-green-500" : "text-muted-foreground"}`}>
                        <span>{hasLowerCase ? "✓" : "○"}</span>
                        <span>Huruf kecil (a-z)</span>
                      </div>
                      <div className={`flex items-center gap-2 ${hasNumber ? "text-green-500" : "text-muted-foreground"}`}>
                        <span>{hasNumber ? "✓" : "○"}</span>
                        <span>Angka (0-9)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Konfirmasi Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 pr-10 ${
                      showPasswordError
                        ? "border-red-500 focus-visible:ring-red-500"
                        : passwordsMatch && confirmPassword.length > 0
                        ? "border-green-500 focus-visible:ring-green-500"
                        : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {/* Error/Success Message */}
                {confirmPassword.length > 0 && (
                  <p
                    className={`text-xs ${
                      showPasswordError ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {showPasswordError
                      ? "❌ Password tidak cocok"
                      : "✓ Password cocok"}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  showPasswordError || 
                  !passwordsMatch || 
                  !isPasswordStrong || 
                  confirmPassword.length === 0
                }
              >
                Daftar & Apply
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Atau lanjutkan dengan
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Google
            </Button>
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Dengan melanjutkan, kamu menyetujui{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          dan{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
