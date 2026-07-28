exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Only POST allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");

    const email = body.email;
    const name = body.name || "User";
    const firstName = body.firstName || name.split(" ")[0] || name;
    const subject =
      body.subject ||
      "Your Archetype Result — A Clearer View of Where You Are";

    const mentorshipUrl =
      body.mentorshipUrl ||
      "https://calendly.com/twolivestheory/mentorship";

    const archetypes = Array.isArray(body.archetypes)
      ? body.archetypes
      : [];
    const resultTitle = body.resultTitle || subject;
    const resultText = body.resultText || "Below is your result.";
    const resultHtml = body.resultHtml || "";

    const resultItems = archetypes.length
      ? archetypes
      : resultText
          .split(/\n\n+/)
          .map((item) => item.trim())
          .filter(Boolean);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    const archetypeHTML =
      resultItems.length > 0
        ? resultItems
            .map((item) => {
              if (typeof item === "string") {
                return `
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#01d981;margin-right:10px;"></span>
                    <span style="color:#ffffff;font-size:18px;font-weight:600;">
                      ${item}
                    </span>
                  </td>
                </tr>
              `;
              }

              return `
                <tr>
                  <td style="padding: 16px 0;">
                    <h3 style="margin:0 0 10px;color:#ffffff;font-size:20px;">${item.title || "Archetype Result"}</h3>
                    ${item.mirror ? `<p style="margin:0 0 10px;color:#d1d5db;line-height:1.6;">${item.mirror}</p>` : ""}
                    ${Array.isArray(item.reflects) && item.reflects.length ? `<ul style="margin:0 0 10px;padding-left:18px;color:#ffffff;line-height:1.6;">${item.reflects.map((reflect) => `<li>${reflect}</li>`).join("")}</ul>` : ""}
                    ${item.possible ? `<p style="margin:0;color:#d1d5db;line-height:1.6;">${item.possible}</p>` : ""}
                  </td>
                </tr>
              `;
            })
            .join("")
        : `
          <tr>
            <td style="color:#ffffff;">No result found</td>
          </tr>
        `;

    if (!process.env.RESEND_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing RESEND_API_KEY" }),
      };
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body style="margin:0;padding:0;background:#e5e5e5;font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#e5e5e5;padding:20px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#f1f7f7;border-radius:8px;overflow:hidden;">

<!-- HERO -->
<tr>
<td style="background:#0a1a14;padding:40px 30px;text-align:center;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 30px;">
    <tr>
      <td align="center">
        <img src="https://two-lives-theory.netlify.app/images/tl-green-logo.svg" width="180" style="display:block;margin:0 auto;" />
      </td>
    </tr>
  </table>

  <h1 style="color:#ffffff;font-size:28px;margin:0 0 15px;">
    Your Archetype Result
  </h1>
  <h2 style="color:#ffffff;font-size:22px;margin:0 0 10px;">
    A Clearer View of Where You Are
  </h2>

</td>
</tr>

<!-- CONTENT -->
<tr>
<td style="padding:30px;">

  <h2 style="margin:0 0 20px;font-size:20px;">
    Hey ${firstName}!
  </h2>

  <p style="margin:0 0 15px;color:#374151;">
    Thank you for taking the time to complete the <strong>Explore Your Archetype</strong> process.
  </p>

  <p style="margin:0 0 15px;color:#374151;">
    What you’ve just done isn’t surface-level.
  </p>

  <p style="margin:0 0 15px;color:#374151;">
    It offers a clearer reflection of where you are right now… not just in how you perform, but in how you experience it internally.
  </p>

  <p style="margin:0 0 10px;color:#374151;">
    Below is your result.
  </p>

</td>
</tr>

<!-- RESULT BLOCK -->
<tr>
<td style="background:#0a1a14;padding:25px 30px;">

  <table width="100%">
    <tr>
      <td style="border-top:1px solid #01d981;padding-top:20px;"></td>
    </tr>

    <tr>
      <td>
        <h2 style="color:#ffffff;font-size:22px;margin:0 0 10px;">Your Archetype</h2>
        <p style="margin:0 0 15px;color:#ffffff;">You most closely align with:</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 0px 0 10px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1a14;border-collapse:collapse;">
          <tr>
            <td >
              ${resultHtml || archetypeHTML}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="border-bottom:1px solid #01d981;padding-bottom:20px;"></td>
    </tr>
  </table>

</td>
</tr>

<!-- FOOTER CONTENT -->
<tr>
<td style="padding:30px;">

  <p style="margin:0 0 15px;color:#374151;">
    Take a moment with this.
  </p>

  <p style="margin:0 0 15px;color:#374151;">
    Often, the most important insight isn’t in reading it but in recognising where it resonates.
  </p>

  <p style="margin:0 0 20px;color:#374151;">
    If you feel there's something here worth exploring further, you're welcome to continue the conversation.
  </p>

  <p style="text-align:center;margin:30px 0 30px;">
    <a href="${mentorshipUrl}"
       style="background:#0a1a14;color:#ffffff;padding:14px 22px;border-radius:10px;text-decoration:none;font-weight:600;">
       Request Mentorship
    </a>
  </p>

  <p style="margin:0 0 5px;">I look forward to speaking with you soon,</p>
  <p style="margin:0 0 20px;">Warm Regards,<br/>Basim</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#0a1a14;text-align:center;padding:20px;">
  <img src="https://two-lives-theory.netlify.app/images/tl-green-logo.svg" width="140" />
  <p style="color:#9ca3af;font-size:12px;margin-top:10px;">
    © 2026 Two Lives Theory. All rights reserved.
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Two Lives Theory <basim@twolivestheory.com>",
        to: [email],
        cc: ["basim@twolivestheory.com"],
        subject,
        html,
      }),
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
