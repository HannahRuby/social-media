import { Theme } from "@radix-ui/themes";

export default function ThemeDemo() {
  return (
    <html>
      <body>
        <Theme>
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
