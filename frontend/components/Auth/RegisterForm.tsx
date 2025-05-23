"use client";

import { SwitchFormProps } from "@/types";
import { useState } from "react";
import AuthForm from "./AuthForm";
import FieldForm from "../FieldForm";
import { API_URL } from "@/utils/route";
import BtnShowPassword from "../BtnShowPassword";

const RegisterForm = ({ onSwitch }: SwitchFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorValue, setErrorValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [code, setCode] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setErrorValue("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при регистрации");
      }

      setStep(2);
    } catch (error) {
      console.error(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          passwordTwo,
          code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при регистрации");
      }
    } catch (error) {
      console.error(error);
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentHandler = () => {
    switch (step) {
      case 1:
        return handleSubmit;
      case 2:
        return handleCodeConfirm;
    }
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={getCurrentHandler()}
      loading={loading}
      error={error}
      action={step === 1 ? "Зарегистрироваться" : "Подтвердить"}
      secondAction={step === 1 ? "Регистрируем..." : "Подтверждаем..."}
      footerText={
        <>
          <span>У вас уже есть аккаунт? </span>
          <button
            type="button"
            onClick={onSwitch}
            className="underline underline-offset-4 cursor-pointer"
          >
            Войти
          </button>
        </>
      }
    >
      {step === 1 && (
        <>
          <FieldForm
            label="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            errorValue={errorValue}
            id="email"
            placeholder="eye@example.com"
          />
          <FieldForm
            label="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            errorValue={errorValue}
            id="firstName"
            placeholder="Иван"
          />
          <FieldForm
            label="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            errorValue={errorValue}
            id="lastName"
            placeholder="Золиков"
          />
          <div className="relative">
            <FieldForm
              label="Пароль"
              value={password}
              errorValue={errorValue}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
            />
            <BtnShowPassword
              onClick={() => setShowPassword(!showPassword)}
              show={showPassword}
            />
          </div>
          <div className="relative">
            <FieldForm
              label="Повторите пароль"
              value={passwordTwo}
              errorValue={errorValue}
              onChange={(e) => setPasswordTwo(e.target.value)}
              type={showNewPassword ? "text" : "password"}
              id="passwordTwo"
            />
            <BtnShowPassword
              onClick={() => setShowNewPassword(!showNewPassword)}
              show={showNewPassword}
            />
          </div>
        </>
      )}
      {step === 2 && (
        <FieldForm
          label="Шестизначный код"
          value={code}
          errorValue={errorValue}
          onChange={(e) => setCode(e.target.value)}
          type="number"
          id="code"
          placeholder="123456"
          maxLength={6}
        />
      )}
    </AuthForm>
  );
};
export default RegisterForm;
