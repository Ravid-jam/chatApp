"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fileToBase64 } from "@/utils/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  profile_pic: yup
    .string()
    .required("Profile picture is required")
    .test("isBase64", "Invalid file format. Upload a valid image.", (value) =>
      value?.startsWith("data:image/")
    ),
});

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      try {
        const base64String: any = await fileToBase64(file);
        setValue("profile_pic", base64String); // Update profile_pic value in form state
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };
  const onSubmit = async (data: any) => {
    try {
      const res: any = await axios.post(
        "https://chat-app-indol-two-24.vercel.app/api/register",
        data
      );
      if (res?.data?.success === true) {
        router.push("/login");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your name,email,password below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                  className={`${errors.name ? "border-red-500" : ""} `}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={`${errors.email ? "border-red-500" : ""} `}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profilePic">Profile Picture</Label>
                <input
                  type="file"
                  id="profilePic"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
                {fileName && <p>Selected File: {fileName}</p>}
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/login" className="underline">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
