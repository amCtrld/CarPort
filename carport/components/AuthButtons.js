export default function AuthButtons({ onSignUp, onLogin }) {
    return (
      <div className="flex items-center justify-center gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={onSignUp}
        >
          Sign Up
        </button>
        <button
          className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    );
  }
  