"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";
import { SwitchFormProps } from "@/types";
import FieldForm from "../FieldForm";
import { API_URL } from "@/utils/route";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const LoginForm = ({ onSwitch, onRecovery }: SwitchFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка авторизации");
      }
    } catch (error) {
      console.log(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      title="Вход"
      loading={loading}
      error={error}
      action="Войти"
      secondAction="Входим..."
      footerText={
        <>
          <span>У вас еще нет аккаунта?</span>{" "}
          <button
            className="underline underline-offset-4 cursor-pointer"
            onClick={onSwitch}
          >
            Зарегистрироваться
          </button>
        </>
      }
    >
      <FieldForm
        label="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        placeholder="eye@example.com"
      />
      <div className="relative">
        <FieldForm
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "password" : "text"}
          id="password"
          recovery={
            <button
              onClick={onRecovery}
              className="ml-auto underline-offset-4 hover:underline text-xs md:text-sm"
            >
              Забыли пароль?
            </button>
          }
        />
        <button
          type="button"
          className="absolute right-3 top-[34px]"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
        >
          {showPassword ? <EyeClosedIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </div>
    </AuthForm>
  );
};
export default LoginForm;
