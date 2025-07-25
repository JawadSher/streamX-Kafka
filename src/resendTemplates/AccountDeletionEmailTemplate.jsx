import { AlertTriangle, Trash2 } from "lucide-react";

export const Account_Deletion_Email_Template = ({ firstName }) => {
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
            Account Deletion Confirmation
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
            This email is to confirm that your{" "}
            <strong style={{ color: "#e53e3e" }}>StreamX account</strong> has
            been successfully deleted. We're sorry to see you go!
          </p>

          {/* Info Box */}
          <div
            style={{
              backgroundColor: "#fffaf0",
              border: "1px solid #f6ad55",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "24px",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#dd6b20",
                margin: "0 0 12px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Trash2
                size={20}
                style={{ marginRight: "8px", color: "#dd6b20" }}
              />
              What this means
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#dd6b20",
              }}
            >
              Your account and all associated data have been permanently
              removed from our system. You will no longer be able to access your
              profile, settings, or any saved content.
            </p>
          </div>

          {/* Security Alert (optional restore) */}
          <div
            style={{
              backgroundColor: "#fff5f5",
              border: "1px solid #feb2b2",
              fontSize: "14px",
              padding: "16px",
              borderRadius: "8px",
              color: "#c53030",
              marginBottom: "24px",
              display: "flex",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            <AlertTriangle
              size={20}
              style={{ color: "#e53e3e", marginRight: "10px", flexShrink: 0 }}
            />
            <div>
              <strong>Didn’t request this deletion?</strong>
              <br />
              If you did not initiate this action, please{" "}
              <strong>contact our support team immediately</strong> to recover
              your account (if eligible).
              <br />
              <a
                href="mailto:support@streamx.com"
                style={{
                  color: "#e53e3e",
                  fontWeight: "500",
                  textDecoration: "underline",
                  display: "inline-block",
                  marginTop: "6px",
                }}
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Goodbye Message */}
          <p
            style={{
              fontSize: "14px",
              color: "#4a5568",
              marginBottom: "12px",
              lineHeight: "1.6",
            }}
          >
            Thank you for being part of StreamX. If you ever change your mind,
            you're always welcome back.
          </p>
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
