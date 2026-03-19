import { cryptomusClient } from "@/lib/cryptomus";

export async function POST(req: Request) {
  const { amount, currency, user_id } = await req.json();

  const payload = {
    amount,
    currency,
    user_id,
    order_id: Math.random().toString(36).substring(2),
    url_return: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/billing?success=true`,
    url_callback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/cryptomus`,
  };

  const res = await cryptomusClient.payments
    .create(payload)
    .then((res) => {
      return res.url;
    })
    .catch((error) => {
      console.log(error);
    });

  return new Response(JSON.stringify(res), { status: 200 });
}
