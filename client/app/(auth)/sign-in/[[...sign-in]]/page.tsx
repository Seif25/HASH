import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

async function Page() {
  return (
    <main className="main">
      <SignIn
        appearance={{
          variables: {
            colorBackground: "#000",
            colorInputBackground: "#000",
            colorAlphaShade: "white",
            colorText: "white",
            colorInputText: "white",
          },
          elements: {
            socialButtonsProviderIcon__github: {
              filter: "brightness(0) invert(1)",
            },
            formButtonPrimary: {
                backgroundColor: "#3228a2",
                color: "#000",
                fontWeight: "700",
                "&:hover": {
                    backgroundColor: "#241c77",
                }
            },
            footerActionLink: {
                color: "white",
                "&:hover": {
                    color: "#3228a2",
                }
            },
            footer: {
              "& + div": {
                background: "rgb(49, 49, 51)",
              },
            },
          },
        }}
      />
    </main>
  );
}

export default Page;
