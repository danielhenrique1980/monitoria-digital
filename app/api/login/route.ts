// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Simule a verificação ou busque do banco de dados
  if (email === "admin@exemplo.com" && password === "123456") {
    const response = NextResponse.json({ role: "admin" });

    // Define o cookie `userType` acessível pelo middleware
    response.cookies.set("userType", "admin", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  }

  // Repetir lógica para monitor e user
  if (email === "monitor@exemplo.com" && password === "123456") {
    const response = NextResponse.json({ role: "monitor" });
    response.cookies.set("userType", "monitor", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });
    return response;
  }

  if (email === "user@exemplo.com" && password === "123456") {
    const response = NextResponse.json({ role: "aluno" });
    response.cookies.set("userType", "aluno", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });
    return response;
  
  }

  return new NextResponse("Credenciais inválidas", { status: 401 });
}