// Renders JSON-LD structured data in a server-component-friendly format.

type JsonLdProps = {
  data: object | object[];
};

function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(item),
          }}
        />
      ))}
    </>
  );
}
