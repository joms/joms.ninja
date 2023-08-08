import { readFileSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import { bundleMDX } from "mdx-bundler";

const rootPath = path.resolve(__dirname, "../app/routes/cv/content");

export const getJobsWithContent = async () => {
    const jobs = await Promise.all(
        (
            await readdir(rootPath, { withFileTypes: true })
        ).map(async (f) => {
            return await getJobContent(f.name);
        })
    );

    return jobs;
};

export const getJobContent = async (filename: string) => {
    const fileContent = readFileSync(path.join(rootPath, filename));

    return { filename, content: await bundleMDX({ source: fileContent.toString() }) };
};
