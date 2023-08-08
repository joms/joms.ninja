import { bundleMDX } from "mdx-bundler";

export const parseMarkdown = async (source: string) => {
    return await bundleMDX({
        source,
    });
};
