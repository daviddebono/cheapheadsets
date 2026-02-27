export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const form = await request.formData();

    const website = form.get('website');
    if (website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const name = (form.get('name') || '').toString().trim();
    const email = (form.get('email') || '').toString().trim();
    const phone = (form.get('phone') || '').toString().trim();
    const description = (form.get('description') || '').toString().trim();

    if (!name || !email || !phone || !description) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = env.SMTP2GO_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Email not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subject = 'New enquiry from Cheap Headsets website';
    const bodyText = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      'Description:',
      description,
    ].join('\n');

    const bodyHtml = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Description:</strong><br>${escapeHtml(description).replace(/\n/g, '<br>')}</p>
    `;

    const payload = {
      api_key: apiKey,
      sender: 'contact@cheapheadsets.com.au',
      to: ['telco@circlebc.com.au', 'david.debono@circlebc.com.au'],
      reply_to: [email],
      subject,
      text_body: bodyText,
      html_body: bodyHtml,
    };

    const smtp2goResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await smtp2goResponse.json();

    if (!smtp2goResponse.ok || (data.data && data.data.succeeded === 0)) {
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

