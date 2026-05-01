const TOKEN = "3c25f7d0f3459cd6e3b52a1f07110c8e5096a8a35943cb51082d2ec66c3899ca";

export function GET() {
  return new Response(TOKEN, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
