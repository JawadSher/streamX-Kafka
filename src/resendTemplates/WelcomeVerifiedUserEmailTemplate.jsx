import { AlertTriangle, Smile } from "lucide-react";

export const Welcome_Verified_User_Email_Template = ({ firstName }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a1a, #3b0a32, #8b0000)",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "672px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #edf2f7",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(to right, #4a5568, #e53e3e)",
            padding: "24px 32px",
            color: "#ffffff",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/streamxLogo.png"
              alt="StreamX Logo"
              width={150}
              height={40}
            />
          </div>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.9,
              marginTop: "4px",
              marginBottom: 0,
            }}
          >
            Welcome to the StreamX Community!
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "40px 32px", boxSizing: "border-box" }}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              marginBottom: "16px",
              color: "#1a202c",
            }}
          >
            Hello{" "}
            <span style={{ fontWeight: "600", color: "#e53e3e" }}>
              {firstName}
            </span>
            ,
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#4a5568",
              marginBottom: "24px",
              lineHeight: "1.625",
            }}
          >
            We're thrilled to welcome you to{" "}
            <strong style={{ color: "#e53e3e" }}>StreamX</strong>! 🎉
            <br />
            Your account has been successfully created, and you're now part of a
            growing community that values high-quality streaming and
            entertainment experiences.
            <br />
            <br />
            <strong style={{ color: "#e53e3e" }}>
              To unlock all features of StreamX, please verify your email
              address.
            </strong>{" "}
            Email verification is required to receive OTPs, recover your
            password, and ensure secure access to your account.
          </p>

          {/* Welcome Message Box */}
          <div
            style={{
              backgroundColor: "#f0fff4",
              border: "1px solid #38a169",
              borderRadius: "8px",
              padding: "28px 24px",
              textAlign: "center",
              marginBottom: "32px",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#38a169",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px",
                fontWeight: "600",
              }}
            >
              You're all set!
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Smile size={26} style={{ color: "#38a169" }} />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#2f855a",
                }}
              >
                Let's get started with StreamX!
              </span>
            </div>
          </div>

          {/* Getting Started Tips */}
          <div
            style={{
              borderTop: "1px solid #edf2f7",
              paddingTop: "24px",
              marginTop: "24px",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1a202c",
                marginBottom: "12px",
              }}
            >
              What’s next?
            </h3>
            <ul
              style={{
                paddingLeft: "20px",
                color: "#4a5568",
                fontSize: "14px",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Explore trending content curated just for you.
              </li>
              <li style={{ marginBottom: "8px" }}>
                Personalize your profile and interests.
              </li>
              <li style={{ marginBottom: "8px" }}>
                Stay updated with new features and offers via email.
              </li>
            </ul>
          </div>

          {/* Security Info */}
          <div
            style={{
              backgroundColor: "#fff5f5",
              border: "1px solid #feb2b2",
              fontSize: "14px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#c53030",
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <AlertTriangle
              size={18}
              style={{ color: "#e53e3e", marginRight: "8px", flexShrink: 0 }}
            />
            Always keep your account secure and never share your credentials.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f7fafc",
            borderTop: "1px solid #edf2f7",
            padding: "24px 32px",
            textAlign: "center",
            fontSize: "14px",
            color: "#718096",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            boxSizing: "border-box",
          }}
        >
          <p style={{ marginBottom: "8px", margin: 0 }}>
            © {new Date().getFullYear()} StreamX, Inc. All rights reserved.
          </p>
          <p style={{ margin: 0 }}>
            <a
              href="https://strmx.fun"
              style={{ color: "#e53e3e", textDecoration: "underline" }}
            >
              strmx.fun
            </a>{" "}
            &bull;{" "}
            <a
              href="https://strmx.fun/privacy"
              style={{ color: "#e53e3e", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>{" "}
            &bull;{" "}
            <a
              href="https://strmx.fun/terms"
              style={{ color: "#e53e3e", textDecoration: "underline" }}
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
