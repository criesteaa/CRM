import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const [username, setUsername] = useState("felicidadcrm");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // For demo purposes, allow any login
      // In production, replace with actual authentication
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="absolute top-4 left-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">F</span>
          </div>
          <h1 className="ml-2 text-lg font-medium text-gray-800">Felicidad</h1>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8 w-full">
          <h2 className="text-xl font-medium text-center mb-8">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="felicidadcrm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-teal-600 hover:text-teal-500"
                >
                  Forgot ?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Eye className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login Now"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Don't Have An Account?{" "}
              <a href="#" className="text-teal-600 font-medium hover:underline">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
