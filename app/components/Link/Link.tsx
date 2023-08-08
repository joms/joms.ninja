import type { LinkProps } from "@remix-run/react";
import { Link as RRLink } from "@remix-run/react";
import type { FunctionComponent, HTMLProps, PropsWithChildren } from "react";

const baseClassName = "joms-link";

type ExternalLinkProps = HTMLProps<HTMLAnchorElement>;

export const ExternalLink: FunctionComponent<PropsWithChildren<ExternalLinkProps>> = ({
    children,
    className = "",
    ...props
}) => {
    return (
        <a {...props} className={`${baseClassName} ${className}`}>
            {children}
        </a>
    );
};

export const Link = ({ children, className = "", ...props }: LinkProps) => {
    return (
        <RRLink {...props} className={`${baseClassName} ${className}`}>
            {children}
        </RRLink>
    );
};
