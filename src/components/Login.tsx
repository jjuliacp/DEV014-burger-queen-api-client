import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // aquí se usan datos de prueba
    if (email === "user@example.com" && password === "password") {
      // temporalmente Guardar el estado de autenticación
      sessionStorage.setItem("authenticated", "true");
      // Redirigir a la vista de órdenes
      navigate("/orders");
    } else if (email === "" || password === "") {
      setError("Please fill in all fields"); // Uso de setError
      return;
    }
    // Lógica de autenticación aquí

    console.log("estas con correo invalido");
    setError("el correo y/o la contraseña son incorrectas"); // Limpiar el error después de un intento de login exitoso
  };

  return (
    <main className="loginMain">
      <section className="login-section-left">
        <img src="src/assets/burguerqueen-compress.webp" alt="bqLogo" />
      </section>
      <section className="login-section-rigth">
        <h2 className="login-form-title">!Bienvenido a Burger Queen!</h2>
        <form className="login-form">
          <div className="email-container">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="input-email"
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
              type="input-password"
              id="password"
              value={password}
              placeholder="escribe tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          {error && <p>{error}</p>}
        </form>
      </section>
    </main>
  );
};

export { Login };
