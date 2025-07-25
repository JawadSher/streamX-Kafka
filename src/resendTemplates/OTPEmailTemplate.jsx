import { Copy as CopyIcon, AlertTriangle } from "lucide-react";

export const OTP_Email_Template = ({ firstName, OTP, expiryTime }) => {
  const formatTime = (time) => {
    if (time instanceof Date || typeof time === "number") {
      return new Date(time).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    }
    return time;
  };

  const formattedExpiryTime = formatTime(expiryTime);

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
            Secure Verification Code
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
            Thank you for using{" "}
            <strong style={{ color: "#e53e3e" }}>StreamX</strong>. Please use
            the following{" "}
            <strong style={{ color: "#e53e3e" }}>
              One-Time Password (OTP)
            </strong>{" "}
            to complete your verification.
          </p>

          {/* OTP Box */}
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #e53e3e",
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
                color: "#e53e3e",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px",
                fontWeight: "600",
              }}
            >
              Your Verification Code
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontFamily: "monospace",
                  fontWeight: "800",
                  color: "#1a202c",
                  letterSpacing: "0.075em",
                }}
              >
                {OTP}
              </span>
              <CopyIcon size={22} style={{ color: "#a0aec0" }} />
            </div>
          </div>

          {/* Expiry Warning */}
          <div
            style={{
              backgroundColor: "#fff5f5",
              border: "1px solid #feb2b2",
              fontSize: "14px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#c53030",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <AlertTriangle
              size={18}
              style={{ color: "#e53e3e", marginRight: "8px", flexShrink: 0 }}
            />
            This OTP is valid for a limited time and expires on{" "}
            <strong style={{ marginLeft: "4px" }}>{formattedExpiryTime}</strong>
            .
          </div>

          {/* Security Info */}
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
                display: "flex",
                alignItems: "center",
                color: "#1a202c",
                marginBottom: "12px",
                margin: 0,
              }}
            >
              <AlertTriangle
                size={20}
                style={{ color: "#e53e3e", marginRight: "8px", flexShrink: 0 }}
              />
              Important Security Information
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#4a5568",
                marginBottom: "12px",
                lineHeight: "1.625",
              }}
            >
              <strong style={{ color: "#e53e3e" }}>
                Never share this OTP with anyone.
              </strong>{" "}
              StreamX will <strong style={{ color: "#e53e3e" }}>never</strong>{" "}
              request this code via phone, whatsapp, or any other communication
              channel.
            </p>
            <p style={{ fontSize: "14px", color: "#4a5568", margin: 0 }}>
              If you did not initiate this request, please contact our support
              team immediately at{" "}
              <a
                href="mailto:support@streamx.com"
                style={{
                  color: "#e53e3e",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                support@strmx.fun
              </a>{" "}
              or secure your account by resetting your password.
            </p>
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
