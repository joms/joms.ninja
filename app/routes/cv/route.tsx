import { json } from "@remix-run/node";
import type { V2_MetaFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { Fragment } from "react";
import { getJobsWithContent } from "./fs.server";
import type { JobContent } from "./components/ContentRenderer";
import { ContentRenderer } from "./components/ContentRenderer";
import { Link as CVLink } from "~/components/Link";

export const meta: V2_MetaFunction = () => {
    return [{ title: "CV - Jo Emil Holen" }];
};

export const loader: LoaderFunction = async () => {
    const content = await getJobsWithContent();
    const sortedContent = content.sort((a, b) => a.content.frontmatter.order - b.content.frontmatter.order);

    return json({ content: sortedContent });
};

export default function () {
    const loaderData = useLoaderData() as unknown as { content: Array<JobContent> };

    const result = loaderData.content;
    const [searchParams] = useSearchParams();

    const activeFile = searchParams.get("active");

    return (
        <main className="flex flex-col">
            <section className="mx-10 mt-20 mb-10">
                <h1 className="text-6xl mb-4 font-light">Jo Emil Holen</h1>

                <CVLink to="/" className="mb-6 inline-block">
                    Tilbake
                </CVLink>

                <p className="prose prose-2xl mb-3">
                    Jeg er en frontend-spesialist med en solid forståelse av backendutvikling. Jeg liker å lage gode
                    brukeropplevelser, og å lage løsninger som er gode å utvikle.
                </p>

                <p className="prose prose-2xl">
                    Utdanning: Dataelektronikk på Vinstra Videregående Skole, og fagbrev i Dataelektronikerfaget.
                </p>
            </section>

            <div className="flex flex-col 2xl:flex-row flex-1 min-h-max">
                {result.map((r, i) => {
                    const isActive = activeFile ? r.filename === activeFile + ".mdx" : i === 0;

                    return (
                        <Fragment key={r.filename}>
                            <Link
                                className="flex 2xl:justify-center z-10 bg-white 2xl:w-44 cursor-pointer py-5 hover:pl-8 2xl:hover:pl-0 2xl:hover:pt-10 transition-all 2xl:border-r-2 2xl:border-b-0 border-b-2 border-pink-400"
                                style={{ borderRightWidth: "0.25rem" }}
                                to={`.?active=${r.filename.replace(".mdx", "")}`}
                                preventScrollReset
                            >
                                <h2 className="2xl:text-8xl text-7xl px-10 2xl:px-5 font-extralight uppercase 2xl:whitespace-nowrap 2xl:vertical-writing-lr">
                                    {r.content.frontmatter.company}
                                </h2>
                            </Link>

                            <div
                                className="transition-all duration-300 relative bg-white 2xl:min-h-screen"
                                style={{ flex: isActive ? "1" : "0" }}
                                aria-hidden={!isActive}
                            >
                                {isActive ? (
                                    <div
                                        className="text-2xl pt-2 px-10 w-full 2xl:absolute min-w-max top-0 left-0 right-0 bottom-0 transition-all pb-8"
                                        style={{ maxWidth: "780px" }}
                                    >
                                        <ContentRenderer {...r} />
                                    </div>
                                ) : null}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </main>
    );
}
