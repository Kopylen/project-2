// NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center p-5"
      style={{ minHeight: "70vh" }}
    >
      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-4">Oops! The page you are looking for does not exist.</p>
      <p className="text-muted">
        It might have been moved or deleted. Do not worry, you can get back to
        gaming!
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
}
