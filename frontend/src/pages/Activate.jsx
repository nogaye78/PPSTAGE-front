import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth"; // axios instance

const Activate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await authAPI.post("/auth/users/activation/", { uid, token });
        alert("✅ Votre compte a été activé ! Vous pouvez maintenant vous connecter.");
        navigate("/login");
      } catch (err) {
        console.error("Erreur d'activation :", err.response || err);
        alert("❌ Impossible d'activer le compte. Lien invalide ou expiré.");
        navigate("/register");
      }
    };
    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/80 font-sans px-4">
      <div className="bg-white p-10 rounded-sm shadow-xl w-full max-w-[420px] text-center">
        <h2 className="text-gray-700 text-lg mb-4 font-bold">Activation du compte</h2>
        <p className="text-gray-600">Activation en cours...</p>
      </div>
    </div>
  );
};

export default Activate;
