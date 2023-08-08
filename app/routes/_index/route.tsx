import type { ActionFunction, LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { stuffILike } from "./iLike";
import styles from "./styles.css";
import { ExternalLink, Link } from "~/components/Link/Link";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

export const meta: V2_MetaFunction = () => {
    return [{ title: "Jo Emil Holen" }];
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const current = formData.get("current");

    const randomizedStuffILike = stuffILike.sort(() => Math.random() - 0.5);

    if (!current) {
        return randomizedStuffILike[0];
    }

    const currentIndex = randomizedStuffILike.findIndex((t) => t === current);
    const nextItemIndex = (currentIndex + 1) % randomizedStuffILike.length;

    return randomizedStuffILike[nextItemIndex];
};

export default function () {
    const data = useActionData();

    return (
        <>
            <main className="flex-1 pl-24 pr-44 pb-40 pt-20 container">
                <div className="flex items-center relative flex-wrap">
                    <h1 className="text-6xl font-light flex-1 z-10" style={{ minWidth: "380px" }}>
                        <span className="hi">👋</span> Hei, jeg heter Jo Emil!
                    </h1>

                    <div className="relative">
                        <img
                            src="/myten_no_bg.png"
                            className="h-72 w-auto relative z-10"
                            id="profile-picture"
                            alt="Bilde av Jo Emil"
                        />
                        <svg
                            width="620"
                            height="636"
                            viewBox="0 0 620 636"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-40 -right-32 z-0"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.60096 309.418C2.84095 198.803 144.53 182.034 244.113 133.827C360.111 77.6722 485.122 -59.4352 578.017 29.8919C675.856 123.972 580.298 274.53 513.048 392.432C445.776 510.371 368.033 654.718 234.004 633.006C88.8618 609.494 -2.37593 456.422 0.60096 309.418Z"
                                fill="#F472B6"
                            />
                        </svg>
                    </div>
                </div>

                <div className="mb-28 z-10 relative" style={{ maxWidth: "80%" }}>
                    <Form method="POST">
                        <button
                            name="current"
                            value={data}
                            className="text-base px-3 py-1 bg-pink-400 rounded text-white hover:bg-pink-300 border border-pink-400"
                        >
                            Jeg liker mye rart
                        </button>
                    </Form>

                    <p aria-live="polite" className="text-8xl font-extrabold mt-3">
                        {`Jeg liker ${data ?? "å lage ting på internett"}`}
                    </p>
                </div>

                <p className="flex gap-5 text-2xl">
                    <ExternalLink href="https://github.com/joms">GitHub</ExternalLink>
                    <ExternalLink href="https://www.linkedin.com/in/jo-emil-holen-3394b262/">LinkedIn</ExternalLink>
                    <Link to="/cv">CV</Link>
                </p>
            </main>
        </>
    );
}
