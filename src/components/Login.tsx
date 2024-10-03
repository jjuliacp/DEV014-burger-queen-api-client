import { useState } from "react";
import "../styles/Login.css";
import { setToken } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Para indicar si está cargando
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificación de campos vacíos
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true); // Indicamos que la solicitud está en proceso

    // Lógica de autenticación aquí
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Enviar datos de login
      });

      if (!response.ok) {
        setError("el correo y/o la contraseña son incorrectas"); // Limpiar el error después de un intento de login exitoso
        setLoading(false);
      }
      const data = await response.json();
      setToken(data.accessToken);
      console.log("Respuesta de la API:", data);

      navigate("/panel");
    } catch (error) {
      setError("El correo y/o la contraseña son incorrectas");
    } finally {
      setLoading(false); // Dejar de mostrar el indicador de carga
    }
  };

  return (
    <main className="loginMain">
      <section className="login-section-left">
        <img src="src/assets/burguerqueen-compress.webp" alt="bqLogo" />
      </section>
      <section className="login-section-rigth">
        <h2 className="login-form-title">¡Bienvenido a Burger Queen!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="email-container">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="escribe tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
          {error && <p>{error}</p>}
        </form>
      </section>
    </main>
  );
};

export { Login };
