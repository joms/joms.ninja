import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import type { getJobContent } from "../../fs.server";

export type JobContent = Awaited<ReturnType<typeof getJobContent>>;
type Props = JobContent;

const dateTimeFormat = new Intl.DateTimeFormat("nb", {
    year: "numeric",
    month: "long",
});

export const ContentRenderer = (props: Props) => {
    const Content = useMemo(() => getMDXComponent(props.content.code), [props.content]);
    const frontmatter = props.content.frontmatter;

    const startDate = dateTimeFormat.format(new Date(frontmatter.start));
    const endDate = frontmatter.end ? dateTimeFormat.format(new Date(frontmatter.end)) : "Nå";

    return (
        <div style={{ maxWidth: "780px" }}>
            <p className="capitalize">
                {startDate} - {endDate}
            </p>
            {frontmatter.employment && (
                <p className="text-gray-700 font-light">
                    {frontmatter.employment === "voulenteer"
                        ? "Frivillig"
                        : frontmatter.employment === "full"
                        ? "Fulltid"
                        : frontmatter.employment === "summerjob"
                        ? "Sommerjobb"
                        : ""}
                </p>
            )}
            <p className="text-4xl">{frontmatter.role}</p>
            {frontmatter.technologies.length ? (
                <ul className="flex flex-wrap gap-2 mt-4 list-none p-0" style={{ maxWidth: "calc(100% - 2rem)" }}>
                    {frontmatter.technologies
                        .sort((a: string, b: string) => a.localeCompare(b))
                        .map((technology: string) => (
                            <li key={technology} className="bg-black text-white px-2 rounded">
                                {technology}
                            </li>
                        ))}
                </ul>
            ) : null}

            <div className="prose prose-2xl mt-10">
                <Content />
            </div>
        </div>
    );
};
