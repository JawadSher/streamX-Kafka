import { config } from "dotenv";
config({ path: "D:/streamX-Kafka/.env" });

import { Resend } from "resend";
import { OTP_Email_Template } from "./dist/resendTemplates/OTPEmailTemplate.js";
import { Welcome_To_Unverified_User_Email_Template } from "./dist/resendTemplates/WelcomeToUnverifiedUserEmailTemplate.js";
import { Welcome_Verified_User_Email_Template } from "./dist/resendTemplates/WelcomeVerifiedUserEmailTemplate.js";
import { Basic_Credentials_Update_Email_Template } from "./dist/resendTemplates/BasicCredentialsUpdateEmailTemplate.js";
import { Account_Deletion_Email_Template } from "./dist/resendTemplates/AccountDeletionEmailTemplate.js";
import { Password_Credentials_Update_Email_Template } from "./dist/resendTemplates/PasswordCredentialsUpdateEmailTemplate.js";
import { SignIn_Alert_Email_Template } from "./dist/resendTemplates/NotifyOnSigninEmailTemplate.js";

export async function SendVerificationCode({
  firstName,
  userEmail,
  OTP,
  expiryTime,
}) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: "streamX Verification Code",
      react: OTP_Email_Template({ firstName, OTP, expiryTime }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "OTP email send successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending OTP: ${error}`,
    };
  }
}

export async function SendWelcomeMessageToVerifiedUser({
  firstName,
  userEmail,
}) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: `Welcome to StreamX, ${firstName}!`,
      react: Welcome_Verified_User_Email_Template({ firstName }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Welcome message sended successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending welcome message: ${error}`,
    };
  }
}

export async function SendSignInAlertMessage({
  firstName,
  userEmail,
  time,
  location,
  device,
}) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: `Welcome to StreamX, ${firstName}!`,
      react: SignIn_Alert_Email_Template({
        firstName,
        time,
        location,
        device,
      }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Sign-in alert message sended successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending Sign-in alert message: ${error}`,
    };
  }
}

export async function SendWelcomeMessageToUnverifiedUser({
  firstName,
  userEmail,
}) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: `Welcome to StreamX, ${firstName}! - Verify your account`,
      react: Welcome_To_Unverified_User_Email_Template({ firstName }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Welcome message to unverified user sended successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending welcome message to unverified user: ${error}`,
    };
  }
}

export async function SendBasicCredentialsUpdateMessage({
  firstName,
  userEmail,
  updatedFields,
}) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: `StreamX Account Update Successful`,
      react: Basic_Credentials_Update_Email_Template({
        firstName,
        updatedFields,
      }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Account updation message sended successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending account updation message: ${error}`,
    };
  }
}

export async function SendAccountDeletionMessage({ firstName, userEmail }) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: `StreamX Account Deletion Successful`,
      react: Account_Deletion_Email_Template({ firstName }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Account deletion message sended successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending account deletion message: ${error}`,
    };
  }
}

export async function SendPasswordUpdateMessage({ firstName, userEmail }) {
  try {
    if (
      !userEmail ||
      !/^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userEmail
      )
    ) {
      return {
        success: false,
        message: "Invalid format email address",
      };
    }

    const resend_API_KEY = process.env.RESEND_API_KEY;

    if (!resend_API_KEY) {
      return {
        success: false,
        message: "Resend email service configuration error",
      };
    }

    const resend = new Resend(resend_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "streamX <onboarding@resend.dev>",
      to: [`${userEmail}`],
      subject: `StreamX Account Password Update Successful`,
      react: Password_Credentials_Update_Email_Template({ firstName }),
    });

    if (error) {
      console.error("Email send failed:", error);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Account password updation message sended successfully",
      data: {
        OTP,
        expiryTime,
        resend: {
          ...data,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `Internal server error while sending account password updation message: ${error}`,
    };
  }
}
